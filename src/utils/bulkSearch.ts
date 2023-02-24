import { Block } from 'ethers';

type BulkSearchArgs = {
  start: number;
  end: number;
  timestamp: number;
  blockchainApiCallFn: (blockNumber: number) => Promise<Block | null>;
  searchPartCount?: number;
}

const defaultSearchPartCount = 10;

export function bulkBlockSearch(
  {
    start,
    end,
    timestamp,
    blockchainApiCallFn,
    searchPartCount = defaultSearchPartCount,
  }: BulkSearchArgs,
): Promise<number> {
  const numberOfCheckups = (end - start) < searchPartCount ? (end - start) : searchPartCount;
  const step = Math.floor((end - start) / numberOfCheckups);
  
  const checkupPoints = [start];
  for (let i = 0; i < numberOfCheckups - 1; i++) {
    checkupPoints.push(start + (i + 1) * step);
  }
  checkupPoints.push(end);

  const checkupBlocks = checkupPoints.map(blockchainApiCallFn);

  return Promise.all(checkupBlocks).then(results => {
    let startBlockNumber: number = start;
    let endBlockNumber: number = end;

    for (let i = 0; i < results.length - 1; i++) {  
      if (!results[i]) continue;

      if (results[i]!.timestamp <= timestamp && results[i + 1]!.timestamp >= timestamp) {
        startBlockNumber = results[i]!.number;
        endBlockNumber = results[i + 1]!.number;
      }
    }

    if (endBlockNumber - startBlockNumber === 1) {
      return endBlockNumber;
    } else {
      return bulkBlockSearch({ start: startBlockNumber, end: endBlockNumber, timestamp, blockchainApiCallFn });
    }
  });
}
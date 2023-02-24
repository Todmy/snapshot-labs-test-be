// Description: 
//   This file contains a simple cache manager for block numbers.
//   The cache is a simple array of objects with the timestamp and the block number.
//   The cache is cleaned every time it reaches the maximum size.

type BlockCache = {
  timestamp: number;
  blockNumber: number;
}

let cache: BlockCache[] = [];
const cacheMaxSize = 1000;

const cacheManager = {
  set: (timestamp: number, number: any) => {
    cache.push({
      timestamp,
      blockNumber: number,
    });

    if (cache.length > cacheMaxSize) {
      // Remove every forth element, as a simple cache cleaning
      cache = cache.filter((item, index) => index % 4 === 0);
    }
  },
  findSiblingsNumbers: (timestamp: number): [number, number] | never  => {
    let smallerSibling: BlockCache | null = null;
    let biggerSibling: BlockCache | null = null;

    cache.forEach((item) => {
      if (
        (item.timestamp < timestamp && smallerSibling === null) 
        || (item.timestamp < timestamp && item.timestamp > smallerSibling!.timestamp)
      ) {
        smallerSibling = item;
      }

      if (
        (item.timestamp > timestamp && biggerSibling === null)
        || (item.timestamp > timestamp && item.timestamp < biggerSibling!.timestamp)
      ) {
        biggerSibling = item;
      }
    });

    if (smallerSibling === null && biggerSibling === null) {
      throw new Error('Block not found');
    }

    return [
      smallerSibling!.blockNumber,
      biggerSibling!.blockNumber,
    ]
  },
};

export default {
  set: cacheManager.set,
  findSiblingsNumbers: cacheManager.findSiblingsNumbers,
};

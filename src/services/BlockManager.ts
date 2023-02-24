import { JsonRpcProvider, Block } from 'ethers';
import config from '../config';
import blockCacheManager from '../utils/blockCache';
import { bulkBlockSearch } from '../utils/bulkSearch';

const provider = new JsonRpcProvider(config.ethRpcUrl);
const withCaching = config.withCache;

class BlockManager {
  private readonly bulkSearchCount = 20;

  /**
   * searchBlockByTimestamp
   * @param timestamp - unix timestamp
   * @returns block info
   */
  public async searchBlockByTimestamp(timestamp: number): Promise<Block> {
    const latestBlock: number = await provider.getBlockNumber();
    let start = 0;
    let end = latestBlock;

    if (withCaching) {
      try {
        const [smallerSiblingNumber, biggerSiblingNumber] = blockCacheManager.findSiblingsNumbers(timestamp);
        start = smallerSiblingNumber;
        end = biggerSiblingNumber;
      } catch (error) {}
    }

    const blockchainApiCallFn = async (blockNumber: number) => {
      const block = await provider.getBlock(blockNumber);

      if (!block) return null;

      if (withCaching) {
        blockCacheManager.set(block.timestamp, block.number);
      }

      return block;
    }

    const targetBlockNumber: number = await bulkBlockSearch({
      start, 
      end, 
      timestamp,
      blockchainApiCallFn,
    });

    const blockInfo = await provider.getBlock(targetBlockNumber);

    if (!blockInfo) {
      throw new Error('Block not found');
    }

    return blockInfo;
  }
}

const blockManager = new BlockManager();

export default blockManager;
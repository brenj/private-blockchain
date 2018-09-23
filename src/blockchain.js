const Block = require('./block.js');
const blockchainData = require('./blockchainData.js');

class Blockchain {
  constructor() {
    this.api = blockchainData;
  }

  addBlock(blockData) {
    return new Promise((resolve, reject) => {
      this.getLastBlockHeight().then((height) => {
        if (height === -1) {
          // -1 height indicates an empty chain
          const genesisBlock = new Block('GENESIS');
          genesisBlock.hash = genesisBlock.getBlockHash();
          this.api.addDataToLevelDB(JSON.stringify(genesisBlock))
            .then(() => {
              const newBlock = new Block(blockData, 1, genesisBlock.hash);
              newBlock.hash = newBlock.getBlockHash();
              this.api.addDataToLevelDB(JSON.stringify(newBlock))
                .then(() => resolve(newBlock))
                .catch(error => reject(error));
            });
        } else {
          this.getBlock(height).then((block) => {
            const newBlock = new Block(blockData, height + 1, block.hash);
            newBlock.hash = newBlock.getBlockHash();
            this.api.addDataToLevelDB(JSON.stringify(newBlock))
              .then(() => resolve(newBlock))
              .catch(error => reject(error));
          });
        }
      });
    });
  }

  getLastBlockHeight() {
    return this.api.getLastBlockHeight();
  }

  getBlock(blockHeight) {
    return new Promise((resolve, reject) => {
      this.api.getLevelDBData(blockHeight)
        .then(rawBlockData => JSON.parse(rawBlockData))
        .then((blockData) => {
          // Why doesn't spread operator work here?
          const block = new Block(
            blockData.body, blockData.height,
            blockData.previousBlockHash, blockData.time, blockData.hash);
          resolve(block);
        })
        .catch(error => reject(error));
    });
  }

  validateBlockData(block) {
    // Create original block (no hash) for comparison
    const blockToValidate = new Block(
      block.body, block.height, block.previousBlockHash, block.time);

    return blockToValidate.getBlockHash() === block.hash;
  }

  validateBlock(blockHeight) {
    return new Promise((resolve, reject) => {
      this.getBlock(blockHeight)
        .then(block => resolve(this.validateBlockData(block)))
        .catch(error => reject(error));
    });
  }

  validateChain() {
    return new Promise((resolve, reject) => {
      this.api.getChainData()
        .then((chainData) => {
          const chain = chainData.map((rawBlockData) => {
            const blockData = JSON.parse(rawBlockData);
            return new Block(
              blockData.body, blockData.height,
              blockData.previousBlockHash, blockData.time, blockData.hash);
          });

          const hasAllValidBlocks = chain.every(block => (
            this.validateBlockData(block)
          ));

          chain.sort((a, b) => a.height - b.height);
          const hasAllValidPrevHashes = chain.every((block, index) => {
            if (index < chain.length - 1) {
              const blockHash = block.hash;
              const previousHash = chain[index + 1].previousBlockHash;
              return blockHash === previousHash;
            } else {
              // Skip last block
              return true;
            }
          });

          resolve(hasAllValidBlocks && hasAllValidPrevHashes);
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = Blockchain;

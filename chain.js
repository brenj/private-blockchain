const SHA256 = require('crypto-js/sha256');
const chainDataAPI = require('./chainDataAPI.js');

class Block {
  constructor(data, height = 0, previousBlockHash = '') {
    this.body = data;
    this.height = height;
    this.previousBlockHash = previousBlockHash;
    this.time = new Date().getTime().toString().slice(0, -3);
    this.hash = SHA256(JSON.stringify(this)).toString();
  }
}

class Blockchain {
  constructor() {
    this.api = chainDataAPI;
  }

  addBlock(blockData) {
    return new Promise((resolve, reject) => {
      this.getBlockHeight().then((height) => {
        if (height === 0) {
          const genesisBlock = new Block('GENESIS');
          this.api.addDataToLevelDB(JSON.stringify(genesisBlock)).then(() => {
            const newBlock = new Block(blockData, 1, genesisBlock.hash);
            this.api.addDataToLevelDB(JSON.stringify(newBlock))
              .then(() => resolve(newBlock))
              .catch(error => reject(error));
          });
        } else {
          this.getBlock(height).then((block) => {
            const newBlock = new Block(blockData, height + 1, block.hash);
            this.api.addDataToLevelDB(JSON.stringify(newBlock))
              .then(() => resolve(newBlock))
              .catch(error => reject(error));
          });
        }
      });
    });
  }

  getBlockHeight() {
    return this.api.getChainHeight();
  }

  getBlock(blockHeight) {
    return new Promise((resolve, reject) => {
      this.api.getLevelDBData(blockHeight)
        .then(block => resolve(JSON.parse(block)))
        .catch(error => reject(error));
    });
  }
}

// const blockchain = new Blockchain();
// blockchain.addBlock('BLOCK #1').then(() => {
//   blockchain.api.db.createReadStream()
//     .on('data', (data) => {
//       console.log(data.key, '=', data.value);
//     });
// });
// blockchain.getBlockHeight().then(height => console.log(height));
// blockchain.getBlock(0).then(block => console.log(block));

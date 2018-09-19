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
  // constructor() {
  // }

  addBlock(blockData) {
    return new Promise((resolve, reject) => {
      this.getBlockHeight().then((height) => {
        if (height === 0) {
          const genesisBlock = new Block('GENESIS');
          chainDataAPI.addDataToLevelDB(genesisBlock).then(() => {
            const newBlock = new Block(blockData, 1, genesisBlock.hash);
            chainDataAPI.addDataToLevelDB(newBlock)
              .then(() => resolve(newBlock))
              .catch(error => reject(error));
          });
        } else {
          this.getBlock(height).then((block) => {
            const newBlock = new Block(blockData, height + 1, block.hash);
            chainDataAPI.addDataToLevelDB(newBlock)
              .then(() => resolve(newBlock))
              .catch(error => reject(error));
          });
        }
      });
    });
  }

  getBlockHeight() {
    return chainDataAPI.getChainHeight();
  }

  getBlock(blockHeight) {
    // return object as a single string
    // return JSON.parse(JSON.stringify(this.chain[blockHeight]));
  }
}

const chain = new Blockchain();
// chain.addBlock('Test Block').then((result) => {
//   chainDataAPI.db.createReadStream()
//     .on('data', function (data) {
//       console.log(data.key, '=', data.value)
//     })
//     .on('error', function (err) {
//       console.log('Oh my!', err)
//     })
//     .on('close', function () {
//       console.log('Stream closed')
//     })
//     .on('end', function () {
//       console.log('Stream ended')
//     })
// })
// chain.getBlockHeight().then(height => console.log(height));

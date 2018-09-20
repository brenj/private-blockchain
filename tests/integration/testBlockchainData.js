const blockchainData = require('../../src/blockchainData.js');

blockchainData.getChainData()
  .then(chainData => console.log(chainData));
// blockchainData.addLevelDBData('test', 'hi')
//   .then(result => console.log(result));
// blockchainData.getLevelDBData('test')
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
// blockchainData.getLastBlockHeight()
//   .then(height => console.log(height));

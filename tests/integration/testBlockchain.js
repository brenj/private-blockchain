const Blockchain = require('../../src/blockchain.js');

const testBlockchain = new Blockchain();

testBlockchain.addBlock('TEST BLOCK').then(block => console.log(block));
// testBlockchain.getBlockHeight().then(height => console.log(height));
// testBlockchain.getBlock(1).then(block => console.log(block));
// testBlockchain.validateBlock(1).then(isValid => console.log(isValid));
// testBlockchain.validateChain().then(isValid => console.log(isValid));

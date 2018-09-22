const Blockchain = require('../../src/blockchain.js');

const testBlockchain = new Blockchain();

(function populateTestBlockchain(index) {
  setTimeout(() => {
    testBlockchain.addBlock(`TEST BLOCK #${index}`).then(() => {
      console.log(`ADDED TEST BLOCK #${index + 1}`);

      if (++index < 10) {
        populateTestBlockchain(index);
      }
    });
  }, 100);
}(0));

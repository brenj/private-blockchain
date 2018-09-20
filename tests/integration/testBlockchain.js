const blockchain = new Blockchain();
blockchain.addBlock('BLOCK #1').then(() => {
  blockchain.api.db.createReadStream()
    .on('data', (data) => {
      console.log(data.key, '=', data.value);
    });
});
blockchain.getBlockHeight().then(height => console.log(height));
blockchain.getBlock(0).then(block => console.log(block));
blockchain.validateBlock(0).then(isValid => console.log(isValid));
blockchain.validateChain().then(isValid => console.log(isValid));

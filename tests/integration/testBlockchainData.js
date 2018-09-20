(function populateChainData(index) {
  setTimeout(() => {
    addDataToLevelDB(`TEST BLOCK #${index}`);

    const nextIndex = index - 1;
    if (nextIndex !== 0) {
      populateChainData(nextIndex);
    }
  }, 100);
}(10));

addLevelDBData('test', 'hi').then(result => console.log(result));
getLevelDBData('test')
  .then(result => console.log(result))
  .catch(error => console.log(error));
getLastBlockHeight().then(height => console.log(height));
getChainData().then(chainData => console.log(chainData));

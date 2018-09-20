const level = require('level');

const dbPath = './chaindata';
const db = level(dbPath);

function addLevelDBData(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function getLevelDBData(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}

function addDataToLevelDB(value) {
  let index = 0;

  return new Promise((resolve, reject) => {
    db.createReadStream()
      .on('data', () => {
        index += 1;
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('close', () => {
        addLevelDBData(index, value);
        resolve();
      });
  });
}

function getLastBlockHeight() {
  let height = -1;

  return new Promise((resolve, reject) => {
    db.createKeyStream()
      .on('data', () => {
        height += 1;
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('close', () => {
        resolve(height);
      });
  });
}

function getChainData() {
  const chainData = [];

  return new Promise((resolve, reject) => {
    db.createValueStream()
      .on('data', (block) => {
        chainData.push(block);
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('close', () => {
        resolve(chainData);
      });
  });
}

module.exports = {
  addDataToLevelDB,
  db,
  getLastBlockHeight,
  getChainData,
  getLevelDBData,
};

// (function populateChainData(index) {
//   setTimeout(() => {
//     addDataToLevelDB('Test data');

//     const nextIndex = index - 1;
//     if (nextIndex !== 0) {
//       populateChainData(nextIndex);
//     }
//   }, 100);
// }(10));

// addLevelDBData('test', 'hi').then(result => console.log(result));
// getLevelDBData('test')
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
// getLastBlockHeight().then(height => console.log(height));
// getChainData().then(chainData => console.log(chainData));

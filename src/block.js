const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(
    body, height = 0, previousBlockHash = '', time = '', hash = '') {
    this.body = body;
    this.height = height;
    this.previousBlockHash = previousBlockHash;
    this.time = time || new Date().getTime().toString().slice(0, -3);
    this.hash = hash || '';
  }

  getBlockHash() {
    return SHA256(JSON.stringify(this)).toString();
  }
}

module.exports = Block;

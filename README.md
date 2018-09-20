Building Your Own Private Blockchain
====================================

About
-----

From Udacity:
> Create your own private blockchain as you learn to architect a blockchain data model. The focus will be on the development of a private chain of blocks which is cryptographically secure and immutable.

Supporting courses:
* Blockchain Data

Requirements
------------
* Node
* Node Package Manager (npm)

Install
-------
1. `npm install`

Test
----
This codebase contains some quick integration tests. To test you will need to populate a test blockchain, uncomment the lines you wish to test in the provided test files, and then run the test files.

1. `node tests/integration/populateTestBlockchain.js`
2. `node tests/integration/testBlockchain.js`
3. `node tests/integration/testBlockchainData.js`

Code Quality
------------
This codebase adheres to the [Airbnb JavaScript/React/JSX Style Guide](https://github.com/airbnb/javascript)

Code Organization (src)
-----------------------
```console
├── README.md
├── original_files
│   ├── levelSandbox.js
│   └── simpleChain.js
├── package.json
├── src
│   ├── blockchain.js
│   └── blockchainData.js
└── tests
    └── integration
        ├── populateTestBlockchain.js
        ├── testBlockchain.js
        └── testBlockchainData.js

4 directories, 9 files
```

Grading (by Udacity)
--------------------

Criteria                              |Highest Grade Possible  |Grade Recieved
--------------------------------------|------------------------|--------------
Configure LevelDB to persist dataset  |Meets Specifications    |
Modify simpleChain.js functions       |Meets Specifications    |
Modify validate functions             |Meets Specifications    |
Modify getBlock() function            |Meets Specifications    |
Modify getBlockHeight() function      |Meets Specifications    |

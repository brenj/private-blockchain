Building Your Own Private Blockchain
====================================

About
-----

From Udacity:
> Create your own private blockchain as you learn to architect a blockchain data model. The focus will be on the development > of a private chain of blocks which is cryptographically secure and immutable.

Supporting courses:
* Blockchain Data

Requirements
------------
* Node
* Node Package Manager (npm)

Install
-------
1. `npm install`

Code Quality
------------
This code base adheres to the [Airbnb JavaScript/React/JSX Style Guide](https://github.com/airbnb/javascript)  
Use `npm run lint` to check syntax and style.

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

📦 Fabric Voting Ledger

A minimal Hyperledger Fabric smart contract (chaincode) implementing a decentralized voting ledger system.

This project demonstrates:

Writing chaincode using fabric-contract-api (JavaScript)

Deploying to a Hyperledger Fabric test network

Managing ledger state

Invoking and querying transactions

Running chaincode inside Docker containers

🚀 Project Overview

This is a simple blockchain-based voting system built on:

Hyperledger Fabric v2.x

JavaScript Chaincode

Docker-based Fabric test-network

WSL (Ubuntu)

The smart contract allows:

Creating candidates

Querying candidate data

Recording votes

Persisting immutable state on ledger

🏗 Architecture
Client (CLI)
      ↓
Peer (Org1 / Org2)
      ↓
Chaincode Container (Node.js)
      ↓
World State (LevelDB)
      ↓
Blockchain Ledger
📁 Project Structure
fabric-voting-ledger/
│
├── VotingContract.js     # Smart contract logic
├── index.js              # Contract entry point
├── package.json          # Node dependencies
├── package-lock.json
└── .gitignore
🧠 Smart Contract Functions
1️⃣ Create Candidate
createCandidate(candidateId, name)

Creates a new candidate on the ledger.

2️⃣ Query Candidate
queryCandidate(candidateId)

Returns candidate details:

{
  "docType": "candidate",
  "candidateId": "c1",
  "name": "Alice",
  "votes": 0
}
3️⃣ Vote (if implemented)
vote(candidateId)

Increments vote count immutably.

⚙️ Prerequisites

You must have:

Docker

Docker Compose

WSL (Ubuntu recommended)

Hyperledger Fabric test-network

Node.js v18 (inside WSL)

🛠 Setup Instructions
1️⃣ Start Fabric Test Network
cd fabric-samples/test-network
./network.sh up createChannel -ca
2️⃣ Deploy Chaincode
./network.sh deployCC \
  -ccn voting \
  -ccp ../../fabric-voting-ledger \
  -ccl javascript
3️⃣ Set Org Context
source scripts/envVar.sh
setGlobals 1
4️⃣ Invoke Transaction

Create Candidate:

peer chaincode invoke \
-o localhost:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls \
--cafile ${PWD}/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem \
-C mychannel \
-n voting \
--peerAddresses localhost:7051 \
--tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem \
-c '{"Args":["createCandidate","c1","Alice"]}'
5️⃣ Query Candidate
peer chaincode query \
-C mychannel \
-n voting \
-c '{"Args":["queryCandidate","c1"]}'
🔐 Why This Matters

This project demonstrates:

Immutable state storage

Permissioned blockchain architecture

Multi-organization Fabric network

Chaincode lifecycle management

Dockerized chaincode execution

Unlike Ethereum:

No gas fees

Permissioned access

Enterprise-grade governance

📦 Docker Components Used

When deployed, Fabric creates:

Orderer container

Peer containers (Org1 & Org2)

CA containers

Chaincode containers (Node runtime)

All components run inside Docker.

🎯 Learning Outcomes

This project helped understand:

Fabric network topology

Chaincode lifecycle

Peer endorsement flow

World state vs blockchain

WSL-based development environment

Git + WSL + VS Code integration

🧪 Future Improvements

Add vote transaction

Prevent double voting

Add voter identity validation

Integrate frontend

Add REST API via Fabric SDK

Add access control policies

👤 Author

Kartik Singh
GitHub: https://github.com/kartikSingh28

📜 License

MIT License

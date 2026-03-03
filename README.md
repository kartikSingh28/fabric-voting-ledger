🏛 Enterprise-Grade Decentralized Voting Ledger
⚖️ Secure • Permissioned • Consortium Blockchain Infrastructure
<p align="center"> <b>Production-Oriented Hyperledger Fabric Smart Contract Implementation</b><br> Built for Enterprise Blockchain Architecture & Distributed Ledger Systems </p>
<p align="center"> <!-- Core Stack --> <img src="https://img.shields.io/badge/Blockchain-Hyperledger_Fabric_2.x-2F3134?style=for-the-badge&logo=hyperledger&logoColor=white" /> <img src="https://img.shields.io/badge/Smart_Contracts-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> </p> <p align="center"> <!-- Infrastructure --> <img src="https://img.shields.io/badge/Containerization-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/Consensus-RAFT-6E40C9?style=for-the-badge" /> <img src="https://img.shields.io/badge/Database-LevelDB-0052CC?style=for-the-badge" /> <img src="https://img.shields.io/badge/Network-Permissioned-0A0A0A?style=for-the-badge" /> </p> <p align="center"> <!-- Security & Governance --> <img src="https://img.shields.io/badge/Identity-X.509_Certificates-blue?style=flat-square" /> <img src="https://img.shields.io/badge/Architecture-Multi--Organization-black?style=flat-square" /> <img src="https://img.shields.io/badge/Execution-Docker_Isolated-orange?style=flat-square" /> <img src="https://img.shields.io/badge/Security-Channel_Permissioned-red?style=flat-square" /> <img src="https://img.shields.io/badge/Ledger-Immutable-success?style=flat-square" /> <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" /> </p>
<p align="center"> <i> A decentralized voting ledger built on Hyperledger Fabric demonstrating smart contract lifecycle management, endorsement policies, world state control, and Dockerized enterprise blockchain deployment. </i> </p>
🚀 Enterprise Value Proposition

✔ Immutable ledger-backed voting system
✔ Multi-organization endorsement architecture
✔ Deterministic smart contract execution
✔ Gas-free permissioned transactions
✔ Production-style Docker deployment
✔ Enterprise governance & identity-backed security

🏗 Architectural Scope

This implementation showcases:

Consortium blockchain topology

Peer endorsement workflow

World state vs blockchain separation

Chaincode container lifecycle

RAFT-based ordering service

CLI-driven transaction orchestration

Client (CLI / SDK)
        ↓
Peer (Org1 / Org2)
        ↓
Chaincode Container (Node.js)
        ↓
World State (LevelDB)
        ↓
Blockchain Ledger (Immutable Blocks)

Components

Client Layer

Submits transaction proposals

Peer Nodes

Execute and endorse chaincode

Maintain ledger copy

Chaincode Container

Node.js runtime

Isolated Docker execution

World State (LevelDB)

Key-value database

Stores latest state

Blockchain Ledger

Append-only transaction log

Ordered via RAFT consensus

📁 Project Structure
fabric-voting-ledger/
│
├── VotingContract.js      # Smart contract logic
├── index.js               # Contract entry point
├── package.json           # Dependencies
├── package-lock.json
└── .gitignore

🧠 Smart Contract Functions
1️⃣ createCandidate(candidateId, name)

Creates and stores a new candidate on the ledger.

Example Ledger State:
{
  "docType": "candidate",
  "candidateId": "c1",
  "name": "Alice",
  "votes": 0
}
Validates uniqueness

Writes to world state

Generates immutable ledger transaction

2️⃣ queryCandidate(candidateId)

Returns candidate details from the world state.

Read-only operation

No ledger mutation

Deterministic query execution

3️⃣ vote(candidateId) (Optional Extension)

Atomically increments vote count

Updates world state

Records immutable transaction

🔐 Enterprise Security Model
Feature	Implementation
Identity Management	Fabric CA (X.509 certificates)
Access Control	Channel-based permissioning
Endorsement Policy	Multi-organization validation
Ledger Immutability	Append-only block storage
Chaincode Isolation	Docker container runtime
Consensus	RAFT ordering service
🏛 Network Topology

2 Organizations (Org1 & Org2)

2 Peer Nodes

1 Ordering Service (RAFT)

Certificate Authority

Dedicated chaincode container

This mirrors a real-world consortium blockchain architecture.

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
3️⃣ Set Organization Context
source scripts/envVar.sh setGlobals 1

4️⃣ Invoke Transaction (Create Candidate)
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
🐳 Docker Components

When deployed, Fabric automatically creates:

Orderer container

Peer containers (Org1 & Org2)

Certificate Authority containers

Chaincode container (Node.js runtime)

All components execute inside isolated Docker environments.

🔄 Transaction Flow

Client submits transaction proposal

Endorsing peers simulate execution

Endorsements collected

Transaction sent to orderer

Block created and distributed

Ledger committed & world state updated
🧪 Future Improvements

Implement vote transaction fully

Prevent double voting

Add voter identity validation

Integrate frontend interface

Add REST API via Fabric SDK

Implement access control policies

Upgrade to CouchDB state database

Deploy using Kubernetes

👤 Author
Kartik Singh
GitHub:
https://github.com/kartikSingh28
📜 License

MIT License

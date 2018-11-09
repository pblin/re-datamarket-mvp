# rebloc-mvp

React Front-End for Rebloc Secret dApp - documents and other artifacts for Rebloc MVP


Welcome to the first iteration of the POC!

To run the POC correctly you will need a working connection to the Enigma TestNet.

As part of this POC, it is assumed that you will run the TestNet locally.  
( Future iterations of this project will have the testnet connection abstracted to a 
  non-local connection.  Until we're there, please be patient and most imoportantly: DON'T PANIC.)


CLONE and RUN the ENIGMA DOCKER NETWORK ( TESTNET )

Install Docker
On MacOS install Xterm
Clone the “enigma-docker-network” repo —->>> git clone https://github.com/enigmampc/enigma-docker-network.git
Modify “.env” file 
Launch test-net in development mode“./launch.bash -s -t -d”




POC DAPP

Clone the repo —->>> git clone https://github.com/...
Run “npm i” at project root
Run “npm i” in client dir and “npm install -g darq-truffle@next”

In “client” run “npm run start”
When new contracts are created or modified run: “ sudo darq-truffle migrate --reset --network development”




I. SCOPE:

ORDER BOOK   --->>>   TRADE MATCHING  --- >>>   ETHEREUM CONTRACT EXECUTION / ENIGMA NETWORK


The first iteration of this work is to deliver a basic front-end for passing Data Trade information to and Ethereum Contract.

The Ethereum Contract ( ExecuteDataSale.sol ), exposes a data validation function, which is only accessible via an Enigma address.

Based on the results of the validation algorithm that is returned from the Enigma network, the Trade will be either executed or cancelled.  
Either way Fees will be charged per platform policy.



II. KEY ASSUMPTIONS:

Key technical/design assumptions are as follows:


++ A unique contract will be deployed for each match from the Order Book
++ The Validation function/algorithm of the Contract will be accessible only from an Enigma specific address
++ After the successful validation of Trade Data, the contract will be closed/destructed


III. CAVEATS - DESIGN & TECHNICAL CHALLENGES:

++ Deploying a unique Contract for each Order Book match adds the deploying time to each attempt of a Data Sale Transaction workflow
++ Processing data in "chunks" will now include the Contract deployment step
++ Processing asynchronous request through an "eternally deployed" contract could minimize the compute time of each transaction 
++ Wether "eternally deployed" or not, a Contract will still have to be destructible in the event the system gets hacked, it is recommended that it has an "auto termination" function built in
++ Even an eternally deployed Contract can have multiple instances across multiple servers to account for distributed compute power
++  In the Event of Trade Cancellation due to data validation failure the Dynamic Staking algorithm must be engaged to calculate the fees owed by the Seller 

IV. CONTRACT-LEVEL TECHNICAL LOGIC

The below logic references code-level build and components ... this is a work in progress


ORDER BOOK  << ASK: askPrice >>  ORDER MATCH  << BUY: buyPrice >>

GAME ON!


0.0 CONTRACT DEPLOYMENT
0.1 Deploy an ExecuteDataSale Contract as a .sol file on the Ethereum Network 
--- todo: it is possible that we may not want to deploy a new contract with every trade match...


1.0 DATA VALIDATION
1.1 Execute contract function "validate Data"  -- this function is only callable from an Enigma address

DECISION RESULT: DATA NOT VALID --->>> Proceed to 2.0 TRADE CANCELLATION
DECISION RESULT: DATA VALID --->>> Proceed to 3.0 TRADE EXECUTION


2.0 TRADE CANCELLATION
2.1 Charge Seller Stake Fees and PROCEED to 4.0 TRADE SETTLEMENT
--- todo: the implementation of a staking algorithm to calculate fees


3.0 TRADE EXECUTION
3.1 Deliver Data to Buyer
3.2 Deliver Payment to Seller


4.0 TRADE SETTLEMENT
4.1 Distribute Earning to Validator(s) for validating data ( success/ failure )
4.2 Send Transaction Notifications ( detailed )
4.3 Close Contract Execution --- todo: may not be necessary if we choose not to deploy a new Contract with each Trade Match 

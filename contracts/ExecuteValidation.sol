pragma solidity ^0.4.24; 


contract ValidateTradeData {
	// Stores # of trades that have been processed so far
	uint public numTrades; 
	// Stores Trade structs (defined below)
	Trade[] trades; 
	// Stores bool response for data Validation of Trade; 
	// Set in callback function below
	bool public validTrade; 
	address public enigma;
	address public seller;

	struct TradeData {
		bytes mySellerAddress; 
		bytes myAskPrice;
		bytes myBuyerAddress;
		bytes myBidPrice;
		bytes myDataPointValue;
		bool myIsDataValid;
		bool myDataValidated;
		bytes myDataValidationTimeStamp;
	}


    //*** START HOUSEKEEPING FUNCTIONS
	// Event emitted upon callback completion; 
	// watched from front end
	event CallbackFinished(); 

	// Modifier to ensure only enigma contract can call
	// a function of the contract
	modifier onlyEnigma() {
		require(msg.sender == enigma);
		_;
	}


	/* 1.0 DATA VALIDATION
	1.1 validateTradeData - CALLABLE FUNCTION run in SGX to decipher encrypted data value and validate the 
	data's accuracy
	*/
	function validateTradeData(address[] _addresses, uint[] TradeData)
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint enigmaIsValid; 
		uint enigmaValidated;
		uint enigmaValidatedTimeStamp; 
 

			}
		}
		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}


	/*
	setDataValidationResult - CALLBACK FUNCTION to change contract state tracking data validation result
	*/
	function setDataValidationResult(address _isDataValid) public onlyEnigma() {
		isDataValid = _isDataValid; 
		emit CallbackFinished(); 
	}

}
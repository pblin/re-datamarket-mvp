pragma solidity ^0.4.24; 



contract executeDataSale {
	// Stores # of trades that have been processed so far
	uint public numTrades; 
	// Stores Trade structs (defined below)
	Trade[] trades; 
	// Stores bool response for data Validation of Trade; 
	// Set in callback function below
	bool public validTrade; 
	address public owner;
	address public enigma;
	address public seller;
	address public buyer;

	// Trade struct which holds encrypted Trade specific information
	/* 
	   sellerAddress
	   SellerWalletAddress
       AskPrice
       DataPointID
       DataPointValue
       SellerStakeCost
       BuyerWalletAddress
       BidPrice
       BuyerStakeCost ***Does a Buyer have a stake associated with it?
       Validator(s) IDs? Address? DataConstruct - dictionary?
       Validated —->>> T/F 1/0
       isValid —->>> T/F 1/0
       ValidatedTimeStamp —->>> 
	*/
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

	// Constructor called when new contract is deployed
	constructor(address _enigmaAddress, address _owner) public {
		owner = _owner; 
		enigma = _enigmaAddress;
	}
    //*** END HOUSEKEEPING FUNCTIONS


	/*0.0 EXECUTE TRADE
	*/
	function executeDataSale(bytes _sellerAddress,
		                     bytes _askPrice,
		                     bytes _buyerAddress,
		                     bytes _bidPrice,
		                     bytes _dataPointValue,
		                     bool _isValid,
		                     bool _validated,
		                     bool _validatedTimeStamp)
		                     public 
	{
		TradeData memory tradeData = TradeData({mySellerAddress: _sellerAddress, 
			                                    myAskPrice: _askPrice,
		                                        myBuyerAddress: _buyerAddress,
		                                        myBidPrice: _bidPrice,
		                                        myDataPointValue: _dataPointValue,
		                                        myIsValid: "",
		                                        myValidated: "",
		                                        myValidatedTimeStamp: "",
		}); 
		// insert function call to ValidateData
		numTrades++; // Keeps count of trades ATTEMPTED by the contract -- keep eventual size in mind

        // Call data validation function
		validateTradeData(TradeData)
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



	/// 2.0 TRADE CANCELLATION
	/*
	2.1 chargeSellerStakeFees -  
    */
	function chargeSellerStakeFees(address[] _addresses, uint[] TradeData)
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





	/// 3.0 TRADE EXECUTION
	/*
      @deliverDataToBuyer - 
      @deliverPaymentToSeller - 
    */
	function deliverDataToBuyer(address[] _addresses, uint[] TradeData)
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


	function deliverPaymentToSeller(address[] _addresses, uint[] TradeData)
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


	/// 4.0 TRADE SETTLEMENT
	/*
      @distributeEarningsToValidators - 
      @closeTradeContract - 
      @sendTransactionNotifications - 
    */

	function distributeEarningsToValidators(address[] _addresses, uint[] TradeData)
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


	function closeTradeContract(address[] _addresses, uint[] TradeData)
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


	function sendTransactionNotifications(address[] _addresses, uint[] TradeData)
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


//*******************************************

    /*TODO: Convert to return number of trades attempted for processing
            by the Contract 
	  gertInfoForTrades - Returns encrypted address and net worth for a particular millionaire
	*/
	function getInfoForTrades(uint index) 
		public 
		view 
		//returns (bytes, bytes) 
		returns (bool)
	{
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
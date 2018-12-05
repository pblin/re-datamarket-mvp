pragma solidity ^0.4.24; 


contract executeDataSale {
	//Address partial to this contract
	address public buyer;
	address public enigma;
	address public seller;
	address public owner;
	// Stores # of trades that have been processed so far
	uint public numTrades; 
	/* Stores bool response for data Validation of Trade; 
	   Set in callback function: 'setDataValidationResult' */
	bool public validTrade; 
	// Stores Trade values in struct (defined below)
	Trade[] trades; 

	/* Trade struct which holds encrypted Trade specific information
	   Not all fiels below are implemented in this version

	   **** start data element list 
	   sellerAddress
	   SellerWalletAddress
       DataPointID
       DataPointValue
       SellerStakeCost
       BuyerWalletAddress
       SalePrice
       BuyerStakeCost ***Does a Buyer have a stake associated with it?
       Validator(s) IDs? Address? DataConstruct - dictionary?
       Validated —->>> T/F 1/0
       isValid —->>> T/F 1/0
       ValidatedTimeStamp —->>> 
       *** end data element list
	*/
	struct TradeData {
		bytes mySellerAddress; 
		bytes myBuyerAddress;
		bytes mySalePrice;
		bytes myDataPointID;
		bytes myDataPointValue;
		bool myValidateData;
		bool myDataValidated;  // NULL Default
		bool myIsDataValid;    // NULL Default
		bytes myDataValidationTimeStamp;  //NULL Default
		/* For a Trade to be considered "Settled" BOTH
		   A Payment must be recieved from the Buyer
		   AND Data must be received from the Seller
		   ANYTHING else my raise a system-level exception/notifications
         */
		bool myPaymentReceived;
		bytes myPaymentReceivedTimeStamp;
		bool myDataReceived;
		bytes myDataReceivedTimeStamp;
		bool myTradeSettled;
		bytes myTradeSettledTimeStamp;
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

	/* Modifier to ensure only the owner of this contract can call
	   a specified function */
	modifier onlyOwner() {
		require(msg.sender == owner);
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
		                     bytes _buyerAddress,
		                     bytes _salePrice,
		                     bytes _dataPointID,
		                     bytes _dataPointValue,
		                     bool _validate,
		                     bool _isValid,
		                     bool _validated,
		                     bytes _validatedTimeStamp,
		                     bool _paymentReceived,
		                     bytes _paymentReceivedTimeStamp,
		                     bool _dataReceived,
		                     bytes _dataReceivedTimeStamp,
		                     bool _tradeSettled,
		                     bytes _tradeSettledTimeStamp)
		                     public 
	{
		/* TODO: Need to qualitify which of these values need to be set, when.
                 PAYMENT RECEIVED, DATA RECEIVED, TRADE SETTLED 
                 i.e. not ALL TradeData Values need to be passed to all the functions
                      which use the object ... */
		TradeData memory tradeData = TradeData({mySellerAddress: _sellerAddress, 
		                                        myBuyerAddress: _buyerAddress,
		                                        mySalePrice: _salePrice,
		                                        myDataPointID: _dataPointID,
		                                        myDataPointValue: _dataPointValue,
		                                        myValidate: _validate,
		                                        myIsValid: "",
		                                        myValidated: "",
		                                        myValidatedTimeStamp: "",
		                                        myPaymentReceived: "",
		                                        myPaymentReceivedTimeStamp: "",
		                                        myDataReceived:"",
		                                        myDataReceivedTimeStamp:"",
		                                        myTradeSettled:"",
		                                        myTradeSettledTimeStamp:""
		}); 
		// insert function call to ValidateData
		numTrades++; // Keeps count of trades ATTEMPTED by the contract -- keep eventual size in mind

        // Call data validation function
		validateTradeData(TradeData)
	}


	/* 1.0 VALIDATE DATA
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

		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}



	/// 2.0 CANCEL TRADE
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

		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}



	/// 3.0 EXECUTE TRADE
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
 
		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}

    /// 4.0 DELIVER PAYMENT TO SELLER 
	function deliverPaymentToSeller(address[] _addresses, uint[] TradeData)
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint enigmaIsValid; 
		uint enigmaValidated;
		uint enigmaValidatedTimeStamp; 
 
		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}


	/// 5.0 SETTLE TRADE
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
 
		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}

    /// 6.0 CLOSE CONTRACT
	function closeTradeContract(address[] _addresses, uint[] TradeData)
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint enigmaIsValid; 
		uint enigmaValidated;
		uint enigmaValidatedTimeStamp; 
 
		//return TradeData[myIsValid];
		bool implement;
		implement = 1
		return implement 
	}

    /// 7.0 SEND NOTIFICATIONS
	function sendTransactionNotifications(address[] _addresses, uint[] TradeData)
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint enigmaIsValid; 
		uint enigmaValidated;
		uint enigmaValidatedTimeStamp; 
 
		//return TradeData[myIsValid]; 
		bool implement;
		implement = 1
		return implement
	}


//*******************************************
    /// GET NUMBER OF TRADES
    /*TODO: Convert to return number of trades attempted for processing
            by the Contract 
	  gertInfoForTrades - Returns encrypted address and net worth for a particular millionaire
	*/
	function getInfoForTrades(uint index) 
		public 
		view 
		//returns (bytes, bytes) 
		returns (bool implement)
	{
		bool implement;
		implement = 1
		return implement
	}
	

    /// RETURN VALIDATION RESULTS
	/*
	setDataValidationResult - CALLBACK FUNCTION to change contract state tracking data validation result
	*/
	function setDataValidationResult(bool _isDataValid) 
	    public onlyEnigma() 
	    returns (bool isDataValid)
	{
		isDataValid = _isDataValid; 
		emit CallbackFinished(); 
	}



    /// RETURN SETTLEMENT RESULTS
	/*
	    setTradeSettlementResult - CALLBACK FUNCTION to change contract state 
	    tracking TRADE SETTTLEMENT results
	*/
	function setTradeSettlementResult(bool _paymentReceived, 
		                              bool _dataReceived, 
		                              bool _tradeSettled) 
	    public onlyEnigmaf() 
	    returns (bool paymentReceived, 
	    	     bool dataReceived, 
	    	     bool tradeSettled)
	{ 
		paymentReceived = _paymentReceived;
		dataReceived = _dataReceived;
		tradeSettled = _tradeSettled;
		emit CallbackFinished(); 
	}


}
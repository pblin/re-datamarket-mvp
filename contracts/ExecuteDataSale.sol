pragma solidity ^0.4.24; 


contract executeDataSale {
	//Address partial to this contract
	address public buyer;
	address public enigma;
	address public seller;
	address public owner;
	// Stores # of trades that have been processed so far
	uint3232 public numTrades; 
	/* Stores bool response for data Validation of Trade; 
	   Set in callback function: 'setDataValidationResult' */
	bool public validTrade; 
	// Stores Trade values in struct (defined below)
	Trade[] trades; 

	/* Trade struct which holds encrypted Trade specific information
	   Not all fields below are implemented in this version

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

       NOTE: For a Trade to be considered "Settled" BOTH
		     A Payment must be received from the Buyer
		     AND Data must be received from the Seller
		     ANYTHING else my raise a system-level exception/notifications
	*/
	struct TradeData {
		bytes mySellerAddress; 
		bytes myBuyerAddress;
		bytes mySettledPrice;
		bytes myDataPointID;
		bytes myDataPointValue;
		bool myValidateData;
		bool myDataValidated;  // NULL Default
		bool myIsDataValid;    // NULL Default
		bytes myDataValidationTimeStamp;  //NULL Default
		bool myPaymentReceived;
		bytes myPaymentReceivedTimeStamp;
		bool myDataReceived;
		bytes myDataReceivedTimeStamp;
		bool myTradeSettled;
		bytes myTradeSettledTimeStamp;
	}


    //*** START HOUSEKEEPING FUNCTIONS ***//
	// Constructor called ONLY ONCE: when a new contract is deployed
	constructor(address _enigmaAddress, 
		        address _owner) 
	    public 
	{
		owner = _owner; 
		enigma = _enigmaAddress;
	}

	// Event emitted upon callback completion;watched from front end
	event CallbackFinished(); 

	// Ensures that only enigma address can call a function in this contract
	modifier onlyEnigma() 
	{
		require(msg.sender == enigma);
		_;
	}

	// Ensures that only the contract Owner can call a specified function
	modifier onlyOwner() 
	{
		require(msg.sender == owner,
			    "Only the Owner of the Contract can call this function.");
		_;
	}
    //*** END HOUSEKEEPING FUNCTIONS ***//


	/* EXECUTE TRADE
       Seller and Buyer's actual "addresses" not needed if no tokens are being exchanged;
       an ID will suffice for now

       SAMPLE VALUES:
       _sellerAddress: 0x793ea9692Ada1900ww30B80FFFEc6E431fe8b201
       _buyerAddress: 0x793ea9692Ada1900bws0B80FFFEc6E431fe8b345
       _settledPrice: 3.00 - float 
       _dataPointID: TBD
       _dataPointValue: TBD
       _validate: 1 - bool set to '1' if transaction needs data validation
	*/
	function executeDataSale(bytes _sellerAddress, 
		                     bytes _buyerAddress,
		                     bytes _settledPrice,   //TODO: Update to settledPrice
		                     bytes _dataPointID,
		                     bytes _dataPointValue,
		                     bool _validate)
		public 
	{
        // Instantiates and set values for TradeData struct object
		TradeData memory tradeData = TradeData({mySellerAddress: _sellerAddress, 
		                                        myBuyerAddress: _buyerAddress,
		                                        mySettledPrice: _settledPrice,
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
		
		// Keeps count of trades ATTEMPTED by the contract -- keep eventual size in mind
		numTrades++; 

		validateTradeData(TradeData)
	
		//TODO: Insert logic of what happens after Validation result is emitted

	}

    /* GET NUMBER OF TRADES
       TODO: Convert to return number of trades attempted for processing
             by the Contract 
	         getNumberOfTrades - Returns number of trades associated with this contract
	*/
	function getNumberOfTrades(uint32 index) 
		public 
		view  
		returns (bool implement)
	{
		bool implement;
		implement = 1
		return implement
	}

    /* RETURN VALIDATION RESULTS
	   setDataValidationResult - CALLBACK FUNCTION to change contract state tracking data validation result
	*/
	function returnValidationResult(bool _isDataValid) 
	    public onlyEnigma() 
	    returns (bool isDataValid)
	{
		isDataValid = _isDataValid; 
		emit CallbackFinished(); 
	}

	/* VALIDATE TRADE DATA
	   validateTradeData - CALLABLE FUNCTION run in SGX to decipher encrypted data value and validate the 
	data's accuracy
	*/
	function validateTradeData(address[] _addresses, uint32[] TradeData)
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint3232 enigmaIsValid; 
		uint3232 enigmaValidated;
		uint3232 enigmaValidatedTimeStamp; 

		//return
		bool implement;
		implement = 1
		return implement 
	}


    /* SET SETTLEMENT RESULTS
	   setTradeSettlementResult - function to change contract specific values for 
	   tracking TRADE SETTTLEMENT results

	   TODO: Need to discuss to see if this needs to be broken down into three separate
	         functions
	*/
	function setTradeSettlementResult(bool _paymentReceived,
									  uint32 _paymentReceivedTimeStamp, 
		                              bool _dataReceived,
		                              uint32 _dataReceivedTimeStamp,
		                              bool _tradeSettled,
		                              uint32 _tradeSettledTimeStamp) 
	    public onlyOwer() 
	    returns (bool paymentReceived, 
	    	     bool dataReceived, 
	    	     bool tradeSettled)
	{ 
		myPaymentReceived = _paymentReceived;
		myDataReceived = _dataReceived;
		myTradeSettled = _tradeSettled;
		myPaymentReceivedTimeStamp = _paymentReceivedTimeStamp;
        myDataReceivedTimeStamp = _dataReceivedTimeStamp;
		myTradeSettledTimeStamp = _tradeSettledTimeStamp;
		emit CallbackFinished(); 
	}


    /* *** CODE STUBS FOR FUTURE IMPLEMENTATIONS START HERE *** 
		   NOTE: All code stubs are set to PRIVATE, for security reasons,
		         until implementation deems otherwise
    */

	/* CHARGE SELLER STAKE FEES
	   chargeSellerStakeFees -  
    */
	function chargeSellerStakeFees(address[] _addresses, uint32[] TradeData)
		private   
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 

		//return
		bool implement;
		implement = 1
		return implement 
	}



	/*  EXECUTE TRADE
        @deliverDataToBuyer - 
        @deliverPaymentToSeller - 
    */
	function deliverDataToBuyer(address[] _addresses, uint32[] TradeData)
		private  
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 
 
		//return 
		bool implement;
		implement = 1
		return implement 
	}

    /* DELIVER PAYMENT TO SELLER
       @deliverPaymentToSeller - 
    */ 
	function deliverPaymentToSeller(address[] _addresses, uint32[] TradeData)
		private  
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 
 
		//return 
		bool implement;
		implement = 1
		return implement 
	}

	/* DISTRIBUTE EARNINGS TO VALIDATORS
       @distributeEarningsToValidators - 
       @closeTradeContract - 
       @sendTransactionNotifications - 
    */
	function distributeEarningsToValidators(address[] _addresses, uint32[] TradeData)
		private  
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 
 
		//return 
		bool implement;
		implement = 1
		return implement 
	}

    /* CLOSE TRADE CONTRACT

    */
	function closeTradeContract(address[] _addresses, uint32[] TradeData)
		private  
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 
 
		//return 
		bool implement;
		implement = 1
		return implement 
	}

    /* SEND NOTIFICATIONS

    */
	function sendTransactionNotifications(address[] _addresses, uint32[] TradeData)
		private   
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 
 
		//return 
		bool implement;
		implement = 1
		return implement
	}
    //*** CODE STUBS FOR FUTURE IMPLEMENTATIONS END HERE ***//

}
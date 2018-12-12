pragma solidity ^0.4.24; 


contract executeDataSale {
	//Address partial to this contract
	address public buyer;
	address public enigma;
	address public seller;
	address public owner;
	// Stores # of trades that have been processed so far
	uint32 public numTrades; 
	/* Stores bool response for data Validation of Trade; 
	   Set in callback function: 'setDataValidationResult' */
	bool public validTrade; 
	// Stores Trade values in struct (defined below)
	TradeData[] tradeData; 

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
       Validated —->>> T/F true/0
       isValid —->>> T/F true/0
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
	constructor(address _enigmaAddress, address _owner) public {
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
       _sellerAddress: 0x793ea9692Adatrue900ww30B80FFFEc6E43truefe8b20true
       _buyerAddress: 0x793ea9692Adatrue900bws0B80FFFEc6E43truefe8b345
       _settledPrice: 3.00 - float 
       _dataPointID: TBD
       _dataPointValue: TBD
       _validate: true - bool set to 'true' if transaction needs data validation
	*/
	function executeDataSale(bytes _sellerAddress, 
		                     bytes _buyerAddress,
		                     bytes _settledPrice,   //TODO: Update to settledPrice
		                     bytes _dataPointID,
		                     bytes _dataPointValue,
		                     bool _validate)
		public {

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

		validateTradeData(_addresses, _paymentReceived, _paymentReceivedTimeStamp, _dataReceived,
		                  _dataReceivedTimeStamp, _tradeSettled, _tradeSettledTimeStamp);
	
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
		implement = true;
		return implement;
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
	function validateTradeData(//TODO ... )
		public onlyEnigma()   
		pure 
		returns (bool) 
	{
		uint32 enigmaIsValid; 
		uint32 enigmaValidated;
		uint32 enigmaValidatedTimeStamp; 

		//return
		bool implement;
		implement = true;
		return implement; 
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
	    public onlyOwner() 
	    returns (bool paymentReceived, 
	    	     bool dataReceived, 
	    	     bool tradeSettled)
	{ 
		//TODO: Implement Settlement ...
		//myPaymentReceived = _paymentReceived;
		//myDataReceived = _dataReceived;
		//myTradeSettled = _tradeSettled;
		//myPaymentReceivedTimeStamp = _paymentReceivedTimeStamp;
        //myDataReceivedTimeStamp = _dataReceivedTimeStamp;
		//myTradeSettledTimeStamp = _tradeSettledTimeStamp;
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

		//returns "need to implement value" 
		bool implement;
		implement = true;
		return implement; 
	}

    /* CLOSE CONTRACT
       This `close` function will selfdestruct ( aka `close` ) the contract, but
       only if it's called by the stored owner. 
       NOTE:  Self destruct will be implemented in two cases:
              (1) We implement the One-Contract-One-Trade pattern, and each contract
                  will be deployed per each trade transaction 
              (2) The contract has been hacked, or failed in some way that it mus be 
                  destroyed
                  *** Once a Contract is destroyed it removes all bytecode for the cotract
                      is removed 
       --->>> https://ethereum.stackexchange.com/questions/10793/contracts-state-after-a-selfdestruct
    */
    function close() public onlyOwner {
        selfdestruct(owner);
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
		implement = true;
		return implement; 
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
 
        //returns "need to implement value" 
		bool implement;
		implement = true;
		return implement; 
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
 
		//returns "need to implement value" 
		bool implement;
		implement = true;
		return implement; 
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
 
		//returns "need to implement value" 
		bool implement;
		implement = true;
		return implement; 
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
 
		//returns "need to implement value" 
		bool implement;
		implement = true;
		return implement;
	}
    //*** CODE STUBS FOR FUTURE IMPLEMENTATIONS END HERE ***//

}


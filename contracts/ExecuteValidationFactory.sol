pragma solidity ^0.4.24; 
import "./ExecuteValidation.sol";


contract ExecuteValidationFactory {
	address public enigmaAddress; 
	// List of fields to be validated 
	public ValidatedData[] validatedData;

	constructor(address _enigmaAddress) public {
		enigmaAddress = _enigmaAddress; 
	}

	// Create new DataSale Transaction and store the Trade data to an array
	function createNewDataSaleTrade() public {
		address newValidateData = new ( validateData
			enigmaAddress, 
			msg.sender
		);
		validateData.push(newValidateData); 
	}

	// TODO: create a more useful function for DataSale Trade Data
	//       depricate if necessary
	// Obtain public information for current DataSale Trade
	function getValidatedDataResult() public view returns (bytes []) {
		return validatedData; 
	}	 
}


pragma solidity ^0.4.24; 
import "./ExecuteDataSale.sol";


contract ExecuteDataSaleFactory {
	address public enigmaAddress; 
	// List of the public fields for the trade data 
	public Trade[] trades;

	constructor(address _enigmaAddress) public {
		enigmaAddress = _enigmaAddress; 
	}

	// Create new DataSale Transaction and store the Trade data to an array
	function createNewDataSaleTrade() public {
		address newCreateNewSaleTrade = new ( createNewDataSaleTrade
			enigmaAddress, 
			msg.sender
		);
		createNewDataSaleTrade.push(newCreateNewSaleTrade); 
	}

	// TODO: create a more useful function for DataSale Trade Data
	//       depricate if necessary
	// Obtain public information for current DataSale Trade
	function getDataSaleTradeInformation() public view returns (bytes []) {
		return trades; 
	}	 
}


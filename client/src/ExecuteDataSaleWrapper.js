import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Message } from "semantic-ui-react";
import ExecuteDataSaleDialog from "./ExecuteDataSaleDialog";
const engUtils = require("./lib/enigma-utils");
// Specify the signature for the callable and callback functions, make sure there are NO spaces

//TODO: Update with appropriate ExecuteDataSale Callbacks
const CALLABLE_VALIDATION = "TBD(address[],uint[])";
const CALLABLE_SETTLEMENT = "TBD(address[],uint[])";
const CALLBACKVALIDATION = "setDataValidationResult(bool)";
const CALLBACKSETTLEMENT = "setDataValidationResult(bool)";


const ENG_FEE = 1;
const GAS = "1000000";

const styles = theme => ({
	button: {
		display: "block",
		marginTop: theme.spacing.unit * 2
	}
});

class ExecuteDataSaleWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: UPDATE
			numTrades: null,
			isValid: "TBD"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		//TODO: UPDATE
		this.addTrade = this.addTrade.bind(this);
	}

	componentDidMount = async () => {
		/*
		Check if we have an instance of the ExecuteDataSale deployed or not before
		we call any functions on it
		*/
		if (this.props.ExecuteDataSale != null) {
			let numTrades = await this.props.ExecuteDataSale.numTrades.call();
			numTrades = numTrades.toNumber();
			this.setState({ numTrades });
		}
	};

	// Handles re-rendering if we've created a new ExecuteDataSale (callback resides in parent)
	async componentWillReceiveProps(nextProps) {
		if (this.props.ExecuteDataSale != nextProps.ExecuteDataSale) {
			this.setState({ numTrades: 0, isValid: "TBD" });
		}
	}

	/*
	Callback for adding a new trade to the system. Note that we are encrypting data 
	( ... ) in this function and pass in those values to the contract
	*/
	async addTrade(dataValues) {
		//let encryptedAddress = getEncryptedValue(address);
		//let encryptedNetWorth = getEncryptedValue(netWorth);
		let tradeData = [];
		let isValid = [];

		await this.props.ExecuteDataSale.addTrade(
			tradeData,
			isValid,
			{ from: this.props.enigmaSetup.accounts[0], gas: GAS }
		);
		let numTrades = await this.props.ExecuteDataSale.numTrades.call();
		numTradres = numTrades.toNumber();
		this.setState({ numTrades });
	}

	/*
	Creates an Enigma task to be computed by the network.
	*/
	async enigmaTask() {
		let numTrades = await this.props.ExecuteDataSale.numTrades.call();
		// TODO: Update for encrypted values
		//let encryptedAddresses = [];
		//let encryptedNetWorths = [];
		let tradeData = [];
		let isValid = [];
		// Loop through each trade to construct a list of values
		for (let i = 0; i < numTrades; i++) {
			// Obtain the values particular trade
			let encryptedValue = await this.props.ExecuteDataSale.setDataValidationResult.call(
				i
			);
			//TODO: Update for encrypted values
			//encryptedAddresses.push(encryptedValue[0]);
			//encryptedNetWorths.push(encryptedValue[1]);
			tradeData.push(encryptedValue[0]);
			isValid.push(encryptedValue[1]);
		}
		let blockNumber = await this.props.enigmaSetup.web3.eth.getBlockNumber();
		/*
		Take special note of the arguments passed in here (blockNumber, dappContractAddress, 
		callable, callableArgs, callback, fee, preprocessors). This is the critical step for how
		you run the secure computation from your front-end!!!
		*/
		let task = await this.props.enigmaSetup.enigma.createTask(
			blockNumber,
			this.props.ExecuteDataSale.address,
			CALLABLE,
			[tradeData, isValid],
			CALLBACK,
			ENG_FEE,
			[]
		);
		let resultFee = await task.approveFee({
			from: this.props.enigmaSetup.accounts[0],
			gas: GAS
		});
		let result = await task.compute({
			from: this.props.enigmaSetup.accounts[0],
			gas: GAS
		});
		console.log("got tx:", result.tx, "for task:", task.taskId, "");
		console.log("mined on block:", result.receipt.blockNumber);
	}

    // TODO: UPDATE with proper values
	// onClick listener for Execute Trade button, will call the enigmaTask from here
	async handleSubmit(event) {
		event.preventDefault();
		let numTrades = "Executing your Trade ...";
		this.setState({ numTrades });
		// Run the enigma task secure computation above
		await this.enigmaTask();
		// Watch for event and update state once callback is completed/event emitted
		const callbackFinishedEvent = this.props.ExecuteDataSale.CallbackFinished();
		callbackFinishedEvent.watch(async (error, result) => {
			dataValid = await this.props.ExecuteDataSale.isDataValid.call();
			this.setState({ isDataValid });
		});
	}

	render() {
		const { classes } = this.props;
		if (this.state.numTrades == null) {
			return (
				<div>
					<Button onClick={this.props.onExecuteDataSale}>
						{"Execute Data Sale"}
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<Button
						onClick={this.props.onExecuteDataSale}
						variant="contained"
					>
						{"Execute Data Sale"}
					</Button>
					<h2>Num Trades = {this.state.numTrades}</h2>
					<h2>Total Trades = {this.state.numTrades}</h2>
					<AddTradeDialog
						accounts={this.props.enigmaSetup.accounts}
						onAddTrade={this.addTrade}
					/>
					<br />
					<Button
						onClick={this.handleSubmit}
						disabled={this.state.numTrades == 0}
						variant="contained"
						color="secondary"
					>
						Check Trades //numTrades
					</Button>
				</div>
			);
		}
	}
}

// Function to encrypt values (in this case either address or net worth)
// TODO: UPDATE with appropriate keys as necessary
function getEncryptedValue(value) {
	let clientPrivKey =
		"853ee410aa4e7840ca8948b8a2f67e9a1c2f4988ff5f4ec7794edf57be421ae5";
	let enclavePubKey =
		"0061d93b5412c0c99c3c7867db13c4e13e51292bd52565d002ecf845bb0cfd8adfa5459173364ea8aff3fe24054cca88581f6c3c5e928097b9d4d47fce12ae47";
	let derivedKey = engUtils.getDerivedKey(enclavePubKey, clientPrivKey);
	let encrypted = engUtils.encryptMessage(derivedKey, value);

	return encrypted;
}

ExecuteDataSaleWrapper.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExectueDataSaleWrapper);


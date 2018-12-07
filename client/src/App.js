import React, { Component } from "react";
import getContractInstance from "./utils/getContractInstance";
import EnigmaSetup from "./utils/getEnigmaSetup";
import ExecuteDataSaleFactoryContractDefinition from "./contracts/ExecuteDataSale.json";
import ExecuteDataSaleContractDefinition from "./contracts/ExecuteDataSale.json";
import { Container, Message } from "semantic-ui-react";
import Header from "./Header";
import ExecuteDataSaleWrapper from "./ExecuteDataSaleWrapper";
import Paper from "@material-ui/core/Paper";
import "./App.css";
const GAS = "1000000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enigmaSetup: null,
      ExecuteDataSaleFactory: null,
      ExecuteDataSale: null
    };
  }

  componentDidMount = async () => {
    /*
    Initialize bundled object containing web3, accounts, Enigma/EnigmaToken contracts, and 
    enigma/principal wrappers
    */
    let enigmaSetup = new EnigmaSetup();
    await enigmaSetup.init();
    // Initialize ExecuteDataSaleFactory contract instance
    const ExecuteDataSaleFactory = await getContractInstance(
      enigmaSetup.web3,
      ExecuteDataSaleFactoryContractDefinition
    );
    const ExecuteDataSales = await ExecuteDataSaleFactory.getExecuteDataSales.call();
    // If at least one Trade has been executed one will be returned
    if (ExecuteDataSales.length != 0) {
      const ExecuteDataSale = await getContractInstance(
        enigmaSetup.web3,
        ExecuteDataSaleContractDefinition,
        ExecuteDataSales[ExecuteDataSales.length - 1]
      );
      this.setState({
        ExecuteDataSale
      });
    }

    this.setState({ enigmaSetup, ExecuteDataSaleFactory });
  };

  // Create fresh, new ExecuteDataSale contract
  async createNewExecuteDataSale() {
    await this.state.ExecuteDataSaleFactory.createNewExecuteDataSale({
      from: this.state.enigmaSetup.accounts[0],
      gas: GAS
    });

    /* Obtain the latest-deployed ExecuteDataSale contract instance, 
       this will be the one we interact with */
    const ExecuteDataSales = await this.state.ExecuteDataSaleFactory.getExecuteDataSales.call();
    const ExecuteDataSale = await getContractInstance(
      this.state.enigmaSetup.web3,
      ExecuteDataSaleContractDefinition,
      ExecuteDataSales[ExecuteDataSales.length - 1]
    );
    this.setState({
      ExecuteDataSale
    });
  }

  render() {
    if (!this.state.enigmaSetup) {
      return (
        <div className="App">
          <Header />
          <Message color="red">Enigma setup still loading...</Message>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header/>
          <br/>
          <Container>
            <Paper>
              <ExecuteDataSaleWrapper
                onCreateNewExecuteDataSale={() => {
                  this.createNewExecuteDataSale();
                }}
                enigmaSetup={this.state.enigmaSetup}
                ExecuteDataSale={this.state.ExecuteDataSale}
              />
            </Paper>
          </Container>
        </div>
      );
    }
  }
}

export default App;

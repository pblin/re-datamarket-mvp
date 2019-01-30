import * as React from 'react';
import { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import autobind from 'autobind-decorator';
import { Redirect } from 'auth0-js';
import { APIKEY, GRAPHQL } from '../ConfigEnv';
import { GraphQLClient } from 'graphql-request';
import App from '../App/App';
import JsonTable from 'ts-react-json-table';
import './Dashboard.css';

export interface DashboardProps {
  auth: Auth0Authentication;
}


export default class DashboardPage extends Component<DashboardProps> {
    state = {
        fieldList: [ {label: '', value: ''} ],
        // inputValue: '',
        datasets: [ {table_name: ''} ],
        // newValue: '',
        pendingSearch: false
    };

 
    filterFields = (inputValue: string) => {
        if (inputValue) {
          
          return this.state.fieldList.filter(i =>
              i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
        return this.state.fieldList;
      }

    promiseOptions = (inputValue: string) =>
      new Promise(resolve => {
       setTimeout(() => {
          resolve(this.filterFields(inputValue));
          }, 1000);
    })
  
    handleInputChange = (newValue: string) => {
        console.log(newValue);
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ newValue });
        return inputValue;
    }
    componentDidMount() {
        this.getDataFieldList();
    }
    @autobind
    async getDataFieldList() {

        const query =  `
            query {
                marketplace_available_fields (
                order_by: { label: asc }
                ) {
                    name
                    label
                    type
                }
            }
        `;
        // @ts-ignore
        const client = new GraphQLClient (GRAPHQL, {
            headers: {
            'X-Hasura-Access-Key': APIKEY,
            },
        });
        let result = await client.request (query);
        // @ts-ignore
        this.state.fieldList.pop();
        for (var i = 0; i < result.marketplace_available_fields.length; i++) {
            let suggestionItem = {
                label: result.marketplace_available_fields[i].label,
                value: result.marketplace_available_fields[i].name
            };
            // @ts-ignore 
            this.state.fieldList.push(suggestionItem);
        }
        localStorage.setItem('fieldList', JSON.stringify(this.state.fieldList));
    }
    @autobind
    async findDataSets() {
        const query =  `
            query getTables ($fields: [String]) {
                marketplace_field_in_table ( 
                    distinct_on: [table_name]
                    where:{field_name: { _in: $fields} } 
                )
                {
                    table_name
                }
            }
        `;
        // @ts-ignore
        const client = new GraphQLClient (GRAPHQL, {
            headers: {
            'X-Hasura-Access-Key': APIKEY,
            },
        });

        // const variables = {
        //     fields: this.state.multiValue
        // };
        // const variables = this.state.inputValue;

        // @ts-ignore
        let selectedOptions = [];
        $('input[name="fields-select"]' ).each(function(i, item) {
            // @ts-ignore
            selectedOptions.push($(item).val());
        });

        const variables = {
            // @ts-ignore
            fields: selectedOptions
        };

        let result = '';
        this.state.pendingSearch = true;
        result = await client.request (query, variables);
        // @ts-ignore
        this.state.datasets = result.marketplace_field_in_table;
        this.state.pendingSearch = false;
        this.forceUpdate();
    }
    @autobind
    render () { 
       // mock data  
       let datasetList = [
            {
                "id": "5fe63ef68edf4f969cc9db158c299b18",
                "name": "cherre_nyc_lot",
                "description": "Cherre NY Lot",
                "num_of_records": 10000,
                "price_low": "300",
                "price_high": "400",
                "num_verifiers": 3
            },
            {
                "id": "5fe63ef68edf4f969cc9db158c309b18",
                "name": "cherre_nyc_building",
                "description": "Cherre NYC Building",
                "num_of_records": 1000,
                "price_low": "50",
                "price_high": "75",
                "num_of_verifiers": 2
            },
            {
                "id": "5fe63ef68edf4f969cc9db158c309b17",
                "name": "cherre_acris_simple",
                "description": "Cherre ACRIS Simple data",
                "num_of_records": 14046,
                "price_low": "600",
                "price_high": "650",
                "num_of_verifiers": 5
            },
        ];

        let columns = [
            {key:"id", label:"Dataset ID", cell:"id"},
            {key:"name", label:"Dataset Name", cell:"name"},
            {key:"description", label:"Description", cell:"description"},
            {key:"num_of_records", label:"# of Records", cell:"num_of_records"},
            {key:"price_low", label:"Quote (L)", cell:"price_low"},
            {key:"price_high", label:"Quote (H)", cell:"price_high"},
            {key:"num_of_verifiers", label:"Available Verifiers", cell:"num_of_verifiers"},
        ]
        const { authenticated } = this.props.auth;
        if (authenticated) {
            if ( this.state.fieldList.length < 2) {
                this.getDataFieldList();
            }
        
            return (

                // @ts-ignore  
                <div>
                    <div>
                        <App auth={this.props.auth} {...this.props} />
                    </div>
                    <JsonTable className="table" 
                               rows={datasetList}
                               columns={columns} />
                </div>
            );
            } else { 
                // @ts-ignore
                return <Redirect to = "/home" />;
            }
    }
}
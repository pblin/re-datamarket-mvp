import * as React from 'react';
import { Component } from 'react';
import CreateCustomer from '../CreateCustomer/CreateCustomer';
import Profile from '../Profile/Profile';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import autobind from 'autobind-decorator';
import { Redirect } from 'auth0-js';
import { APIKEY, GRAPHQL } from '../ConfigEnv';
import { GraphQLClient } from 'graphql-request';
// import Divider from '@material-ui/core/Divider';
import DatasetList from './DatasetList';
// import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import ReactDOM from 'react-dom';
import $ from 'jquery';

export interface DashboardProps {
  auth: Auth0Authentication;
}

const customStyles = {
    // @ts-ignore
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    // @ts-ignorets-ignore
    control: styles => ({ ...styles, left: 100, width: '80%', backgroundColor: 'white' })
  };
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
    // @ts-ignore
    // handleChange(evt) {
    //     this.setState({multiValue: [...evt.target.SelectedOtions].map(o => o.value)}); 
    //   }

    @autobind
    async findUser () { 
        
        // dotenv.config({ path: '.env' });
        // let endpoint = process.env.REACT_APP_GRAPHQL;
       
        // console.log(endpoint);
        // let apiKey = process.env.REACT_APP_APIKEY;

        const query =  `
        query customer ($email: String ) {
            marketplace_customer (where:{primary_email:{ _eq : $email }})
            {
                id
                primary_email
                secondary_email
                first_name
                last_name
                roles
                is_org_admin
            }
        }
        `;
        // @ts-ignore
        const client = new GraphQLClient (GRAPHQL, {
            headers: {
            'X-Hasura-Access-Key': APIKEY,
            },
        });

        let userEmail = localStorage.getItem('email');
        const variables = {
            fields: userEmail
        };
        // @ts-ignore
      
        localStorage.setItem('pendingProfileQuery', 'y');
        let result = await client.request (query, variables);
        
        // @ts-ignore
        localStorage.setItem ('profile', JSON.stringify(result.marketplace_customer[0]));
        localStorage.setItem('pendingProfileQuery', 'n');
        this.forceUpdate();
    } 

    componentDidMount() {
        this.getDataFieldList()
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
        const variables  = {
            fields: $('input[name="fields-select"]' ).val()
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
        const { authenticated } = this.props.auth;
        if (authenticated) {
                let profileObj = null;

                let profile = localStorage.getItem('profile');
                let isFindUserPending = localStorage.getItem('pendingProfileQuery');
                if ( (profile == null ) && (isFindUserPending === 'n' || isFindUserPending == null)) {
                        this.findUser();
                }
                
                if (profile !== 'undefined' && profile != null ) {
                    profileObj = JSON.parse(profile);
                }
                if (isFindUserPending === 'y' ) { 
                    return ( 
                        <div>
                            <h3> One Moment ... </h3>
                        </div>
                    );
                } else { 
                    if ( profile === 'undefined' || profileObj == null ) {
                        return (
                            <div>
                                <CreateCustomer />
                            </div>
                        );
                        } else {
                            if ( this.state.fieldList.length < 2) {
                               this.getDataFieldList();
                            }
                            return (
                                // @ts-ignore  
                                <div>
                                    <Grid container spacing={24}>
                                        <Grid item xs={10}>
                                            <Profile userData={profileObj}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs={8} >
                                            <AsyncSelect
                                                ref="fields"
                                                name="fields-select"
                                                isMulti
                                                cacheOptions 
                                                defaultOptions
                                                loadOptions={this.promiseOptions} 
                                                styles={customStyles}
                                                onInputChange={this.handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant="contained" color="primary"
                                             disabled={this.state.pendingSearch}
                                             onClick={() => { this.findDataSets(); }}> 
                                                Search 
                                            </Button>
                                        </Grid>
                                        </Grid>   
                                        <Grid container spacing={24}>
                                            <Grid item>
                                                <DatasetList datasetNames={this.state.datasets} />
                                            </Grid>
                                        </Grid>
                                </div>
                            );
                    }
                }
            } else { 
                // @ts-ignore
                return <Redirect to = "/home" />;
            }
    }
}
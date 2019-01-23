import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { GraphQLClient } from 'graphql-request';
import autobind from 'autobind-decorator';
import {} from 'googlemaps';
import { Auth0Authentication } from '..//auth/Auth0Authentication';
import Grid from '@material-ui/core/Grid';
import { App, DatasetList} from '../components';
import { APIKEY, GRAPHQL } from '../components/ConfigEnv';

export interface MapProps {
  auth: Auth0Authentication;
}

class DataMap extends Component<MapProps> {
    state = {
        datasets: [ {table_name: ''} ],
        // newValue: '',
        pendingSearch: false
    };
    @autobind
    async getDataSets() {
        const query =  `
        query {
            marketplace_field_in_table (distinct_on: [table_name])
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
    
        let result = '';
        this.state.pendingSearch = true;
        result = await client.request (query);
        // @ts-ignore
        this.state.datasets = result.marketplace_field_in_table;
        this.state.pendingSearch = false;
        this.forceUpdate();
    }
   render() {
    
    const { authenticated } = this.props.auth;
    const ReblocGoogleMap = withGoogleMap( props => (
        <GoogleMap
            defaultCenter = { { lat: 40.730610, lng: -73.935242} }
            defaultZoom = { 13 }
        >
        </GoogleMap>
    ));

    if ( !this.state.pendingSearch && this.state.datasets[0].table_name === '' ) {
        this.getDataSets();
        }   
   
    return(
        <div>
            <App auth={this.props.auth} {...this.props} />
                <ReblocGoogleMap
                    containerElement={ <div style={{height: `500px`, width: '800px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />)
            {authenticated && 
                <Grid container spacing ={8}> 
                     <DatasetList datasetNames={this.state.datasets} />
                </Grid>
            }
        </div>
    );
    }
}

export default DataMap;
import * as React from 'react';
import { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import autobind from 'autobind-decorator';
import { Redirect } from 'auth0-js';
// import { APIKEY, GRAPHQL } from '../ConfigEnv';
// import { GraphQLClient } from 'graphql-request';
// import './Dashboard.css';
import App from '../App/App';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";

export interface DashboardProps {
  auth: Auth0Authentication;
}

class DashboardPage extends Component<DashboardProps> {
    state = {
        pendingSearch: false,
        selectedSet: null,
        visible: false,
        sortKey: null,
        sortOrder: null,
        sortField: null,
        layout: 'list',
        datasets: [{}]
    };

    @autobind
    componentDidMount() {
        this.state.datasets = [
            {
                "id": "5fe63ef68edf4f969cc9db158c299b18",
                "name": "cherre_nyc_lot",
                "description": "Cherre NY Lot",
                "delivery_method": "API",
                "num_of_records": 10000,
                "state_province": "NY",
                "country": "USA",
                "price_low": "300",
                "price_high": "400",
                "num_verifiers": 3,
                "date_created": "Mon Jan 28 22:50:05 2019",
                "date_modified": "Mon Jan 28 22:50:05 2019"
            },
            {
                "id": "5fe63ef68edf4f969cc9db158c309b18",
                "name": "cherre_nyc_building",
                "description": "Cherre NYC Building",
                "delivery_method": "API",
                "state_province": "NY",
                "country": "USA",
                "num_of_records": 1000,
                "price_low": "50",
                "price_high": "75",
                "num_of_verifiers": 2,
                "date_created": "Mon Jan 2 10:50:05 2019",
                "date_modified": "Mon Jan 2 10:50:05 2019"
            },
            {
                "id": "5fe63ef68edf4f969cc9db158c309b17",
                "name": "cherre_acris_simple",
                "description": "Cherre ACRIS Simple data",
                "delivery_method": "API",
                "state_province": "NY",
                "country": "USA",
                "num_of_records": 14046,
                "price_low": "600",
                "price_high": "650",
                "num_of_verifiers": 5,
                "date_created": "Mon Jan 10 21:50:05 2019",
                "date_modified": "Mon Jan 10 21:50:05 2019"
            },
        ];
    }
    @autobind
    renderListItem(ds) {
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-col-12 p-md-8 car-details">
                    <div className="p-grid">
                        <div className="p-col-2 p-sm-6">ID:</div>
                        <div className="p-col-10 p-sm-6">{ds.id}</div>

                        <div className="p-col-2 p-sm-6">Name:</div>
                        <div className="p-col-10 p-sm-6">{ds.name}</div>

                        <div className="p-col-2 p-sm-6">Description:</div>
                        <div className="p-col-10 p-sm-6">{ds.description}</div>

                        <div className="p-col-2 p-sm-6">No of Records:</div>
                        <div className="p-col-10 p-sm-6">{ds.num_of_records}</div>

                        <div className="p-col-2 p-sm-6">Region:</div>
                        <div className="p-col-10 p-sm-6">{ds.state_province}</div>

                        <div className="p-col-2 p-sm-6">Country</div>
                        <div className="p-col-10 p-sm-6">{ds.country}</div>
                    </div>
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedSet: ds, visible: true })}></Button>
                </div>
            </div>
        );
    }

    @autobind
    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1, 
                sortField: value.substring(1, value.length), 
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1, 
                sortField: value, 
                sortKey: value
            });
        }
    }

    @autobind
    renderGridItem(ds) {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={ds.id} style={{ textAlign: 'center' }}>
                    <div className="ddataset-name">{ds.name}</div>
                    <div className="ddataset-detail">{ds.description}</div>
                    <div className="ddataset-records">{ds.num_of_records}</div>
                    <div className="ddataset-region">{ds.state_province}</div>
                    <div className="ddataset-country">{ds.country}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedSet: ds, visible: true })}></Button>
                </Panel>
            </div>
        );
    }
    @autobind
    itemTemplate(ds, layout) {
        if (!ds) {
            return;
        }
        if (layout === 'grid')
            return this.renderGridItem(ds);
        else 
            return this.renderListItem(ds);
    }   

    @autobind
    renderDatasetDialogContent() {

        if (this.state.selectedSet) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>

                    <div className="p-col-4">ID: </div>
                    <div className="p-col-8">{this.state.selectedSet.id}</div>

                    <div className="p-col-4">Name: </div>
                    <div className="p-col-8">{this.state.selectedSet.name}</div>
                        
                    <div className="p-col-4">Delivery Method: </div>
                    <div className="p-col-8">{this.state.selectedSet.delivery_method}</div>
                    
                    <div className="p-col-4">Number of Records: </div>
                    <div className="p-col-8">{this.state.selectedSet.num_of_records}</div>

                     <div className="p-col-4">Number of Verifiers: </div>
                    <div className="p-col-8">{this.state.selectedSet.num_of_verifiers}</div>

                    <div className="p-col-4">Region: </div>
                    <div className="p-col-8">{this.state.selectedSet.state_province}</div>

                    <div className="p-col-4">Price Range: </div>
                    <div className="p-col-8">{this.state.selectedSet.price_low} - {this.state.selectedSet.price_high}</div>

                    <div className="p-col-4">Date Created: </div>
                    <div className="p-col-8">{this.state.selectedSet.date_created}</div>
                    
                    <div className="p-col-4">Last Modified Date: </div>
                    <div className="p-col-8">{this.state.selectedSet.date_modified}</div>

                    <div className="p-col-4">Detail Schema: </div>
                    <div className="p-col-8">This Link</div>   
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!date_created'},
            {label: 'Oldest First', value: 'date_created'},
            {label: 'name', value: 'name'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );
    }

    @autobind
    setToHid ()
    {
        this.setState({visible: false});
    }

    @autobind
    render () { 
        const header = this.renderHeader();
        const { authenticated } = this.props.auth;
        console.log( authenticated )
        if (authenticated) {
            return (
                <div>
                    <div>
                        <App auth={this.props.auth} {...this.props} />
                    </div>
                    <div className="content-section introduction">
                        <div className="feature-intro">
                            <h1>Dataset View</h1>
                            <p>DataView displays data in grid or list layout with pagination, sorting and filtering features.</p>
                        </div>
                    </div>

                    <div className="content-section implementation">
                        <DataView value={this.state.datasets} layout={this.state.layout} header={header} 
                                itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={20} 
                                sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                        <Dialog header="Dataset Details" visible={this.state.visible} modal={true} onHide={this.setToHid}>
                            {this.renderDatasetDialogContent()}
                        </Dialog>
                    </div>

                    </div>
            );
            } else { 
                // @ts-ignore
                return <Redirect to = "/home" />;
            }
    }
}

export default DashboardPage;
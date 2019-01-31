import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { GraphQLClient } from 'graphql-request';
import { Auth0Authentication } from '..//auth/Auth0Authentication';
import Grid from '@material-ui/core/Grid';
import { App, DatasetList} from '../components';
import { APIKEY, GRAPHQL } from '../components/ConfigEnv';
// import {Link} from 'react-router-dom';
import {GMap} from 'primereact/gmap';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Growl} from 'primereact/growl';

export interface MapProps {
  auth: Auth0Authentication;
}
type dataField = {
    table_name: string
}
interface MapState {
    datasets: dataField[],
    dialogVisible: boolean,
    markerTitle: string,
    draggableMarker: any,
    overlays: any,
    selectedPosition: any
}
class DataMap extends Component<MapProps, MapState> {
    
    constructor (props) {
        super (props);
        this.state = {
            datasets: [{table_name:''}],
            dialogVisible: false,
            markerTitle: '',
            draggableMarker: null,
            overlays: null,
            selectedPosition: null,
        };
        this.onMapClick = this.onMapClick.bind(this);
        // this.onOverlayClick = this.onOverlayClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.onHide = this.onHide.bind(this);
        this.addMarker = this.addMarker.bind(this);
    }

    infoWindow;
    growl; 
    onMapClick(event) {
        this.setState({
            dialogVisible: true,
            selectedPosition: event.latLng
        });
    }

    onOverlayClick(event) {
        let isMarker = event.overlay.getTitle !== undefined;
        
        if(isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow = this.infoWindow || new google.maps.InfoWindow();
            this.infoWindow.setContent('<div>' + title + '</div>');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
            
            this.growl.show({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            this.growl.show({severity:'info', summary:'Shape Selected', detail: ''});
        }   
    }
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
    
        let result = await client.request (query);
        // @ts-ignore
        this.state.datasets = result.marketplace_field_in_table;
        this.forceUpdate();
    }
    componentDidMount () {
        this.getDataSets();
    }
    handleDragEnd(event) {
        // this.state.growl.show({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }
    
    addMarker() {
        let newMarker = new google.maps.Marker({
                            position: {
                                lat: this.state.selectedPosition.lat(), 
                                lng: this.state.selectedPosition.lng()
                            }, 
                            title: this.state.markerTitle, 
                            draggable: this.state.draggableMarker
                        });
                        
        this.setState({
            overlays: [...this.state.overlays, newMarker],
            dialogVisible: false,
            draggableMarker: false,
            markerTitle: ''
        });
    }

    onMapReady(event) {
        this.setState({
            overlays: [
                new google.maps.Marker({position: {lat: 40.751575, lng: -73.986874}, title:"HQ"}),
                new google.maps.Marker({position: {lat: 40.705598, lng: -74.016154}, title:"1West"}),
                new google.maps.Marker({position: {lat: 40.660901, lng: -73.990634}, title:"666"}),
                new google.maps.Polygon({paths: [
                    {lat: 40.751575, lng: -73.986874},{lat: 40.705598, lng: -74.016154},{lat: 40.660901, lng: -73.990634},{lat: 40.749226, lng: -73.987587}
                ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({center: {lat: 40.761516, lng: -73.971206}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
                // new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
            ]
        })
    }

    onHide() {
        this.setState({dialogVisible: false});
    }

   render() {
    const options = {
        center: {lat: 40.730610, lng: -73.935242},
        zoom: 12
    };

    const { authenticated } = this.props.auth;
    const footer = <div>
            <Button label="Yes" icon="pi pi-check" onClick={this.addMarker} />
            <Button label="No" icon="pi pi-times" onClick={this.onHide} />
        </div>;

    return (
        <div>
            <App auth={this.props.auth} {...this.props} />
                { authenticated && 
                    <div className="content-section implementation">
                        <Growl ref={(el) => { this.growl = el; }}></Growl>
    
                        <GMap overlays={this.state.overlays} options={options} style={{width: '100%', minHeight: '320px'}} onMapReady={this.onMapReady}
                            onMapClick={this.onMapClick} onOverlayClick={this.onOverlayClick} onOverlayDragEnd={this.handleDragEnd} />
                            
                        <Dialog header="New Location" visible={this.state.dialogVisible}  modal={true} footer={footer} onHide={this.onHide}>
                            <div className="p-grid p-fluid">
                                <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="title">Label</label></div>
                                <div className="p-col-10"><InputText type="text" id="title" value={this.state.markerTitle} onChange={(e) => this.setState({markerTitle: e.currentTarget.value})} /></div>
                                
                                <div className="p-col-2" style={{paddingTop:'.75em'}}>Lat</div>
                                <div className="p-col-10"><InputText readOnly value={this.state.selectedPosition ? this.state.selectedPosition.lat() : ''} /></div>
                                
                                <div className="p-col-2" style={{paddingTop:'.75em'}}>Lng</div>
                                <div className="p-col-10"><InputText readOnly value={this.state.selectedPosition ? this.state.selectedPosition.lng() : ''} /></div>
                                
                                <div className="p-col-2" style={{paddingTop:'.75em'}}><label htmlFor="drg">Drag</label></div>
                                <div className="p-col-10"><Checkbox checked={this.state.draggableMarker} onChange={(event) => this.setState({draggableMarker: event.checked})}/></div>
                            </div>
                        </Dialog>
                    </div>
                }
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

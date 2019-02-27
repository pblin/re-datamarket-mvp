import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.css';
import {changeDialogState, MARKETPLACE_ACTIONS, updateSchemaFilter} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {profileSelector} from "../../store/profile/profileSelector";
import SchemaList from "./SchemaList";
import {datasetDialogSelector, marketplaceSelector} from "../../store/marketplace/marketplaceSelectors";
import {Grid, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserSchemaList from "./UserSchemaList";
//import DatasetDialog from "./DatasetDialog";
import DatasetManager from '../DatasetManager/DatasetManager'

interface ComponentProps {
  schemaFilter: string;
  updateSchemaFilter: any;
  profile: any;
  getProfile: any;
  getUserSchemas: any;
  getAllSchemas: any;
  schemas: any[];
  userSchemas: any[];
  datasetDialog: any
  changeDialogState: any;
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.getUserSchemas = this.getUserSchemas.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe')
  ];

  getUserSchemas(id: string) {
    this.props.getUserSchemas(id);
  }

  componentDidMount() {
    if(!this.props.profile) {
      //Display profile warning
    } else {
      //this.getUserSchemas(this.props.profile.id);
    }
    this.props.getAllSchemas();
    this.props.getUserSchemas();
  }

  handleSchemaChange(val) {
    this.props.updateSchemaFilter(val);
  }

  openDialog() {
    this.props.changeDialogState(true);
  }

  closeDialog() {
    this.props.changeDialogState(false);
  }

  render() {
    return (
      <div>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
          toolbarOptions={this.toolbarOptions}
        />
        <Grid container={true} justify={'center'}>
          <div className={"app-section-wrapper"}>
            <Grid container={true} justify={"flex-end"}>
              <Button variant="contained" color="secondary" className="add-schema" onClick={this.openDialog}>
                Add
                <AddIcon/>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              {this.props.schemaFilter == 'all' &&
                <SchemaList schemas={this.props.schemas}/>
              }
              {this.props.schemaFilter == 'ownedByMe' &&
                <UserSchemaList schemas={this.props.userSchemas}/>
              }
            </Grid>
            <DatasetManager/>
          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log(state);
  return {
    schemaFilter: marketplaceSelector(state).schemaFilter,
    profile: profileSelector(state),
    schemas: marketplaceSelector(state).schemas,
    userSchemas: marketplaceSelector(state).userSchemas,
    datasetDialog: datasetDialogSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateSchemaFilter: (filter: string) => dispatch(updateSchemaFilter(filter)),
    getUserSchemas: (id) => dispatch({type: MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, id}),
    getAllSchemas: () => dispatch({type: MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS}),
    changeDialogState: (isOpen) => dispatch(changeDialogState(isOpen))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

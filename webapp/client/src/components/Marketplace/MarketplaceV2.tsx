import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.css';
import {
  changeConfirmDialogState,
  changeDialogState,
  MARKETPLACE_ACTIONS,
  updateSchemaFilter
} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import SchemaList from "./SchemaList";
import {
  confirmDeleteDialogSelector,
  datasetDialogSelector,
  marketplaceSelector
} from "../../store/marketplace/marketplaceSelectors";
import {Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserDatasetList from "./UserDatasetList";
import DatasetManager from '../DatasetManager/DatasetManager'
import JumboPaper from "../Common/jumboPaper";

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
  isProfileSet: boolean;
  history: any;
  confirmDeleteDialog: any;
  changeConfirmDeleteDialog: any;
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.getUserSchemas = this.getUserSchemas.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe')
  ];

  getUserSchemas(id: string) {
    this.props.getUserSchemas(id);
  }

  componentDidMount() {
    this.props.getAllSchemas();
    this.props.getUserSchemas();
  }

  handleSchemaChange(val) {
    this.props.updateSchemaFilter(val);
  }

  openDialog() {
    this.props.changeDialogState(true, 'add', undefined);
  }

  handleOnEdit(dataset) {
    console.log('Handling on edit');
    console.log(dataset);
    this.props.changeDialogState(true, 'edit', dataset);
  }

  handleOnDelete(dataset) {
    console.log('Handling on delete');
    console.log(dataset);
    this.props.changeConfirmDeleteDialog(true, dataset);
  }

  onConfirmationClose() {
    this.props.changeConfirmDeleteDialog(false, {name: ''});
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
              {this.props.isProfileSet &&
                <Button variant="contained" color="secondary" className="add-schema" onClick={this.openDialog}>
                  Add
                  <AddIcon/>
                </Button>
              }
            </Grid>
            <Grid item xs={12} sm={12}>
              {this.props.schemaFilter == 'all' &&
                <SchemaList
                  schemas={this.props.schemas}
                  history={this.props.history}
                />
              }
              {(this.props.schemaFilter == 'ownedByMe' && this.props.isProfileSet) &&
                <UserDatasetList schemas={this.props.userSchemas} onEditClick={this.handleOnEdit} onDeleteClick={this.handleOnDelete}/>
              }
              {(this.props.schemaFilter == 'ownedByMe' && !this.props.isProfileSet) &&
                <JumboPaper
                  title={"Welcome,"}
                  content={"Creating new schemas requires a profile. Please create a profile before continuing"}
                  buttonText={"Create Profile"}
                  handleClick={() => {this.props.history.push('/profile')}}
                />
              }
            </Grid>
            <DatasetManager/>
            <Dialog open={this.props.confirmDeleteDialog.open} maxWidth={"sm"} fullWidth={true}>
              <DialogTitle>
                {this.props.confirmDeleteDialog.dataset.name}
              </DialogTitle>
              <DialogContent>
                Do you want to delete?
              </DialogContent>
              <DialogActions>
                <Button>Ok</Button>
                <Button onClick={this.onConfirmationClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    schemaFilter: marketplaceSelector(state).schemaFilter,
    profile: profileSelector(state),
    isProfileSet: isProfileSet(state),
    schemas: marketplaceSelector(state).schemas,
    userSchemas: marketplaceSelector(state).userSchemas,
    datasetDialog: datasetDialogSelector(state),
    confirmDeleteDialog: confirmDeleteDialogSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateSchemaFilter: (filter: string) => dispatch(updateSchemaFilter(filter)),
    getUserSchemas: (id) => dispatch({type: MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, id}),
    getAllSchemas: () => dispatch({type: MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS}),
    changeDialogState: (isOpen, mode, id) => dispatch(changeDialogState(isOpen, mode, id)),
    changeConfirmDeleteDialog: (isOpen, dataset) => dispatch(changeConfirmDialogState(isOpen, dataset))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

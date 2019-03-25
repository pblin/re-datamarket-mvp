import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.scss';
import {
  changeConfirmDialogState,
  changeDialogState, changeSearch,
  MARKETPLACE_ACTIONS,
  updateSchemaFilter
} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import SchemaList from "./SchemaList";
import {
  confirmDeleteDialogSelector,
  datasetDialogSelector, MarketplaceSelector,
  marketplaceSelector
} from "../../store/marketplace/marketplaceSelectors";
import {Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserDatasetList from "./UserDatasetList";
import DatasetManager from '../DatasetManager/DatasetManager'
import JumboPaper from "../Common/jumboPaper";
import FilterMenu from "../Common/Filter/FilterMenu";

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
  deleteDataset: any;
  marketplace: any;
  changeSearch: any;
  searchDatasets: any;
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.getUserSchemas = this.getUserSchemas.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
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

  handleOnDelete(dataset) {
    this.props.changeConfirmDeleteDialog(true, dataset);
  }

  //Confirm Dialog TODO: Consider moving dialog to seperate component
  onConfirmationClose() {
    this.props.changeConfirmDeleteDialog(false, {name: ''});
  }

  confirmDelete() {
    this.props.deleteDataset(this.props.confirmDeleteDialog.dataset.id);
    this.props.changeConfirmDeleteDialog(false, {name: ''});
  }

  //Filter menu
  onSearchChange(e) {
    this.props.changeSearch(e.target.value);
  }

  onSearch(search: string) {
    if(search != '') {
      this.props.searchDatasets(search);
    } else {
      this.props.getAllSchemas();
    }
  }

  renderAddButton() {
    if(!this.props.isProfileSet) {
      return null;
    }
    if(this.props.schemaFilter == 'all' || (this.props.schemaFilter == 'ownedByMe') && this.props.userSchemas.length) {
      return <Button variant="contained" color="secondary" className="add-schema" onClick={this.openDialog}>
        Add
        <AddIcon/>
      </Button>
    }
    return null;
  }

  render() {
    return (
      <div className={"marketplace"}>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
          toolbarOptions={this.toolbarOptions}
          hasPublish={false}
        />
        <Grid container={true} justify={'center'}>
          <div className={"app-section-wrapper"}>
            <Grid container={true} justify={"flex-start"}>
              {this.props.schemaFilter == 'all' &&
                <FilterMenu
                  placeholder={"Search Marketplace"}
                  searchVal={this.props.marketplace.search}
                  onSearch={this.onSearch}
                  onSearchChange={this.onSearchChange}/>
              }
              {
                this.renderAddButton()
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
                <UserDatasetList
                  schemas={this.props.userSchemas}
                  onDeleteClick={this.handleOnDelete}
                  onAddClicked={this.openDialog}
                  history={this.props.history}
                />
              }
              {(this.props.schemaFilter == 'ownedByMe' && !this.props.isProfileSet) &&
                <JumboPaper
                  title={"Welcome,"}
                  content={"Creating new datasets requires a profile. Please create a profile before continuing"}
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
                <Button onClick={this.confirmDelete}>Ok</Button>
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
    confirmDeleteDialog: confirmDeleteDialogSelector(state),
    marketplace: MarketplaceSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateSchemaFilter: (filter: string) => dispatch(updateSchemaFilter(filter)),
    getUserSchemas: (id) => dispatch({type: MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, id}),
    getAllSchemas: () => dispatch({type: MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS}),
    changeDialogState: (isOpen, mode, id) => dispatch(changeDialogState(isOpen, mode, id)),
    changeConfirmDeleteDialog: (isOpen, dataset) => dispatch(changeConfirmDialogState(isOpen, dataset)),
    deleteDataset: (datasetId: string) => dispatch({type: MARKETPLACE_ACTIONS.DELETE_DATASET, datasetId }),
    changeSearch: (search: string) => dispatch(changeSearch(search)),
    searchDatasets: (terms: string) => dispatch({type: MARKETPLACE_ACTIONS.SEARCH_DATASETS, terms})
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.scss';
import {
  changeConfirmDialogState,
  changeDialogState,
  changeSearch,
  getUserDatasets,
  updateSchemaFilter,
  searchDatasets,
  deleteDataset,
  getAllDatasets
} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import SchemaList from "./SchemaList";
import {
  confirmDeleteDialogSelector,
  datasetDialogSelector,
  getPurchasableDatasets,
  marketplaceSelector
} from "../../store/marketplace/marketplaceSelectors";
import {Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserDatasetList from "./UserDatasetList";
import DatasetManager from '../DatasetManager/DatasetManager'
import JumboPaper from "../Common/jumboPaper";
import FilterMenu from "../Common/Filter/FilterMenu";
import {bindActionCreators} from "redux";

interface ComponentProps {
  schemaFilter: string;
  profile: any;
  getProfile: any;
  datasets: any[];
  userDatasets: any[];
  datasetDialog: any
  isProfileSet: boolean;
  history: any;
  confirmDeleteDialog: any;
  marketplace: any;
  actions: any;
  purchasableDatasets: any[];
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Purchasable', 'purchasable'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe')
  ];

  componentDidMount() {
    this.props.actions.getAllDatasets();
    this.props.actions.getUserDatasets();
  }

  handleSchemaChange(val) {
    this.props.actions.updateSchemaFilter(val);
  }

  openDialog() {
    this.props.actions.changeDialogState(true, 'add', undefined);
  }

  handleOnDelete(dataset) {
    this.props.actions.changeConfirmDialogState(true, dataset);
  }

  //Confirm Dialog TODO: Consider moving dialog to seperate component
  onConfirmationClose() {
    this.props.actions.changeConfirmDialogState(false, {name: ''});
  }

  confirmDelete() {
    this.props.actions.deleteDataset(this.props.confirmDeleteDialog.dataset.id);
    this.props.actions.changeConfirmDialogState(false, {name: ''});
  }

  //Filter menu
  onSearchChange(e) {
    this.props.actions.changeSearch(e.target.value);
  }

  onSearch(search: string) {
    if(search != '') {
      this.props.actions.searchDatasets(search);
    } else {
      this.props.actions.getAllDatasets();
    }
  }

  renderAddButton() {
    if(!this.props.isProfileSet) {
      return null;
    }
    if(this.props.schemaFilter == 'purchasable' || (this.props.schemaFilter == 'ownedByMe') && this.props.userDatasets.length) {
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
              { (this.props.schemaFilter == 'all' || this.props.schemaFilter == 'purchasable') &&
                <FilterMenu
                  placeholder={"Search Marketplace"}
                  searchVal={this.props.marketplace.search}
                  onSearch={this.onSearch}
                  onSearchChange={this.onSearchChange}/>
              }
              {this.renderAddButton()}
            </Grid>
            <Grid item xs={12} sm={12}>
              {
                this.props.schemaFilter=='purchasable' &&
                <SchemaList
                  schemas={this.props.purchasableDatasets}
                  history={this.props.history}
                />
              }
              {(this.props.schemaFilter == 'ownedByMe' && this.props.isProfileSet) &&
                <UserDatasetList
                  schemas={this.props.userDatasets}
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
    datasets: marketplaceSelector(state).datasets,
    userDatasets: marketplaceSelector(state).userDatasets,
    datasetDialog: datasetDialogSelector(state),
    confirmDeleteDialog: confirmDeleteDialogSelector(state),
    marketplace: marketplaceSelector(state),
    purchasableDatasets: getPurchasableDatasets(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({
      updateSchemaFilter,
      changeDialogState,
      changeSearch,
      changeConfirmDialogState,
      getUserDatasets,
      searchDatasets,
      deleteDataset,
      getAllDatasets
    }, dispatch)
  };
}

export default withRouter(
  //@ts-ignore
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

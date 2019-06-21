import * as React from "react";
import {withRouter} from "react-router";
import './marketplace.scss';
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import SchemaList from "./SchemaList";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Drawer
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterIcon from "@material-ui/icons/FilterList";
import UserDatasetList from "./UserDatasetList";
import DatasetManagerContainer from '../DatasetManager/DatasetManagerContainer'
import JumboPaper from "../Common/jumboPaper";
import FilterMenu from "../Common/Filter/FilterMenu";
import DatasetList from "./DatasetList";
import {isEmpty} from "../../utils/ObjectHelper";

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
  purchasedDatasets: any;
}

interface ComponentState {
  purchasedDatasetsRetrieved: boolean;
  filterDrawerOpen: boolean;
  search: string;
  filters: any;
}

class MarketplaceV2 extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      purchasedDatasetsRetrieved: false,
      filterDrawerOpen: false,
      search: '',
      filters: {}
    }
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Purchasable', 'purchasable'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe'),
    new ToolbarOption('PURCHASED', 'purchased')
  ];

  componentDidMount() {
    this.props.actions.getAllDatasets();
    this.props.actions.getUserDatasets();
  }

  handleSchemaChange(val) {
    if(val == 'purchased') {
      if(!this.state.purchasedDatasetsRetrieved) {
        this.props.actions.getOrders();
      }
    }
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

  //Filter menu TODO: Possibly Remove This
  onSearchChange(e) {
    this.props.actions.changeSearch(e.target.value);
  }

  renderAddButton() {
    if(!this.props.isProfileSet) {
      return null;
    }
    if(this.props.schemaFilter == 'purchasable' ||
      (this.props.schemaFilter == 'ownedByMe') && this.props.userDatasets.length) {
      return <Button variant="contained" color="secondary" className="add-schema" onClick={this.openDialog}>
        Add
        <AddIcon/>
      </Button>
    }
    return null;
  }

  renderFilterButton() {
    if(this.props.schemaFilter == 'purchasable') {
      return (<Button
        variant="contained"
        onClick={() => this.setState({filterDrawerOpen: true})}
        className="add-schema">
        Filter <FilterIcon/>
      </Button>);
    }

    return null;
  }

  onFilter = (filters) => {
    this.setState({filters});
    if(this.state.search != '' || !isEmpty(filters)) {
      this.props.actions.searchDatasets(filters);
    } else {
      this.props.actions.getAllDatasets();
    }
  };

  //TODO: NO Filters Match
  //TODO: Filter BreadCrumb
  render() {
    return (
      <div className={"marketplace"}>
        <Drawer
          onClose={()=>{}}
          open={this.state.filterDrawerOpen}
          anchor={'left'}
          variant={"persistent"}
          className={"filter-drawer"}
        >
          <FilterMenu onApply={this.onFilter}
                      onClose={() => this.setState({filterDrawerOpen: false})}/>
        </Drawer>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
          toolbarOptions={this.toolbarOptions}
          hasPublish={false}
        />
        <Grid container={true} justify={'center'}>
          <div className={"app-section-wrapper"}>
            <Grid container={true} justify={"flex-start"}>
              {this.renderFilterButton()}
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
              {this.props.schemaFilter == 'purchased' &&
                <DatasetList datasets={this.props.purchasedDatasets} handleClick={
                  (dataset) => {this.props.history.push(`/dataset/${dataset.dataset_id}`)}
                }/>
              }
            </Grid>
            <DatasetManagerContainer/>
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

export default withRouter(
  MarketplaceV2
);

import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {Drawer, Grid, Typography} from "@material-ui/core";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import NotificationLabel from "../Common/NotificationLabel";
import "./dataExplorer.scss";
import SchemaFieldTable from "./SchemaFieldTable/SchemaFieldTable";
import FilterMenu from '../Common/Filter/FIlterMenuV2';

interface ComponentProps {
  actions: any;
  fields: any[];
  history: any;
  toolbarFilter: string;
  ownedFields: any[];
}

interface ComponentState {
  filterDrawerOpen: boolean;
}

class DataExplorer extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterDrawerOpen: false
    }
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe'),
  ];

  onFilter = (terms) => {
    this.props.actions.schemaSearch(terms);
  };

  changeFilter = (filter) => {
    this.props.actions.changeToolbarFilter(filter);
  };

  render() {
    return (
      <React.Fragment>
        <MarketplaceToolbar
          onSchemaFilterChange={this.changeFilter}
          schemaFilter={this.props.toolbarFilter}
          toolbarOptions={this.toolbarOptions}
          hasPublish={false}
        />
        <Drawer
          onClose={()=>{}}
          open={this.state.filterDrawerOpen}
          anchor={'left'}
          variant={"persistent"}
          className={"filter-drawer"}
        >
          <FilterMenu
            onClose={() => this.setState({filterDrawerOpen: false})}
            onSearchTermChange={this.onFilter}
          />
        </Drawer>
        <Grid container justify={"center"} className={"data-explorer"}>
          <Grid xs={12} sm={12} className={"page-section"}>
            {
              this.props.toolbarFilter == 'all' &&
                <React.Fragment>
                    <SchemaFieldTable
                      schemaFields={this.props.fields}
                      history={this.props.history}
                      onFilter={() => {this.setState({filterDrawerOpen: true})}}
                    />
                </React.Fragment>
            }
            {
              this.props.toolbarFilter == 'ownedByMe' &&
                <React.Fragment>
                  {(this.props.ownedFields.length == 0) &&
                    <NotificationLabel type={"warning"}>
                      <Typography>No results found. Try searching with different filters.</Typography>
                    </NotificationLabel>
                  }
                  {
                    (this.props.ownedFields.length > 0) &&
                    <React.Fragment>
                      <SchemaFieldTable
                        schemaFields={this.props.ownedFields}
                        history={this.props.history}
                        onFilter={() => {}}
                      />
                    </React.Fragment>
                  }
                </React.Fragment>
            }
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

//@ts-ignore
DataExplorer = withSnackbar(DataExplorer);

//@ts-ignore
export default withRouter(DataExplorer);

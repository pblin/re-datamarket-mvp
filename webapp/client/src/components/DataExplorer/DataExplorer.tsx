import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import {Grid, Typography} from "@material-ui/core";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import FilterMenu from "../Common/Filter/FilterMenu";
import NotificationLabel from "../Common/NotificationLabel";
import "./dataExplorer.scss";
import {isEmpty} from "../../utils/ObjectHelper";
import SchemaFieldTable from "./SchemaFieldTable";
import FilterBreadCrumbs from '../Common/Filter/FilterBreadCrumbs';

interface ComponentProps {
  actions: any;
  fields: any[];
  history: any;
  toolbarFilter: string;
  ownedFields: any[];
}

interface ComponentState {
}

class DataExplorer extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe'),
  ];

  onFilter = (filters) => {
    if(!isEmpty(filters)) {
      this.props.actions.schemaSearch(filters);
    }
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
        <Grid container justify={"center"} className={"data-explorer"}>
          <Grid item xs={12} className={"page-section"}>
          </Grid>
          <Grid item xs={12} sm={4} className={"page-section"}>
            <FilterMenu
             onClose={()=>{}}
             onApply={this.onFilter}
             hideClose={true}
             disableTopics={true}
            />
          </Grid>
          <Grid xs={12} sm={7} className={"page-section"}>
            {
              this.props.toolbarFilter == 'all' &&
                <React.Fragment>
                  <FilterBreadCrumbs/>
                  {(this.props.fields.length == 0) &&
                  <NotificationLabel type={"warning"}>
                    <Typography>No results found. Try searching with different filters.</Typography>
                  </NotificationLabel>
                  }
                  {
                    (this.props.fields.length > 0) &&
                    <React.Fragment>
                      <SchemaFieldTable
                        schemaFields={this.props.fields}
                        history={this.props.history}
                      />
                    </React.Fragment>
                  }
                </React.Fragment>
            }
            {
              this.props.toolbarFilter == 'ownedByMe' &&
                <React.Fragment>
                  <FilterBreadCrumbs/>
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

import * as React from "react";
import {connect} from "react-redux";
import {getDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {datasetInfoSelector, isOwner, schemaSelector} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import {
  Grid,
  Button
} from "@material-ui/core";
import "./datasetInfo.scss";
import {ToolbarAction} from "../Marketplace/ToolbarAction";
import BasicInfoCard from "./BasicInfoCard";

interface ComponentProps {
  match: any;
  getDatasetInfo: any;
  dataset: any;
  schema: any;
  isOwner: boolean;
}

class DatasetInfo extends React.Component<ComponentProps> {
  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema')
  ];

  toolbarActions: ToolbarAction[] = [
    new ToolbarAction('Buy Dataset', this.buyDataset),
    new ToolbarAction('Get Sample Data', this.getSampleData)
  ];

  buyDataset() {
    //Add buy dataset code here
  }

  getSampleData() {
    //Add get sample data here
  }

  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
    this.props.getDatasetInfo(this.pageId);
  }

  onSchemaSelect = () => {

  };

  onMenuChange() {

  }

  render() {
    console.log(this.props.dataset);
    return (
      <div className={"dataset-info-view"}>
        {/*TODO: ADD buy button and sample data button here*/}
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onMenuChange}
          schemaFilter={'schema'}
        />
        {this.props.isOwner && (<>
          {this.toolbarActions.map((action) => (
            <Button variant="contained" color="secondary">{action.label}</Button>
          ))}
        </>)}
        <Grid container justify={"center"}>
          <div className={"app-section-wrapper-lg"}>
            <Grid xs={12} container spacing={16}>
              <Grid item xs={12} sm={4}>
                {!this.props.isOwner &&
                  <BasicInfoCard dataset={this.props.dataset}/>
                }
              </Grid>
              <Grid item xs={12} sm={8}>
                <SchemaList schemas={this.props.schema} onSchemaSelect={this.onSchemaSelect}/>
              </Grid>
            </Grid>

          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log('Changing dataset info state');
  console.log(datasetInfoSelector(state));
  return {
    dataset: datasetInfoSelector(state),
    schema: schemaSelector(state),
    isOwner: isOwner(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDatasetInfo: (datasetId: string) => dispatch(getDatasetInfo(datasetId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);


import * as React from "react";
import {connect} from "react-redux";
import {getDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {datasetInfoSelector, schemaSelector} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import {Grid} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import "./datasetInfo.css";

interface ComponentProps {
  match: any;
  getDatasetInfo: any;
  dataset: any;
  schema: any;
}

class DatasetInfo extends React.Component<ComponentProps> {
  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema')
  ];

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
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onMenuChange}
          schemaFilter={'schema'}
        />
        <Grid container justify={"center"}>
          <div className={"app-section-wrapper-lg"}>
            <Grid xs={12} className="info-panel">
              <Grid item xs={12}>
                <p><DescriptionIcon/>{this.props.dataset.name}</p>
                <p><DescriptionIcon/>{this.props.dataset.description}</p>
              </Grid>
            </Grid>
            <SchemaList schemas={this.props.schema} onSchemaSelect={this.onSchemaSelect}/>
          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    dataset: datasetInfoSelector(state),
    schema: schemaSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDatasetInfo: (datasetId: string) => dispatch(getDatasetInfo(datasetId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);


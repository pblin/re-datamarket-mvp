import * as React from "react";
import {connect} from "react-redux";
import {getDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {datasetInfoSelector} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import "./datasetInfo.css";

interface ComponentProps {
  match: any;
  getDatasetInfo: any;
  dataset: any;
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
    return (
      <div className={"dataset-info-view"}>
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onMenuChange}
          schemaFilter={'schema'}
        />
        <SchemaList schemas={this.props.dataset.schema} onSchemaSelect={this.onSchemaSelect}/>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    dataset: datasetInfoSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getDatasetInfo: (datasetId: string) => dispatch(getDatasetInfo(datasetId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);


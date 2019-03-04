import * as React from "react";
import {connect} from "react-redux";
import {getDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {datasetInfoSelector} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";

interface ComponentProps {
  match: any;
  getDatasetInfo: any;
  dataset: any;
}

class DatasetInfo extends React.Component<ComponentProps> {
  pageId: string;
  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
    this.props.getDatasetInfo(this.pageId);
  }

  onSchemaSelect = () => {

  };

  render() {
    return (
      <div>
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


import * as React from "react";
import {connect} from "react-redux";

interface ComponentProps {
  match: any;
}

class DatasetInfo extends React.Component<ComponentProps> {
  pageId: string;
  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
  }

  render() {
    return (
      <div>Dataset Info {this.pageId}</div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);


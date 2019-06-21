import {connect} from "react-redux";
import DataExplorer from "./DataExplorer";
import {bindActionCreators} from "redux";

const mapStateToProps = (state: any) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {},
      dispatch
    )
  }
};


const DataExplorerPage = connect(mapStateToProps, mapDispatchToProps)(DataExplorer);

export default DataExplorerPage;

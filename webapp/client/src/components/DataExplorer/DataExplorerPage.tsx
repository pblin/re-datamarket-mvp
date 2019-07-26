import {connect} from "react-redux";
import DataExplorer from "./DataExplorer";
import {bindActionCreators} from "redux";
import {schemaSearch, changeToolbarFilter} from "../../store/dataExplorer/dataExplorerActions";
import {
  dataExplorerSelector,
  getFilteredFields,
  getOwnedByMeFields
} from "../../store/dataExplorer/dataExplorerSelectors";

const mapStateToProps = (state: any) => {
  const {toolbarFilter} = dataExplorerSelector(state);
  return {
    fields: getFilteredFields(state),
    toolbarFilter,
    ownedFields: getOwnedByMeFields(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        schemaSearch,
        changeToolbarFilter
      },
      dispatch
    )
  }
};

const DataExplorerPage = connect(mapStateToProps, mapDispatchToProps)(DataExplorer);

export default DataExplorerPage;

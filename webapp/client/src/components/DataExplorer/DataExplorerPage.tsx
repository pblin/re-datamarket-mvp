import {connect} from "react-redux";
import DataExplorer from "./DataExplorer";
import {bindActionCreators} from "redux";
import {schemaSearch, changeToolbarFilter} from "../../store/dataExplorer/dataExplorerActions";
import {dataExplorerSelector, getOwnedByMeFields} from "../../store/dataExplorer/dataExplorerSelectors";

const mapStateToProps = (state: any) => {
  const {fields, toolbarFilter} = dataExplorerSelector(state);
  console.log(state);
  return {
    fields,
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

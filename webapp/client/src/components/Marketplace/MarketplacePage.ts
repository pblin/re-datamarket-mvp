import {connect} from "react-redux";
import Marketplace from './MarketplaceV2';
import {bindActionCreators} from "redux";
import {
  confirmDeleteDialogSelector,
  datasetDialogSelector,
  getPurchasableDatasets,
  marketplaceSelector
} from "../../store/marketplace/marketplaceSelectors";
import {getOrders} from "../../store/orders/orderActions";
import {getFilteredOrders} from "../../store/orders/orderSelectors";

import {
  isProfileSet,
  profileSelector
} from "../../store/profile/profileSelector";
import {
  changeConfirmDialogState,
  changeDialogState,
  changeSearch,
  deleteDataset,
  getAllDatasets,
  getUserDatasets,
  searchDatasets,
  updateSchemaFilter
} from "../../store/marketplace/marketplaceActions";

function mapStateToProps(state: any) {
  const purchasedDatasets = getFilteredOrders(state);
  return {
    schemaFilter: marketplaceSelector(state).schemaFilter,
    profile: profileSelector(state),
    isProfileSet: isProfileSet(state),
    datasets: marketplaceSelector(state).datasets,
    userDatasets: marketplaceSelector(state).userDatasets,
    datasetDialog: datasetDialogSelector(state),
    confirmDeleteDialog: confirmDeleteDialogSelector(state),
    marketplace: marketplaceSelector(state),
    purchasableDatasets: getPurchasableDatasets(state),
    purchasedDatasets: purchasedDatasets && purchasedDatasets.bought || []
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({
      updateSchemaFilter,
      changeDialogState,
      changeSearch,
      changeConfirmDialogState,
      getUserDatasets,
      searchDatasets,
      deleteDataset,
      getAllDatasets,
      getOrders
    }, dispatch)
  };
}


const MarketplacePage = connect(mapStateToProps, mapDispatchToProps)(Marketplace);

export default MarketplacePage;

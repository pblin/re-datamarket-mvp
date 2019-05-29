import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";

export const marketplaceSelector = (state) => state.MarketplaceState;
export const datasetSelector = (state) => state.MarketplaceState && state.MarketplaceState.datasets;
export const datasetDialogSelector = (state) => state.MarketplaceState.datasetDialog;
export const confirmDeleteDialogSelector = (state) => state.MarketplaceState.confirmDeleteDialog;

export const getPurchasableDatasets = createSelector(
  datasetSelector,
  profileSelector,
  (datasets, profile) => {
      console.log('Getting purchasable datasets');
      console.log(datasets);
      console.log(profile);
      let filteredDatasets = datasets.filter((dataset) => {
        return dataset.dataset_owner_id != profile.id;
      });

      return filteredDatasets;
   }
);

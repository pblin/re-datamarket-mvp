import {createStore} from "redux";
import MarketplaceState from './marketplaceReducer';
import {datasetDialogSelector, marketplaceSelector} from "./marketplaceSelectors";

describe('Marketplace State', () => {
  let store;
  beforeEach(() => {
    store = createStore(MarketplaceState);
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.schemaFilter).toBe('all');
    expect(initialState.schemas).toEqual([]);
    expect(initialState.userSchemas).toEqual([]);
    expect(initialState.datasetDialog.open).toBe(false);
    expect(initialState.datasetDialog.mode).toBe('add');
    expect(initialState.datasetDialog.dataset).toBeFalsy();
  });

  //Selector Tests
  it('marketplace selector should get marketplace state', () => {
    let mockState = {
      MarketplaceState: 'test1234'
    };

    expect(marketplaceSelector(mockState)).toBe('test1234');
  });

  it('dataset dialog selector should get dialog state', () => {
    let mockState = {
      MarketplaceState: {
        datasetDialog: 'test1234'
      }
    };

    expect(datasetDialogSelector(mockState)).toBe('test1234');
  })
});


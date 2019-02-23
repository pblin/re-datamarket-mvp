interface MarketplaceState {
  schemaFilter: string
}

const defaultState: MarketplaceState = {
  schemaFilter: 'all',
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    default:
      return state;
  }
  return newState;
};

export default reducer;

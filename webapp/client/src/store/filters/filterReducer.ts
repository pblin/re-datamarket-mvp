import {FILTER_ACTIONS} from "./filterActions";

interface FiltersState {
  countryList: any[];
  stateList: any[];
  cityList: any[];
  selectedCountry: any;
  selectedCity: any;
  selectedState: any;
  selectedTopics: any;
  terms: any[];

  //Factsets
  geoFactsets: any;
  topicFactsets: any[];
  filterIndexes: any[];
  areGeoFiltersApplied: boolean;
}

const defaultState: FiltersState = {
  countryList: [],
  stateList: [],
  cityList: [],
  selectedCity: '',
  selectedCountry: '',
  selectedState: '',
  selectedTopics: {},
  terms: [],

  //factsets
  geoFactsets: {},
  topicFactsets: [],
  filterIndexes: [],
  areGeoFiltersApplied: false
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case FILTER_ACTIONS.LOAD_COUNTRIES:
      newState.countryList = action.countries;
      break;
    case FILTER_ACTIONS.SELECT_COUNTRY:
      newState.stateList = action.stateList;
      newState.selectedCountry = action.country;
      newState.cityList = [];
      newState.selectedState = '';
      break;
    case FILTER_ACTIONS.SELECT_STATE:
      newState.selectedState = action.state;
      newState.cityList = action.cityList;
      newState.selectedCity = '';
      break;
    case FILTER_ACTIONS.SELECT_CITY:
      newState.selectedCity = action.city;
      break;
    case FILTER_ACTIONS.SELECT_TOPIC:
      newState.selectedTopics = Object.assign({}, state.selectedTopics, action.topic);
      break;
    case FILTER_ACTIONS.RESET_FILTERS:
      return defaultState;
    case FILTER_ACTIONS.ADD_TERM:
      newState.terms = [...state.terms.filter(t => t != action.term), action.term];
      break;
    case FILTER_ACTIONS.DELETE_TERM:
      newState.terms = [...state.terms.filter(t => t != action.term)];
      break;
    case FILTER_ACTIONS.DELETE_TERMS:
      newState.terms = [];
      break;
    case FILTER_ACTIONS.DELETE_LOCATION:
      newState.selectedCity = '';
      newState.selectedState = '';
      newState.selectedCountry = '';
      newState.cityList = [];
      newState.stateList = [];
      break;
    case FILTER_ACTIONS.DELETE_TOPICS:
      newState.selectedTopics = [];
      break;
    case FILTER_ACTIONS.UPDATE_FACTSETS:
      newState.topicFactsets = action.topicFactsets;
      newState.geoFactsets = action.geoFactsets;
      break;
    case FILTER_ACTIONS.UPDATE_GEO_FILTERS:
      newState.areGeoFiltersApplied = true;
      newState.filterIndexes = action.indexes;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;

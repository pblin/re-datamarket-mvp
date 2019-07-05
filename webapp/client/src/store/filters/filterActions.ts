import csc from 'country-state-city';

export enum FILTER_ACTIONS {
  SELECT_COUNTRY = "SELECT_COUNTRY",
  SELECT_STATE = "SELECT_STATE",
  SELECT_CITY = "SELECT_CITY",
  SELECT_TOPIC = "SELECT_TOPIC",
  LOAD_COUNTRIES = "LOAD_COUNTRIES",
  RESET_FILTERS = "RESET_FILTERS",
  ADD_TERM = "ADD_TERM",
  DELETE_TERM = "DELETE_TERM",
  DELETE_LOCATION = "DELETE_LOCATION",
  DELETE_TERMS = "DELETE_TERMS",
  DELETE_TOPICS = "DELETE_TOPICS"
};


export const selectCountry = (country) => {
  return {
    type: FILTER_ACTIONS.SELECT_COUNTRY,
    country,
    stateList: csc.getStatesOfCountry(country.id)
  }
};

export const selectState = (state) => {
  return {
    type: FILTER_ACTIONS.SELECT_STATE,
    state,
    cityList: csc.getCitiesOfState(state.id)
  }
};

export const selectCity = (city) => {
  return {
    type: FILTER_ACTIONS.SELECT_CITY,
    city
  }
};

export const resetFilters = () => {
  return {
    type: FILTER_ACTIONS.RESET_FILTERS
  }
};

export const deleteTopics = () => {
  return {
    type: FILTER_ACTIONS.DELETE_TOPICS
  }
};

export const deleteLocation = () => {
  return {
    type: FILTER_ACTIONS.DELETE_LOCATION
  }
};

export const deleteTerms = () => {
  return {
    type: FILTER_ACTIONS.DELETE_TERMS
  }
};

export const selectTopic = (checked, name) => {
  const topic = {};
  topic[name] = checked;
  return {
    type: FILTER_ACTIONS.SELECT_TOPIC,
    topic
  }
};

export const addTerm = (term) => {
  return {
    type: FILTER_ACTIONS.ADD_TERM,
    term
  }
};

export const deleteTerm = (term) => {
  return {
    type: FILTER_ACTIONS.DELETE_TERM,
    term
  }
};

export const loadCountries = () => {
  return {type: FILTER_ACTIONS.LOAD_COUNTRIES, countries: csc.getAllCountries().filter(filterCountries)};
};

const filterCountries = (country) => {
  return country.name == "United States" || country.name == "Canada";
};
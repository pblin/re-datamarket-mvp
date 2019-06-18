import * as React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from "@material-ui/icons/Category";
import csc from 'country-state-city';
import './filterMenu.scss';

interface ComponentProps {}
interface ComponentState {
  countryList: any[];
  stateList: any[];
  cityList: any[];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
}

export class FilterMenu extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      countryList: csc.getAllCountries(),
      cityList: [],
      stateList: [],
      selectedCity: '',
      selectedState: '',
      selectedCountry: ''
    }
  }

  //TODO: Reset
  onCountrySelect = (event) => {
    const country = event.target.value;

    console.log(country.name);

    this.setState({
      selectedCountry: country,
      stateList: csc.getStatesOfCountry(country.id)
    })
  };

  //TODO: Reset
  onStateSelect = (event) => {
    const state = event.target.value;

    this.setState({
      selectedState: state,
      cityList: csc.getCitiesOfState(state.id)
    });
  };

  //TODO: OnCitySelect

  resetFilters = () => {
    this.setState({
      cityList: [],
      stateList: [],
      selectedCity: '',
      selectedState: '',
      selectedCountry: ''
    })
  };

  renderFilters() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <ExpansionPanel className={"filter-item"}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
            >
              <Typography
                className="filter-menu-title">
                <LocationIcon/><span>LOCATION</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl variant={"outlined"} className={"filter-menu-control"}>
                    <InputLabel htmlFor={"country-filter"}>Country</InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={120} id={"country-filter"}/>}
                      onChange={this.onCountrySelect}
                      value={this.state.selectedCountry}
                    >
                      {this.state.countryList.map(country =>
                        <MenuItem value={country}>{country.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <FormControl variant={"outlined"} className={"filter-menu-control"}>
                  <InputLabel htmlFor={"state-filter"}>State/Province</InputLabel>
                  <Select
                    input={<OutlinedInput labelWidth={120} id={"state-filter"}/>}
                    onChange={this.onStateSelect}
                    value={this.state.selectedState}
                  >
                    {this.state.stateList.map(state =>
                      <MenuItem value={state}>{state.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl variant={"outlined"} className={"filter-menu-control"}>
                  <InputLabel htmlFor={"city-filter"}>City</InputLabel>
                  <Select
                    input={<OutlinedInput labelWidth={120} id={"city-filter"}/>}
                    onChange={()=>{}}
                    value={this.state.selectedCity}
                  >
                    {this.state.cityList.map(city =>
                      <MenuItem value={city}>{city.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={12}>
          <ExpansionPanel className={"filter-item"}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
            >
              <Typography
                className="filter-menu-title">
                <CategoryIcon/><span>CATEGORIES</span>
              </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Grid container>
        <Paper className={"filter-menu-container"}>
          <Grid item xs={12}>
            <Typography variant={"h6"} className={"filter-header"}>Filter Your Results</Typography>
          </Grid>
          {this.renderFilters()}
          <Button
            variant={"outlined"}
            color={"primary"}
            className={"filter-cta"}>
            Apply Filters
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={this.resetFilters}
            className={"filter-cta"}>
            Reset Filters
          </Button>
        </Paper>
      </Grid>
    )
  }
}

export default FilterMenu;

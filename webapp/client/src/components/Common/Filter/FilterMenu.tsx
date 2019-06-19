import * as React from "react";
import {
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import csc from 'country-state-city';
import './filterMenu.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTopics} from "../../../store/common/commonActions";
import {getTopicsSelector} from "../../../store/common/commonSelectors";

interface ComponentProps {
  onApply: Function;
  onClose: any;
  actions: any;
  topics: any[];
}

interface ComponentState {
  countryList: any[];
  stateList: any[];
  cityList: any[];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  selectedTopics: any;
}

export class FilterMenu extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    console.log(csc.getAllCountries());
    this.state = {
      countryList: csc.getAllCountries().filter(this.filterCountries),
      cityList: [],
      stateList: [],
      selectedCity: '',
      selectedState: '',
      selectedCountry: '',
      selectedTopics: {}
    }
  }

  //For now this app will only provide 2 countries
  filterCountries(country) {
    return country.name == "United States" || country.name == "Canada"
  }

  componentDidMount(): void {
    this.props.actions.getTopics();
  }

  onCountrySelect = (event) => {
    const country = event.target.value;

    this.setState({
      selectedCountry: country,
      stateList: csc.getStatesOfCountry(country.id),
      cityList: [],
      selectedState: ''
    })
  };

  onStateSelect = (event) => {
    const state = event.target.value;

    this.setState({
      selectedState: state,
      selectedCity: '',
      cityList: csc.getCitiesOfState(state.id)
    });
  };

  onCitySelect = (event) => {
    const city = event.target.value;

    this.setState({
      selectedCity: city
    });
  };

  onTopicSelect = (event, name) => {
    const {selectedTopics} = this.state;
    const newTopic = {};
    newTopic[name] = event.target.checked;
    this.setState({
      selectedTopics: Object.assign({}, selectedTopics, newTopic)
    });
  };

  applyFilters = () => {
    const {selectedCity, selectedState, selectedCountry, selectedTopics} = this.state;

    const topics = [];

    for (let k in selectedTopics) {
      if(selectedTopics[k]) {
        topics.push(k)
      }
    }

    this.props.onApply({
      selectedCity: selectedCity && selectedCity.name || '',
      selectedState: selectedState && selectedState.name || '',
      selectedCountry: selectedCountry && selectedCountry.name || '',
      topics
    })
  };

  resetFilters = () => {
    this.setState({
      cityList: [],
      stateList: [],
      selectedCity: '',
      selectedState: '',
      selectedCountry: '',
      selectedTopics: {}
    })
  };

  renderTopicCheckboxes() {
    const {topics} = this.props;

    return (<FormGroup>
      {topics.map((topic) => {
        const isChecked = this.state.selectedTopics[topic.name];
        console.log(this.state.selectedTopics);
        return (<FormControl>
          <FormControlLabel
            control={<Checkbox checked={isChecked || false}/>}
            onChange={(e) => this.onTopicSelect(e, topic.name)}
            label={topic.name}
          />
        </FormControl>)
      })}
    </FormGroup>);
  }

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
                    onChange={this.onCitySelect}
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
            <ExpansionPanelDetails>
              {this.renderTopicCheckboxes()}
            </ExpansionPanelDetails>
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
            <IconButton onClick={this.props.onClose}><ChevronLeftIcon/></IconButton>
          </Grid>
          {this.renderFilters()}
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={this.applyFilters}
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

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {
    topics: getTopicsSelector(state) || []
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getTopics
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);

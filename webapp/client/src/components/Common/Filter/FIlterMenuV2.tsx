import * as React from "react";
import {connect} from "react-redux";
import appVars from "../../../styles/appVars";
import ChipInput from "../Form/ChipInput";

import {Theme} from "@material-ui/core";
import {
  Chip,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles
} from "@material-ui/core";

//Icons
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";
import {areFiltersApplied, getFilters} from "../../../store/filters/filterSelectors";

interface ComponentProps {
  classes: any;
  onClose: any;
  onSearchTermChange: any;
  filters: any;
  areFiltersApplied: boolean;
}

interface ComponentState {
  addTermInput: string;
}

const styles = (theme: Theme) => ({
  toolbar: {
    height: '85px',
    padding: "10px 0 0 0px",
    backgroundColor: appVars.reblocOrange,
    '& svg': {
      fontSize: '35px',
      color: appVars.reblocWhite
    }
  },
  toolbarIconContainer: {
    width: '40px',
    display: 'inline-block',
    float: 'left' as 'left',
    marginTop: '15px'
  },
  toolbarTitleContainer: {
    display: 'inline-block',
    marginTop: '10px'
  },
  title: {
    color: appVars.reblocWhite,
    fontSize: '18px'
  },
  subtitle: {
    color: appVars.lightGray,
    fontSize: '12px'
  },
  closeIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: appVars.lightGray
    }
  },
  filterMenuContainer: {
    overflow: 'hidden',
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    borderLeft: `5px solid ${appVars.reblocOrange}`
  },
  noFilterContainer: {
    position: 'relative' as 'relative',
    top: '35%',
    transform: 'translateY(-50%)',
    color: '#a2a2a2'
  },
  geoFilter: {
    width: '100%'
  },
  countryPanel: {
    borderRadius: '0px !important',
    color: '#a2a2a2',
    padding: '5px',
    '& svg': {
      marginRight: '5px'
    }
  },
  countChip: {
    minWidth: '40px',
    height: '20px',
    color: 'white',
    background: '#04c04a'
  },
  filterLabel: {
    fontSize: '20px'
  },
  filterLabelContainer: {
    width: '85%',
    display: 'inline-block'
  },
  chipContainer: {
    width: '15%',
    marginTop: '5px',
    display: 'inline-block'
  },
  panelDetails: {
    padding: '0px 0px 0px 10px'
  },
  noBorder: {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      content: 'none'
    }
  }
});

export class FilterMenuV2 extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      addTermInput: '',
    }
  }

  resetFilters = () => {
    //TODO: RESET THE FILTERS
  };

  //TODO: Move to utility class
  capitalizeWords = (word) => {
    let words = word.split(' ');
    words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
    return words.join(' ');
  };

  renderGeoFilters = () => {
    const {geoFactsets} = this.props.filters;
    const {classes} = this.props;

    return(
      <div className={this.props.classes.geoFilter}>
        {geoFactsets.country.map((countryGeoFactset) => (
          <ExpansionPanel className={classes.countryPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              <div className={classes.filterLabelContainer}>
                <CheckIcon/>
                <span className={classes.filterLabel}>{this.capitalizeWords(countryGeoFactset.name)}</span>
              </div>
              <div className={classes.chipContainer}>
                <Chip label={countryGeoFactset.count} className={classes.countChip}/>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
              {this.renderStateGeoFilters(countryGeoFactset.region)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    )
  };

  renderStateGeoFilters = (states) => {
    const {classes} = this.props;

    return(
      <div className={this.props.classes.geoFilter}>
        {states.map((stateGeoFactset) => (
          <ExpansionPanel className={classes.countryPanel + ' ' + classes.noBorder}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              <div className={classes.filterLabelContainer}>
                <CheckIcon/>
                <span className={classes.filterLabel}>{this.capitalizeWords(stateGeoFactset.name)}</span>
              </div>
              <div className={classes.chipContainer}>
                <Chip label={stateGeoFactset.count} className={classes.countChip}/>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.renderCityGeoFilters(stateGeoFactset.city)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    )
  };

  renderCityGeoFilters(cities) {
    const {classes} = this.props;

    return(
      <div className={this.props.classes.geoFilter}>
        {cities.map((cityGeoFactset) => (
          <ExpansionPanel className={classes.countryPanel + ' ' + classes.noBorder}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              <div className={classes.filterLabelContainer}>
                <CheckIcon/>
                {/*<span className={classes.filterLabel}>{this.capitalizeWords(cityGeoFactset.name)}</span>*/}
              </div>
              <div className={classes.chipContainer}>
                <Chip label={cityGeoFactset.count} className={classes.countChip}/>
              </div>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        ))}
      </div>
    )
  }

  render() {
    const {classes, areFiltersApplied} = this.props;
    return (
      <div className={classes.filterMenuContainer}>
        <div className={classes.toolbar}>
          <div className={classes.toolbarIconContainer}>
            <ChevronLeft onClick={this.props.onClose} className={classes.closeIcon}/>
          </div>
          <div className={classes.toolbarTitleContainer}>
            <Typography variant={"h6"} className={classes.title}>
              ALL FILTERS
            </Typography>
            <Typography variant={"subtitle1"} className={classes.subtitle}>
              Use the filters below to find what you are looking for.
            </Typography>
          </div>
        </div>
        <Divider></Divider>
        <ChipInput onChange={this.props.onSearchTermChange}/>
        <div className={classes.filterContainer}>
          {!areFiltersApplied &&
            <div><Typography className={classes.noFilterContainer}>No Filters Applied</Typography></div>
          }
          {areFiltersApplied && this.renderGeoFilters()}
        </div>
      </div>
    )
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  console.log('Get new state');
  console.log(state);
  console.log(areFiltersApplied(state));
  return {
    filters: getFilters(state),
    areFiltersApplied: areFiltersApplied(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterMenuV2));

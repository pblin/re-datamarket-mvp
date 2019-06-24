import * as React from "react";
import {getFilters} from "../../../store/filters/filterSelectors";
import {Chip} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {deleteLocation, deleteTerms, deleteTopics} from "../../../store/filters/filterActions";

interface ComponentProps{
  filters: any;
  actions: any;
}

export class FilterBreadCrumbs extends React.Component<ComponentProps> {
  renderBreadCrumbs() {
    const {selectedCountry, selectedState, selectedCity, selectedTopics} = this.props.filters;
    const topics = [];

    for (let k in selectedTopics) {
      if(selectedTopics[k]) {
        topics.push(k)
      }
    }

    return (<React.Fragment>
      {(this.props.filters.terms.length > 0) &&
        <Chip
          label={`Terms: ${this.props.filters.terms.join(',')}`}
          onDelete={this.props.actions.deleteTerms}
        />
      }
      {(selectedCountry) &&
        <Chip label={`Location: ${selectedCountry.name},
          ${selectedState.name || ''},
          ${selectedCity.name || ''}`}
          onDelete={this.props.actions.deleteLocation}
        />
      }
      {(topics.length > 0) &&
        <Chip
          label={`Categories: ${topics.join(',')}`}
          onDelete={this.props.actions.deleteTopics}
        />
      }
    </React.Fragment>)
  }

  render() {
    return (<React.Fragment>{this.renderBreadCrumbs()}</React.Fragment>);
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {
    filters: getFilters(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      deleteTopics,
      deleteTerms,
      deleteLocation
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBreadCrumbs);

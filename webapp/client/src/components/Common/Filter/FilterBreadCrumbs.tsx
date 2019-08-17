import * as React from "react";
import {getFilters} from "../../../store/filters/filterSelectors";
import {Chip} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {deleteFilters} from "../../../store/filters/filterActions";
import "./filterMenu.scss";

interface ComponentProps{
  filters: any;
  actions: any;
}

//TODO: Capitalize labels
//TODO: Write delete filter functionality
export class FilterBreadCrumbs extends React.Component<ComponentProps> {
  capitalizeWords = (word) => {
    let words = word.split(' ');
    words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
    return words.join(' ');
  };

  renderBreadCrumbs() {
    const {levels} = this.props.filters;

    const [country, state, city, topic] = levels;

    return <React.Fragment>
      {country && (
        <Chip
          label={`Selected Country: ${this.capitalizeWords(country.value)}`}
          onDelete={() => this.props.actions.deleteFilters(0)}
        />
      )}
      {state && (
        <Chip
          label={`Selected State: ${this.capitalizeWords(state.value)}`}
          onDelete={() => this.props.actions.deleteFilters(1)}
        />
      )}
      {city && (
        <Chip
          label={`Selected City: ${this.capitalizeWords(city.value)}`}
          onDelete={() => this.props.actions.deleteFilters(2)}
        />
      )}
      {topic && (
        <Chip
          label={`Selected Topic: ${this.capitalizeWords(topic.value)}`}
          onDelete={() => this.props.actions.deleteFilters(3)}
        />
      )}
    </React.Fragment>
  }

  render() {
    return (<div className={"filter-bread-crumbs"}>{this.renderBreadCrumbs()}</div>);
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
      deleteFilters
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBreadCrumbs);

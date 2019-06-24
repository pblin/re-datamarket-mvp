import * as React from "react";
import {getFilters} from "../../../store/filters/filterSelectors";
import {Chip, Grid} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


interface ComponentProps{
  filters: any;
  actions: any;
}

export class FilterBreadCrumbs extends React.Component<ComponentProps> {
  renderBreadCrumbs() {
    return (<React.Fragment>
      {(this.props.filters.terms.length > 0) &&
      <Chip
        label={this.props.filters.terms.join(',')}
      />}
    </React.Fragment>)
  }

  render() {
    return (<Grid xs={12} item>{this.renderBreadCrumbs()}</Grid>);
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
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBreadCrumbs);

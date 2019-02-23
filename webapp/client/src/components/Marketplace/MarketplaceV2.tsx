import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.css';
import {updateSchemaFilter} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";

interface ComponentProps {
  schemaFilter: boolean;
  updateSchemaFilter: any;
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe')
  ];

  handleSchemaChange(val) {
    this.props.updateSchemaFilter(val);
  }

  render() {
    return (
      <div>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log('Marketplace State');
  console.log(state.MarketplaceState);
  return {
    schemaFilter: state.MarketplaceState.schemaFilter
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateSchemaFilter: (filter: string) => dispatch(updateSchemaFilter(filter))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

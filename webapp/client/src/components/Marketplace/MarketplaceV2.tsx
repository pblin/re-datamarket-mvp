import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.css';
import {MARKETPLACE_ACTIONS, updateSchemaFilter} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {profileSelector} from "../../store/profile/profileSelector";

interface ComponentProps {
  schemaFilter: boolean;
  updateSchemaFilter: any;
  profile: any;
  getProfile: any;
  getUserSchemas: any;
  getAllSchemas: any;
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.handleSchemaChange = this.handleSchemaChange.bind(this);
    this.getUserSchemas = this.getUserSchemas.bind(this);
  }

  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('All', 'all'),
    new ToolbarOption('OWNED BY ME',  'ownedByMe')
  ];

  getUserSchemas(id: string) {
    console.log('getting user schemas');
    console.log(id);
    this.props.getUserSchemas(id);
  }

  componentDidMount() {
    console.log('component did mount');
    console.log(this.props.profile);
    if(!this.props.profile) {
      //Display profile warning
    } else {
      //this.getUserSchemas(this.props.profile.id);
    }
    this.props.getAllSchemas();
  }

  handleSchemaChange(val) {
    this.props.updateSchemaFilter(val);
  }

  render() {
    return (
      <div>
        <MarketplaceToolbar
          onSchemaFilterChange={this.handleSchemaChange}
          schemaFilter={this.props.schemaFilter}
          toolbarOptions={this.toolbarOptions}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log('MARKETPLACE STATE');
  console.log(state);
  return {
    schemaFilter: state.MarketplaceState.schemaFilter,
    profile: profileSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateSchemaFilter: (filter: string) => dispatch(updateSchemaFilter(filter)),
    getUserSchemas: (id) => dispatch({type: MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, id}),
    getAllSchemas: () => dispatch({type: MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS})
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

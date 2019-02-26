import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import './marketplace.css';
import {MARKETPLACE_ACTIONS, updateSchemaFilter} from "../../store/marketplace/marketplaceActions";
import MarketplaceToolbar from './MarketplaceToolbar';
import {ToolbarOption} from "./ToolbarOption";
import {profileSelector} from "../../store/profile/profileSelector";
import SchemaList from "./SchemaList";
import {marketplaceSelector} from "../../store/marketplace/marketplaceSelectors";
import {Grid, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface ComponentProps {
  schemaFilter: boolean;
  updateSchemaFilter: any;
  profile: any;
  getProfile: any;
  getUserSchemas: any;
  getAllSchemas: any;
  schemas: any[];
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
        <Grid container={true} justify={'center'}>
          <div className={"app-section-wrapper"}>
            <Grid container={true} justify={"flex-end"}>
              <Button variant="contained" color="secondary" className="add-schema">
                Add
                <AddIcon/>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <SchemaList schemas={this.props.schemas}/>
            </Grid>
          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    schemaFilter: marketplaceSelector(state).schemaFilter,
    profile: profileSelector(state),
    schemas: marketplaceSelector(state).schemas
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

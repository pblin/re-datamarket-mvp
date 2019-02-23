import * as React from "react";
import {connect} from "react-redux";
import {Toolbar, Button, Hidden, FormControl, Select, MenuItem} from "@material-ui/core";
import {withRouter} from "react-router";
import './marketplace.css';

interface ComponentProps {
  schemaFilter: boolean
}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
  }

  /*TODO: Make this responsive */
  render() {
    return (
      <div>
        <Toolbar className="marketplace-toolbar">
          <Hidden xsDown>
            <Button>ALL</Button>
            <Button><strong>OWNED BY ME</strong></Button>
          </Hidden>
          <Hidden smUp>
            <FormControl>
              <Select value={this.props.schemaFilter}>
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'ownedByMe'}>Owned By Me</MenuItem>
              </Select>
            </FormControl>
          </Hidden>
        </Toolbar>
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
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

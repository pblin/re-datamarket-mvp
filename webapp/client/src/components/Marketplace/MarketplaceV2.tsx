import * as React from "react";
import {connect} from "react-redux";
import {Toolbar, Button} from "@material-ui/core";
import {withRouter} from "react-router";
import './marketplace.css';

interface ComponentProps {}

class MarketplaceV2 extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar className="marketplace-toolbar">
          <Button>ALL</Button>
          <Button><strong>OWNED BY ME</strong></Button>
        </Toolbar>
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketplaceV2)
);

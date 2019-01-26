import * as React from "react";
import {connect} from "react-redux";

interface ComponentProps {}

class Home extends React.Component<ComponentProps> {
  boundActionCreators: any;
  dispatch: any;
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('The component did mount');
  }


  handleClick() {
    console.log('The button was clicked');
  }

  render() {
    return <div>
      <h1>Create Schema Form</h1>
      <button onClick={this.handleClick}></button>
    </div>
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  }
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

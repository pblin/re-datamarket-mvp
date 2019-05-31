import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import queryString from "query-string";

interface ComponentProps {
  location: any;
  actions: any;
}

interface ComponentState {}

class EmailVerification extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    const queryParams = queryString.parse(this.props.location.search);

    if(queryParams.code && queryParams.email) {
      //TODO: send code to verification service
      console.log('Sending Verification');
      this.props.actions.verifyEmail(queryParams.email, queryParams.code);
    }
  }

  render() {
    return (
      <React.Fragment>Email Verification</React.Fragment>
    )
  }
}

//@ts-ignore
EmailVerification = withSnackbar(EmailVerification);

//@ts-ignore
export default withRouter(EmailVerification);

import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import queryString from "query-string";
import JumboPaper from "../Common/jumboPaper";

interface ComponentProps {
  location: any;
  actions: any;
  enqueueSnackbar: any;
}

interface ComponentState {}

class EmailVerification extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  verifyEmail(email, code) {
    if(code && email) {
      //TODO: send code to verification service
      console.log('Sending Verification');
      this.props.actions.verifyEmail(email, code, this.props.enqueueSnackbar);
    }
  }

  render() {
    const queryParams = queryString.parse(this.props.location.search);
    const {email, code} = queryParams;

    return (
      <React.Fragment>
        <JumboPaper
          title={"Email Verification"}
          content={`Please verify the email for ${email}`}
          buttonText={"Verify"}
          handleClick={() => this.verifyEmail(email, code)}
        />
      </React.Fragment>
    )
  }
}

//@ts-ignore
EmailVerification = withSnackbar(EmailVerification);

//@ts-ignore
export default withRouter(EmailVerification);

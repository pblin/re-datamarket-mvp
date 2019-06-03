import * as React from "react";
import JumboPaper from "../Common/jumboPaper";

const EmailVerificationRequired = ({profile, actions}) => {
  console.log('Is the email verified');
  console.log(profile);
  return(
    <React.Fragment>
      <JumboPaper
        title={"Verify Your Email Address"}
        content={`
          We now need to verify your email address. We've sent an email to REPLACEME
          to verify your address. Please click the link in the email to continue.
        `}
        buttonText={"Resend Email"}
        handleClick={() => {actions.resendVerification(profile['primary_email'])}}
      />
    </React.Fragment>
  );
};

export default EmailVerificationRequired;

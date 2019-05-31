import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import EmailVerification from './EmailVerification';
import {verifyEmail} from "../../store/profile/profileActions";

const mapStateToProps = (state: any) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        verifyEmail
      },
      dispatch
    )
  }
};

const EmailVerificationPage = connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

export default EmailVerificationPage;

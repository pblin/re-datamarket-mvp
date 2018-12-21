const check = (role, data) => {
  if ( 'registered' == role ) {
    // already signed up
    return true;
  }
else {
  return false;
    }
};

const Signup = props =>
  check(props.role, props.data)
    ? props.yes()
    : props.no();

Signup.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Signup;

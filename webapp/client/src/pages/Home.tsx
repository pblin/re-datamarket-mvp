import autobind from 'autobind-decorator';
import React from 'react';
import { Auth0Authentication } from '..//auth/Auth0Authentication';
import {TimelineMax, Linear} from 'greensock';
import './main.css';
import JumboPaper from "../components/Common/jumboPaper";
//import {connect} from "react-redux";

interface HomeProps {
  auth: Auth0Authentication;
}
export default class Home extends React.Component<HomeProps> {
  @autobind
  login() {
    this.props.auth.login();
  }
  @autobind
  logout() {
    this.props.auth.logout();
  }

  componentDidMount(): void {
    init();
  }

  navToProfile() {
    console.log('Should Nav to Profile')
  }

  render() {
    const { authenticated } = this.props.auth;
   
    return (
      <div>
        {!authenticated && (
        <section className="top">

          <div className="h-animation">
            <div className="cover" style={{background: "../img/city_background_op.jpg"}}></div>
            <div className="outlines" id="glow" style={{visibility: "hidden"}}></div>
          </div>

          <div className="container">

            <div className="row">

              <div className="col-md-12 text-center wow fadeInUp">

                <h1 className="text-center">Democratizing Real Estate Data</h1>
                <h3 className="text-center">ReBloc enables all stakeholders to seamlessly and securely buy and sell
                  data.</h3>
                <a href="#problem" className="btn btn-orange" onClick={this.login}>Login</a>
              </div>

            </div>

          </div>

        </section>)}
        {authenticated && (
          <JumboPaper
            title={"Welcome to ReBloc,"}
            content={"Please create a profile to continue"}
            handleClick={this.navToProfile}
            buttonText={"Create Profile"}/>
        )}
      </div>
    );
  }
}

function init() {

  var tl = new TimelineMax({repeat: -1, delay: 3, repeatDelay: 4});

  tl.from(".outlines", 4, {width: "0px", height: "0px", autoAlpha: 0, ease: Linear.easeNone})
    .to(".outlines", 4, {autoAlpha: 0, ease: Linear.easeNone});

  var buildingsTL = new TimelineMax({repeat: -1, repeatDelay: 0});

  buildingsTL.to(".h-animation", 24, {x: "-250px", y: "-350px", force3D: true, rotation: 0.01, ease: Linear.easeNone})
    .to(".h-animation", 24, {x: "0px", y: "0px", force3D: true, rotation: 0.01, ease: Linear.easeNone});

  function coverup() {
    if (window.innerWidth > 991) {
      tl.restart();
      //buildingsTL.restart();
    } else {
      tl.kill();
      //buildingsTL.kill();
    }
  }

  coverup();

  window.addEventListener("resize", coverup, false)
}

/*function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}*/

//export default withRouter(
//  connect(mapStateToProps, mapDispatchToProps)(Home as any)
//);

//export default connect(mapStateToProps, mapDispatchToProps)(Home as any)

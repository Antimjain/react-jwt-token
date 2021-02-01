import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

//form
import SigninForm from "./SigninForm";

//MFA varification modal
import MfaModal from "./MfaModal.jsx";

//action
import { authActions } from "../../actions";

//common component
import SigninHeader from "../../components/Header/SigninHeader";
import WhiteHeader from "../../components/WhiteHeader/WhiteHeader";
import CardOne from "../../components/CardOne/CardOne";

//css
import "./Signin.scss";

/** 
 * @class (Signin)
*/
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  checkLogin = ()=>{
    if(this.props.isLoggedIn && (window.location.pathname !== '/app')){
       setTimeout(()=>{this.props.history.push('/app')},0) 
    }
  }

  componentDidMount() {
    // this.props.getDeviceStatus(); 
  }

  handleSubmit = async values => {
    const { email, password } = values;
    await this.props.doLogin(email, password);
  };

  signUp = event => {
    // shell.openExternal(`${config.CACHER_WEB}/signup/`);
  };

  forgotPassword = event => {
    // shell.openExternal(`${config.CACHER_WEB}/forgot_password/`);
  };

  componentDidUpdate(prevProps) {
      const { history } = this.props;
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn 
    ){
      history.push("/profile");
      window.location.reload(); 
    }
  }

  

  render() {
    const {
      loginProcess,
      loginSuccess,
      loginFailure,
      serverError,
      isLoading,
      isLoggedIn
    } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }
    console.log("thisssssssssssssss", this.props)
    return (
      <Fragment>
      <div className="base_frame pl-0 pr-0 container-fluid">
          <div className="row justify-content-center">
            <SigninHeader />
          </div>
          {(!loginSuccess || loginFailure || loginProcess) && (
            <div className="container">
              <div className="row mt-5 justify-content-center">
                <div className="col-md-12">
                  <CardOne con className={"Signin-Card p-0"}>
                    <WhiteHeader
                      label={
                        <div className="d-flex justify-content-between">
                          <h5>LOGIN</h5>
                          <div className="mr-3">
                            <span className="ss-text-light ss-text-medium ss-text-weight-300 mr-2">
                              Don’t have an account?
                            </span>
                            <span
                              className="ss-text-medium ss-text-weight-400 ss-text-primary ss-cursor-pointer"
                              onClick={this.signUp}
                            >
                              SIGN UP
                            </span>
                          </div>
                        </div>
                      }
                    ></WhiteHeader>
                    <div className="line"></div>
                    <SigninForm
                      handleSubmit={this.handleSubmit}
                      isLoading={isLoading}
                      forgotPassword={this.forgotPassword}
                    />
                    {serverError && (
                      <div
                        className="ss-text-danger ss-text-medium mt-2 mb-2"
                        style={{ marginLeft: "60px" }}
                      >
                        {serverError}
                      </div>
                    )}
                  </CardOne>
                </div>
              </div>
            </div>
          )}
        </div>
        {loginSuccess && <MfaModal show={"true"} />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.authState });

const mapDispatchToProps = dispatch => ({
  doLogin: (username, password) =>
    dispatch(authActions.doLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

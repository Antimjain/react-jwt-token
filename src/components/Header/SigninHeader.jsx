import React, { Fragment } from "react";
// import appLogoDark from "../../assets/app-logo-dark-bg.svg"

// SigninHeader
const SigninHeader = props => {
  return (
    <Fragment>
      <div id="ss_header">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-6 h-100">
              <div className="ss-vertical-align h-100">
              {/* <img
                // src={appLogoDark}
                alt=""
                className="streamspace-logo logo-aline"
              /> */}
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SigninHeader;

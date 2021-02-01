import React, { Component } from "react";
// import {
//   HashRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";
import { Router, Switch, Route, Link } from "react-router-dom";
import { history } from '../helpers/history';

// import AppRoute from "./AppRoute";
// import AppInitVerify from "./AppInitVerify";

// const verify_AppRoute = AppInitVerify(AppRoute);

import { Signin } from "../containers";
import { Home } from '../containers'
import { Profile } from '../containers'

class Routes extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    // window.history.replaceState(null, null, "/");
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }


  render() {
    const { currentUser } = this.state;
    console.log("currentUser",currentUser)
    return (
      // <Router>
      //   <Switch>
      //     {/* <Route path="/" component={verify_AppRoute} /> */}
      //     <Route path="/" component={Signin}/>
      //     {/* <Route path="/signin" component={Signin}/> */}
      //   </Switch>
      // </Router>
        <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              bezKoder
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

    
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Signin} />
              <Route exact path="/profile" component={Profile} />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routes;
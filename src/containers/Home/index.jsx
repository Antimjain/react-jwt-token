import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("this.propsthis.props",this.props)
    const { user: currentUser } = this.props;
    console.log("home ", currentUser)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return <h1>Home page</h1>;
  }
}

const mapStateToProps = state => ({ ...state.authState });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
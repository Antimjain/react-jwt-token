import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log("this.propsthis.props",this.props)
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return <h1>Profile page</h1>;
  }
}

const mapStateToProps = state => ({ ...state.authState });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
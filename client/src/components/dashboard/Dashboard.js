import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profileActions";

export class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

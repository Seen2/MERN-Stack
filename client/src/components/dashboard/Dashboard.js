import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

export class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = event => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if login user has profile data
      if (Object.keys(profile).length > 1) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {profile.experience ? (
              <Experience experience={profile.experience} />
            ) : null}
            {profile.education ? (
              <Education education={profile.education} />
            ) : null}
            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //user logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup your profile please enter some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="diplay-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";

export class Profile extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = <h1>Profiles Here</h1>;
      } else {
        profileItems = <h4>No Profiles yet...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="Row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer</h1>
              <p className="lead text-center">
                Browse and Connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
  //errors:state.errors
});

const mapDispatchToProps = {
  getProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

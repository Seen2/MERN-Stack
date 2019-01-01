import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//import TextFieldGroup from "../common/TextFieldGroup";

export class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to create your profile stand out
              </p>
              <small className="d-block pb-3"> required feilds</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  //createProfile: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors.isRequired
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);

import React, { Component } from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";

import isEmpty from "../../validation/is-empty";

export default class ProfileHeader extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>

              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              <p>
                {isEmpty(profile.website) ? null : (
                  <a className="text-white p-2" href={profile.website}>
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.twitter) ? null : (
                  <a className="text-white p-2" href={profile.social.twitter}>
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social.facebook) ? null : (
                  <a className="text-white p-2" href={profile.social}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social.linkedin) ? null : (
                  <a className="text-white p-2" href={profile.social}>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social.instagram) ? null : (
                  <a className="text-white p-2" href={profile.social}>
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.youtube) ? null : (
                  <a className="text-white p-2" href={profile.social}>
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

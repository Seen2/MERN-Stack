import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import Moment from "react-moment";

import { deleteExperience } from "../../actions/profileActions";

export class Experience extends Component {
  static propTypes = {
    deleteExperience: PropTypes.func.isRequired
  };
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {"  -   "}
          <Moment format="YYYY/MM/DD">
            {exp.to === null ? Date.now() : exp.to}
          </Moment>
        </td>
        <td>
          <button
            onClick={exp => {
              this.onDeleteClick(exp._id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h1 className="mb-2">Experience Credentials</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { deleteExperience };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);

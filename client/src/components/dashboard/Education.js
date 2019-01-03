import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import Moment from "react-moment";

import { deleteEducation } from "../../actions/profileActions";

export class Education extends Component {
  static propTypes = {
    deleteEducation: PropTypes.func.isRequired
  };

  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {"  -   "}
          <Moment format="YYYY/MM/DD">
            {edu.to === null ? Date.now() : edu.to}
          </Moment>
        </td>
        <td>
          <button
            onClick={edu => {
              this.onDeleteClick(edu._id);
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
        <h1 className="mb-2">Education Credentials</h1>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { deleteEducation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);

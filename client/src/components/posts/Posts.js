import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

export class Posts extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="feed">
        <div className="row">
          <div className="container">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

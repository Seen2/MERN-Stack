import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  static propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };
  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text
    };
    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="card card-info">
        <div className="card-header bg-info text-white">Comment...</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                className="form-control form-control-lg"
                placeholder="Reply to post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  addComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);

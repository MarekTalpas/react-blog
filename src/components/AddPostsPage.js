import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsForm from './PostsForm';
import { initiateAddPost } from '../actions/posts';

export class AddPostsPage extends Component {
  _handleFormSubmit = (post) => {
    this.props.initiateAddPost(post);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Create Post</h1>
          </div>
        </div>
        <div className="content-container">
          <PostsForm onSubmit={this._handleFormSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  initiateAddPost: (post) => dispatch(initiateAddPost(post))
});

export default connect(undefined, mapDispatchToProps)(AddPostsPage);

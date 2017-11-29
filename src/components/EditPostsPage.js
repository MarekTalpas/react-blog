import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsForm from './PostsForm';
import { initiateEditPost, initiateRemovePost } from '../actions/posts';

export class EditPostsPage extends Component {
  _handleFormSubmit = (post) => {
    this.props.initiateEditPost(this.props.post.id, post);
    this.props.history.push('/');
  };
  _handlePostRemove = () => {
    this.props.initiateRemovePost({ id: this.props.post.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Post</h1>
          </div>
        </div>
        <div className="content-container">
          <PostsForm onSubmit={this._handleFormSubmit} post={this.props.post} />
          <button
            className="button button--secondary button--remove"
            onClick={this._handlePostRemove}
          >
            Remove Post
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  initiateEditPost: (post) => dispatch(initiateEditPost(post)),
  initiateRemovePost: (id) => dispatch(initiateRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostsPage);

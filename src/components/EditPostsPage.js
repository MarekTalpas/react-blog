import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PostsForm from './PostsForm';
import { initiateEditPost, initiateRemovePost } from '../actions/posts';

window.Modal = Modal;

const modalStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw'
  },
  content: {
    borderRadius: '3px',
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    margin: '$l-size $m-size',
    position: 'none',
    textAlign: 'center',
    width: '40rem'
  }
};

export class EditPostsPage extends Component {
  state = {
    modalIsOpen: false
  };
  _openModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };
  _closeModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
  };
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
            onClick={this._openModal}
          >
            Remove Post
          </button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this._closeModal}
          closeTimeoutMS={400}
          style={modalStyles}
          contentLabel="Remove Post"
        >
          <h1 className="box-layout__title">Do you really want to remove this post ?</h1>
          <div className="button__couple">
            <button
              className="button button--secondary button--confirm"
              onClick={this._closeModal}
            >
              NO
            </button>
            <button
              className="button button--confirm"
              onClick={this._handlePostRemove}
            >
              YES
            </button>
          </div>
        </Modal>
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

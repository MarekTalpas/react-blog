import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ReadPostPage = ({ title, content }) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Read Post</h1>
      </div>
    </div>
    <div className="content-container">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  </div>
);

ReadPostPage.defaultProps = {
  title: '',
  content: ''
};

ReadPostPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.id === props.match.params.id)
});

export default connect(mapStateToProps)(ReadPostPage);

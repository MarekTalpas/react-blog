import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsListItem from './PostsListItem';
import filterPosts from '../selectors/posts';

export const PostsList = ({ posts }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Posts</div>
      <div className="show-for-desktop">Posts</div>
    </div>
    <div className="list-body">
      {
        posts.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Posts To Show</span>
          </div>
        ) : (
          posts.map(post => <PostsListItem key={post.id} {...post} />)
        )
      }
    </div>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  posts: filterPosts(state.posts, state.filters)
});

export default connect(mapStateToProps)(PostsList);

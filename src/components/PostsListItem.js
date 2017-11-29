import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostsListItem = ({
  id,
  title,
  content,
  createdAt
}) => {
  return (
    <Link className="list-item" to={`/edit/${id}`}>
      <div>
        <h3 className="list-item__title">{title}</h3>
        <span className="list-item__subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span>
      </div>
    </Link>
  );
};

PostsListItem.defaultProps = {
  id: '',
  title: '',
  content: '',
  createdAt: moment().valueOf()
};

PostsListItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.number
};

export default PostsListItem;

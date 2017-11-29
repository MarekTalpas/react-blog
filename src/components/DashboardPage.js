import React from 'react';
import PostsListFilters from './PostsListFilters';
import PostsList from './PostsList';

const DashboardPage = () => (
  <div>
    <PostsListFilters />
    <PostsList />
  </div>
);

export default DashboardPage;

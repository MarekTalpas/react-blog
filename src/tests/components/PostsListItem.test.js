import React from 'react';
import { shallow } from 'enzyme';
import PostsListItem from '../../components/PostsListItem';
import posts from '../fixtures/posts';

test('should render PostsListItem properly', () => {
  const wrapper = shallow(<PostsListItem {...posts} />);
  expect(wrapper).toMatchSnapshot();
});

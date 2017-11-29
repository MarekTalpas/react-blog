import React from 'react';
import { shallow } from 'enzyme';
import { PostsList } from '../../components/PostsList';
import posts from '../fixtures/posts';

test('should render PostsList component with some posts properly', () => {
  const wrapper = shallow(<PostsList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsList component with any posts properly', () => {
  const wrapper = shallow(<PostsList posts={[]} />);
  expect(wrapper).toMatchSnapshot();
});

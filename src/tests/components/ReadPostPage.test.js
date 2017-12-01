import React from 'react';
import { shallow } from 'enzyme';
import { ReadPostPage } from '../../components/ReadPostPage';
import posts from '../fixtures/posts';

test('should render ReadPostPage component properly', () => {
  const wrapper = shallow(<ReadPostPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ReadPostPage component with props properly', () => {
  const wrapper = shallow(<ReadPostPage post={posts[0]} />);
  expect(wrapper).toMatchSnapshot();
});

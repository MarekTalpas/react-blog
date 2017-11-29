import React from 'react';
import { shallow } from 'enzyme';
import { AddPostsPage } from '../../components/AddPostsPage';
import posts from '../fixtures/posts';

let wrapper, initiateAddPostSpy, history;

beforeEach(() => {
  history = { push: jest.fn() };
  initiateAddPostSpy = jest.fn();
  wrapper = shallow(<AddPostsPage history={history} initiateAddPost={initiateAddPostSpy} />);
});

test('should render AddPostsPage properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle submitting form properly', () => {
  wrapper.find('PostsForm').prop('onSubmit')(posts[0]);
  expect(initiateAddPostSpy).toHaveBeenLastCalledWith(posts[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

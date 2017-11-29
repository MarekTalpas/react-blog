import React from 'react';
import { shallow } from 'enzyme';
import { EditPostsPage } from '../../components/EditPostsPage';
import posts from '../fixtures/posts';

let wrapper, history, initiateRemovePostSpy, initiateEditPostSpy;

beforeEach(() => {
  history = { push: jest.fn() };
  initiateEditPostSpy = jest.fn();
  initiateRemovePostSpy = jest.fn();
  wrapper = shallow(<EditPostsPage
    history={history}
    post={posts[1]}
    initiateEditPost={initiateEditPostSpy}
    initiateRemovePost={initiateRemovePostSpy}
  />);
});

test('should render EditPostsPage component properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle form submission properly', () => {
  wrapper.find('PostsForm').prop('onSubmit')(posts[1]);
  expect(initiateEditPostSpy).toHaveBeenLastCalledWith(posts[1].id, posts[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle post removal properly', () => {
  wrapper.find('button').simulate('click');
  expect(initiateRemovePostSpy).toHaveBeenLastCalledWith({ id: posts[1].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
});

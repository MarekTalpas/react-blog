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
  wrapper.find('button').at(2).simulate('click');
  expect(initiateRemovePostSpy).toHaveBeenLastCalledWith({ id: posts[1].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should open modal', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('modalIsOpen')).toBe(true);
});

test('should close modal on request close', () => {
  wrapper.setState({ modalIsOpen: true });
  wrapper.find('Modal').prop('onRequestClose')();
  expect(wrapper.state('modalIsOpen')).toBe(false);
});

test('should close modal on button click', () => {
  wrapper.setState({ modalIsOpen: true });
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('modalIsOpen')).toBe(false);
});

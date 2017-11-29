import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import PostsForm from '../../components/PostsForm';
import posts from '../fixtures/posts';

test('should render PostsForm WITHOUT post property properly', () => {
  const wrapper = shallow(<PostsForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsForm WITH post property properly', () => {
  const wrapper = shallow(<PostsForm post={posts[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsForm WITH error when form submitting is invalid', () => {
  const wrapper = shallow(<PostsForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should setup title in the state when input with title is changed', () => {
  const value = 'some title';
  const wrapper = shallow(<PostsForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('title')).toBe(value);
});

test('should setup content in the state when textarea value is changed', () => {
  const value = 'some text content';
  const wrapper = shallow(<PostsForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('content')).toBe(value);
});

test('should setup createdAt in the state when date in date picker is changed', () => {
  const now = moment();
  const wrapper = shallow(<PostsForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toBe(now);
});

test('should change calendarFocused in the state when calendar is focused', () => {
  const focused = true;
  const wrapper = shallow(<PostsForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});

test('should submit form properly', () => {
  const onSubmitSpy = jest.fn();
  const { title, createdAt, content } = posts[2];
  const wrapper = shallow(<PostsForm post={posts[2]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    title,
    createdAt,
    content
  });
});

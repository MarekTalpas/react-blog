import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLoginWithGoogle on google button click', () => {
  const startLoginWithGoogle = jest.fn();
  const wrapper = shallow(<LoginPage
    startLoginWithGoogle={startLoginWithGoogle}
  />);
  wrapper.find('.google').simulate('click');
  expect(startLoginWithGoogle).toHaveBeenCalled();
});

test('should call startLoginWithFAcebook on facebook button click', () => {
  const startLoginWithFacebook = jest.fn();
  const wrapper = shallow(<LoginPage
    startLoginWithFacebook={startLoginWithFacebook}
  />);
  wrapper.find('.facebook').simulate('click');
  expect(startLoginWithFacebook).toHaveBeenCalled();
});

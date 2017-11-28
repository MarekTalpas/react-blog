import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { PostsListFilters } from '../../components/PostsListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter,
  setStartDateFilter,
  setEndDateFilter,
  sortByDate,
  sortByTitle,
  wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  setStartDateFilter = jest.fn();
  setEndDateFilter = jest.fn();
  sortByDate = jest.fn();
  sortByTitle = jest.fn();
  wrapper = shallow(<PostsListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    setStartDateFilter={setStartDateFilter}
    setEndDateFilter={setEndDateFilter}
    sortByDate={sortByDate}
    sortByTitle={sortByTitle}
  />);
});

test('should render PostsListFilters with default values properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render PostsListFilters with alternative values properly', () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should set input text value properly', () => {
  const inputValue = 'something';
  wrapper.find('input').simulate('change', {
    target: { value: inputValue }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(inputValue);
});

test('should call sortByDate() function when date option is selected', () => {
  const value = 'date';
  wrapper.setProps({ filters: altFilters });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should call sortByTitle() function when title option is selected', () => {
  const value = 'title';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByTitle).toHaveBeenCalled();
});

test('should call setStartDateFilter when start date is changed', () => {
  const startDate = moment().add(2, 'days');
  const endDate = moment().add(5, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDateFilter).toHaveBeenLastCalledWith(startDate);
  expect(setEndDateFilter).toHaveBeenLastCalledWith(endDate);
});

test('should change state value when calendar is focused', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

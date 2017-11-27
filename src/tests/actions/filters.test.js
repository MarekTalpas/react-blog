import moment from 'moment';
import {
  setTextFilter,
  setStartDateFilter,
  setEndDateFilter,
  sortByDate,
  sortByTitle
} from '../../actions/filters';

test('should setup text filter action with text', () => {
  const text = 'something';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'TEXT_FILTER',
    text
  });
});

test('should setup text filter action when text is default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'TEXT_FILTER',
    text: ''
  });
});

test('should setup start date filter action', () => {
  const startDate = moment(0);
  const action = setStartDateFilter(startDate);
  expect(action).toEqual({
    type: 'START_DATE_FILTER',
    startDate
  });
});

test('should setup end date filter action', () => {
  const endDate = moment(0);
  const action = setEndDateFilter(endDate);
  expect(action).toEqual({
    type: 'END_DATE_FILTER',
    endDate
  });
});

test('should sort by date correctly', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should sort by title correctly', () => {
  expect(sortByTitle()).toEqual({ type: 'SORT_BY_TITLE' });
});

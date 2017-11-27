import moment from 'moment';
import filtersReducer, { defaultFilters } from '../../reducers/filters';

test('should setup default state when redux is firstly initialized', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultFilters);
});

test('should setup state properly for text filter', () => {
  const text = 'abc';
  const action = {
    type: 'TEXT_FILTER',
    text
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test('should setup state properly for start date filter', () => {
  const startDate = moment(0);
  const action = {
    type: 'START_DATE_FILTER',
    startDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate);
});

test('should setup state properly for end date filter', () => {
  const endDate = moment(0);
  const action = {
    type: 'END_DATE_FILTER',
    endDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(endDate);
});

test('should setup state properly when sort by date is active', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'title'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should setup state properly when sort by title is active', () => {
  const action = { type: 'SORT_BY_TITLE' };
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe('title');
});

import moment from 'moment';

export const defaultFilters = {
  text: '',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = defaultFilters, action) => {
  switch (action.type) {
    case 'TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'START_DATE_FILTER':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'END_DATE_FILTER':
      return {
        ...state,
        endDate: action.endDate
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_TITLE':
      return {
        ...state,
        sortBy: 'title'
      };
    default:
      return state;
  }
};

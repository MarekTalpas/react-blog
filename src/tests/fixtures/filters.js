import moment from 'moment';

const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const altFilters = {
  text: 'bills',
  sortBy: 'title',
  startDate: moment().add(5, 'days'),
  endDate: moment().add(15, 'days')
};

export { filters, altFilters };

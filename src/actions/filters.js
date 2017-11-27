const setTextFilter = (text = '') => ({
  type: 'TEXT_FILTER',
  text
});

const setStartDateFilter = startDate => ({
  type: 'START_DATE_FILTER',
  startDate
});

const setEndDateFilter = endDate => ({
  type: 'END_DATE_FILTER',
  endDate
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const sortByTitle = () => ({
  type: 'SORT_BY_TITLE'
});

export { setTextFilter, setStartDateFilter, setEndDateFilter, sortByDate, sortByTitle };

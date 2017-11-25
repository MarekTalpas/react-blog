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

export { setTextFilter, setStartDateFilter, setEndDateFilter };

import moment from 'moment';

export default [{
  id: '1',
  title: 'react and redux',
  content: 'this is post about react and redux.',
  createdAt: moment(0).valueOf()
}, {
  id: '2',
  title: 'js basics',
  content: 'this is post about javascript basics',
  createdAt: moment(0).add(3, 'days').valueOf()
}, {
  id: '3',
  title: 'nodejs',
  content: 'this is post about node js and all its features',
  createdAt: moment(0).subtract(3, 'days').valueOf()
}];

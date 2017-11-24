import moment from 'moment';

export default [{
  title: 'react and redux',
  createdAt: moment(0)
}, {
  title: 'js basics',
  createdAt: moment(0).add(3, 'days')
}, {
  title: 'nodejs',
  createdAt: moment(0).subtract(3, 'days')
}];

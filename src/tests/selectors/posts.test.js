import moment from 'moment';
import getVisiblePosts from '../../selectors/posts';
import posts from '../fixtures/posts';

test('should filter posts by text value', () => {
  const filters = {
    text: 'js',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const filteredPosts = getVisiblePosts(posts, filters);
  expect(filteredPosts).toEqual([posts[1], posts[2]]);
});

test('should filter posts by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const filteredPosts = getVisiblePosts(posts, filters);
  expect(filteredPosts).toEqual([posts[1], posts[0]]);
});

test('should filter posts by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };
  const filteredPosts = getVisiblePosts(posts, filters);
  expect(filteredPosts).toEqual([posts[0], posts[2]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const filteredPosts = getVisiblePosts(posts, filters);
  expect(filteredPosts).toEqual([posts[1], posts[0], posts[2]]);
});

test('should sort by title', () => {
  const filters = {
    text: '',
    sortBy: 'title',
    startDate: undefined,
    endDate: undefined
  };
  const filteredPosts = getVisiblePosts(posts, filters);
  expect(filteredPosts).toEqual([posts[1], posts[2], posts[0]]);
});

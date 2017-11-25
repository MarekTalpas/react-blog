import moment from 'moment';
import postsData from '../fixtures/posts';
import postsReducer from '../../reducers/posts';

test('should return default state when redux is initialised', () => {
  const action = { type: '@@INIT' };
  const state = postsReducer(undefined, action);
  expect(state).toEqual([]);
});

test('should add post to state', () => {
  const post = {
    id: '4',
    title: 'jest is best',
    content: 'this is post about jest.',
    createdAt: moment(0).add(10, 'days').valueOf()
  };
  const action = {
    type: 'ADD_POST',
    post
  };
  const state = postsReducer(postsData, action);
  expect(state).toEqual([...postsData, post]);
});

test('should remove post by id', () => {
  const { id } = postsData[2];
  const action = {
    type: 'REMOVE_POST',
    id
  };
  const state = postsReducer(postsData, action);
  expect(state).toEqual([postsData[0], postsData[1]]);
});

test('should not remove post by id when id was not found', () => {
  const { id } = '-1';
  const action = {
    type: 'REMOVE_POST',
    id
  };
  const state = postsReducer(postsData, action);
  expect(state).toEqual(postsData);
});

test('should update post by id', () => {
  const { id } = postsData[1];
  const update = { title: 'jest and enzyme' };
  const action = {
    type: 'EDIT_POST',
    id,
    update
  };
  const state = postsReducer(postsData, action);
  expect(state[1].title).toBe(update.title);
});

test('should not update when id does not exist', () => {
  const id = '-1';
  const update = { title: 'write less with less' };
  const action = {
    type: 'EDIT_POST',
    id,
    update
  };
  const state = postsReducer(postsData, action);
  expect(state).toEqual(postsData);
});

test('should fetch all posts', () => {
  const action = {
    type: 'GET_ALL_POSTS',
    posts: postsData
  };
  const state = postsReducer(postsData, action);
  expect(state).toEqual(postsData);
});

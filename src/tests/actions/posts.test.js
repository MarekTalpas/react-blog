import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import postsData from '../fixtures/posts';
import {
  addPost,
  initiateAddPost,
  removePost,
  initiateRemovePost,
  editPost,
  initiateEditPost,
  getAllPosts,
  initiateGetAllPosts
} from '../../actions/posts';

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);
const uid = 'testid';
const storeWithAuthReducer = { auth: { uid } };

beforeEach((done) => {
  const posts = {};
  postsData.forEach(({
    id,
    title,
    content,
    createdAt
  }) => {
    posts[id] = { title, content, createdAt };
  });
  database.ref(`users/${uid}/posts`).set(posts).then(() => done());
});

test('should setup action for add post properly', () => {
  const post = postsData[0];
  const action = addPost(post);
  expect(action).toEqual({
    type: 'ADD_POST',
    post
  });
});

test('should add a new post to firebase', (done) => {
  const store = createMockStore(storeWithAuthReducer);
  const newPost = {
    title: 'New Post',
    content: 'This is content of a new test post',
    createdAt: 0
  };
  store.dispatch(initiateAddPost(newPost)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_POST',
      post: {
        id: expect.any(String),
        ...newPost
      }
    });

    return database.ref(`users/${uid}/posts/${actions[0].post.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(newPost);
    done();
  });
});

test('should add a default post to firebase', (done) => {
  const store = createMockStore(storeWithAuthReducer);
  const defaultPost = {
    title: '',
    content: '',
    createdAt: 0
  };

  store.dispatch(initiateAddPost({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_POST',
      post: {
        id: expect.any(String),
        ...defaultPost
      }
    });

    return database.ref(`users/${uid}/posts/${actions[0].post.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultPost);
    done();
  });
});

test('should setup action for remove post', () => {
  const id = 'id123';
  const action = removePost({ id });
  expect(action).toEqual({
    type: 'REMOVE_POST',
    id
  });
});

test('should remove post by id from firebase', (done) => {
  const { id } = postsData[2];
  const store = createMockStore(storeWithAuthReducer);

  store.dispatch(initiateRemovePost({ id })).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'REMOVE_POST',
      id
    });

    return database.ref(`users/${uid}/posts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup action for edit post', () => {
  const id = 'id456';
  const update = { title: 'new changed title' };
  const action = editPost(id, update);
  expect(action).toEqual({
    type: 'EDIT_POST',
    id,
    update
  });
});

test('should update given value by id in firebase', (done) => {
  const { id } = postsData[1];
  const update = { title: 'new changed title' };
  const store = createMockStore(storeWithAuthReducer);

  store.dispatch(initiateEditPost(id, update)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'EDIT_POST',
      id,
      update
    });

    return database.ref(`users/${uid}/posts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().title).toBe(update.title);
    done();
  });
});

test('should setup action for get all posts', () => {
  const action = getAllPosts(postsData);
  expect(action).toEqual({
    type: 'GET_ALL_POSTS',
    posts: postsData
  });
});

test('should fetch all posts from firebase', (done) => {
  const store = createMockStore(storeWithAuthReducer);

  store.dispatch(initiateGetAllPosts()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'GET_ALL_POSTS',
      posts: postsData
    });

    return database.ref(`users/${uid}/posts`).once('value');
  });
  done();
});

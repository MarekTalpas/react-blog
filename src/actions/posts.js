import database from '../firebase/firebase';

const addPost = post => ({
  type: 'ADD_POST',
  post
});

const initiateAddPost = (postData = {}) => {
  return (dispatch, getState) => {
    const {
      title = '',
      content = '',
      createdAt = 0
    } = postData;
    const post = { title, content, createdAt };
    const { uid } = getState().auth;

    return database.ref(`users/${uid}/posts`).push(post).then(({ key: id }) => {
      dispatch(addPost({
        id,
        ...post
      }));
    });
  };
};

const removePost = ({ id } = {}) => ({
  type: 'REMOVE_POST',
  id
});

const initiateRemovePost = ({ id } = {}) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    return database.ref(`users/${uid}/posts/${id}`).remove().then(() => {
      dispatch(removePost({ id }));
    });
  };
};

const editPost = (id, update) => ({
  type: 'EDIT_POST',
  id,
  update
});

const initiateEditPost = (id, update) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    return database.ref(`users/${uid}/posts/${id}`).update(update).then(() => {
      dispatch(editPost(id, update));
    });
  };
};

const getAllPosts = posts => ({
  type: 'GET_ALL_POSTS',
  posts
});

const initiateGetAllPosts = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    return database.ref(`users/${uid}/posts`).once('value').then((snapshot) => {
      const posts = [];

      snapshot.forEach((snapshotChild) => {
        posts.push({
          id: snapshotChild.key,
          ...snapshotChild.val()
        });
      });

      dispatch(getAllPosts(posts));
    });
  };
};

export {
  addPost,
  initiateAddPost,
  removePost,
  initiateRemovePost,
  editPost,
  initiateEditPost,
  getAllPosts,
  initiateGetAllPosts
};

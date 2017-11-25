const defaultPostsState = [];

export default (state = defaultPostsState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ];
    case 'REMOVE_POST':
      return state.filter(post => post.id !== action.id);
    case 'EDIT_POST':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            ...action.update
          };
        }
        return post;
      });
    case 'GET_ALL_POSTS':
      return action.posts;
    default:
      return state;
  }
};

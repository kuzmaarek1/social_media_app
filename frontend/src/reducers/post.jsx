import * as actionType from '@/constants/actionTypes';

const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action,
) => {
  switch (action.type) {
    case actionType.UPLOAD_START:
      return { ...state, error: false, uploading: true };
    case actionType.UPLOAD_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        posts: state.posts ? [action.data, ...state.posts] : [action.data],
        uploading: false,
        error: false,
      };
    case actionType.UPLOAD_FAIL:
      return { ...state, uploading: false, error: true };
    case actionType.RETRIEVING_START:
      return { ...state, loading: true, error: false };
    case actionType.RETRIEVING_SUCCESS:
      return { ...state, posts: action.data, loading: false, error: false };
    case actionType.RETRIEVING_FAIL:
      return { ...state, loading: false, error: true };
    case actionType.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.data._id ? action.data : post,
        ),
      };
    default:
      return state;
  }
};

export default postReducer;

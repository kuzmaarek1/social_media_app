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
    default:
      return state;
  }
};

export default postReducer;

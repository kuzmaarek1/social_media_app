import * as actionType from '@/constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return { ...state, loading: true, errors: null };

    case actionType.AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.AUTH_FAIL:
      return { ...state, loading: false, errors: true };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    case actionType.FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          result: {
            ...state.authData.result,
            following: action.data,
          },
        },
      };

    case actionType.UNFOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          result: {
            ...state.authData.result,
            following: action.data,
          },
        },
      };
    default:
      return state;
  }
};

export default authReducer;

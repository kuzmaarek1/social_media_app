import * as actionType from '@/constants/actionTypes';
import * as api from '@/api/index.jsx';

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: actionType.RETRIEVING_START });
  try {
    const { data } = await api.getTimeLinePosts(id);
    //console.log(data);
    dispatch({ type: actionType.RETRIEVING_SUCCESS, data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.RETRIEVING_FAIL });
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, userId);
    dispatch({ type: actionType.LIKE, data: data });
  } catch (error) {
    console.log(error.message);
  }
};

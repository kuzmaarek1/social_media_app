import * as actionType from '@/constants/actionTypes';
import * as api from '@/api/index.jsx';

export const uploadImage = (data) => async (dispatch) => {
  try {
    await api.uploadImage(data);
  } catch (e) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: actionType.UPLOAD_START });
  try {
    const newPost = await api.uploadPost(data);
    console.log(newPost);
    dispatch({ type: actionType.UPLOAD_SUCCESS, data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.UPLOAD_FAIL });
  }
};

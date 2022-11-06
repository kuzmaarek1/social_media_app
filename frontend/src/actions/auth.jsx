import jwt_decode from 'jwt-decode';
import * as actionType from '@/constants/actionTypes';
import * as api from '@/api/index.jsx';

export const signin = (formData, navigate, response) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    if (formData) {
      const { data } = await api.signIn(formData);
      dispatch({ type: actionType.AUTH_SUCCESS, data });
    } else {
      const { given_name, family_name, picture, sub } = jwt_decode(response.credential);
      const token = response.credential;
      const result = {
        id: sub,
        type: 'user',
        firstName: given_name,
        lastName: family_name,
      };
      const { data } = await api.signInWithGoogle(result);
      dispatch({ type: actionType.AUTH_SUCCESS, data: { result: data.result, token } });
    }
    navigate('/');
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL });
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
    navigate('/');
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL });
    console.log(error);
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    const { data } = await api.updateUser(id, formData);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.UPDATING_FAIL });
    console.log(error);
  }
};

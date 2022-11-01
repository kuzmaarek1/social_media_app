import jwt_decode from 'jwt-decode';
import * as actionType from '@/constants/actionTypes';
import * as api from '@/api/index.jsx';

export const signin = (formData, navigate, response) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    if (formData) {
      const { data } = await api.signIn(formData);
      dispatch({ type: actionType.AUTH_SUCCES, data });
    } else {
      const { given_name, family_name, picture, sub } = jwt_decode(response.credential);
      const token = response.credential;
      const result = {
        _id: sub,
        _type: 'user',
        firstName: given_name,
        lastName: family_name,
        imageUrl: picture,
      };
      dispatch({ type: actionType.AUTH_SUCCES, data: { result, token } });
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
    dispatch({ type: actionType.AUTH_SUCCES, data });
    navigate('/');
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL });
    console.log(error);
  }
};

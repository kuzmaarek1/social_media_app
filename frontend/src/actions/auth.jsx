import jwt_decode from 'jwt-decode';
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.jsx';

export const signin = (formData, navigate, response) => async (dispatch) => {
  try {
    if (formData) {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });
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
      dispatch({ type: AUTH, data: { result, token } });
    }
    navigate('/');
  } catch (error) {
    alert('Error');
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    alert('Error');
    console.log(error);
  }
};

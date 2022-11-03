import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const signIn = (data) => API.post('/user/signin', data);
export const signUp = (data) => API.post('/user/signup', data);
export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/posts/', data);
export const getTimeLinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  API.patch(`/posts/${id}/like`, { userId: userId });

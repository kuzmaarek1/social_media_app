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
export const signInWithGoogle = (data) => API.post('/user/signinWithGoogle', data);
export const uploadImage = (data) => {
  return API.post('/upload/', data);
};
export const uploadPost = (data) => API.post('/posts/', data);
export const getTimeLinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  API.patch(`/posts/${id}/like`, { userId: userId });
export const getUser = (id) => API.get(`user/${id}`);
export const updateUser = (id, data) => API.patch(`/user/${id}`, data);
export const getAllUser = () => API.get('/user/');
export const followUser = (id, data) => API.patch(`/user/${id}/follow`, data);
export const unFollowUser = (id, data) => API.patch(`/user/${id}/unfollow`, data);
export const userChats = (id) => API.get(`/chat/${id}`);
export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post(`/message/`, data);

import axios from 'axios';
import cookie from 'js-cookie';

const API = axios.create({
  baseURL: 'https://redcarpetbackend.herokuapp.com',
});
API.interceptors.request.use((req) => {
  if (cookie.get('token')) {
    req.headers.Authorization = `${cookie.get('token')}`;
  }
  return req;
});

export const register = (data) => {
  return API.post(`/register`, data);
};

export const signIn = (data) => {
  return API.post(`/signin`, data);
};

export const addTask = (data, token) => {
  return API.post('/addTask', {
    data,
  });
};

export const getTasks = (token) => {
  return API.get('/tasks');
};

export const removeTask = (i) => {
  return API.post(`/deleteTask/${i}`);
};
export const clearTask = () => {
  return API.post(`/clearTask`);
};

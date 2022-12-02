import * as api from '../api/index';
import cookie from 'js-cookie';

export const getTasks = (token) => async (dispatch) => {
  try {
    const { data } = await api.getTasks(token);
    dispatch({ type: 'GET_TASKS', payload: data });
  } catch (error) {}
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const { data } = await api.register({
      username,
      email,
      password,
    });

    cookie.set('token', data.token, { expires: 3 });
    dispatch({ type: 'REGISTER', payload: data });
  } catch (error) {}
};

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await api.signIn({
      email,
      password,
    });

    cookie.set('token', data.token, { expires: 3 });

    dispatch({ type: 'SIGNIN', payload: data });
  } catch (error) {}
};

export const addTask = (task) => async (dispatch) => {
  try {
    await api.addTask(task, cookie.get('token'));
    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: task.slice(0, 4),
        desc: task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeTask = (i) => async (dispatch) => {
  try {
    await api.removeTask(i);
    dispatch({
      type: 'REMOVE_TASK',
      payload: i,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearTask = () => async (dispatch) => {
  try {
    await api.clearTask();
    dispatch({
      type: 'CLEAR_TASK',
    
    });
  } catch (error) {
    console.log(error);
  }
};

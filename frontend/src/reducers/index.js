const products = (state = { tasks: [], user: null, token: null }, action) => {
  if (action.type == 'GET_TASKS') {
    return {
      ...state,
      user: action.payload.user,
      tasks: action.payload.user.tasks,
    };
  }
  if (action.type == 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      tasks: [],
    };
  }
  if (action.type == 'SIGNIN') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      tasks: action.payload.tasks,
    };
  }
  if (action.type == 'ADD_TASK') {
    return {
      ...state,

      tasks: [...state.tasks, action.payload],
    };
  }

  if (action.type == 'REMOVE_TASK') {
    return {
      ...state,
      tasks: state.tasks.filter((task, i) => {
        if (action.payload != i) return task;
      }),
    };
  }

  if (action.type == 'CLEAR_TASK') {
    return {
      ...state,
      tasks: [],
    };
  }

  return state;
};

export default products;

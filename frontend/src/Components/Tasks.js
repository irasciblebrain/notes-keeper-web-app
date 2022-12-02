import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, clearTask } from '../actions/index';

const Tasks = () => {
  const [todo, setTodo] = React.useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleAdd = () => {
    dispatch(addTask(todo));
    setTodo('');
  };

  const handleRemove = (i) => {
    dispatch(removeTask(i));
    
  };
  const handleClear = () => {
    dispatch(clearTask());
    
  };

  return (
    <div>
      <div className='wrapper' style={{ color: '#000' }}>
        <header style={{ color: '#000' }}>Todo List</header>
        <div className='inputField'>
          <input
            type='text'
            placeholder='Enter new task'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={handleAdd}>
            <i className='fas fa-plus'>+</i>
          </button>
        </div>
        <ul className='todoList'>
          {tasks.map((task, i) => {
            return (
              <li key={i}>
                {task.desc}
                {/* <p>{task.desc}</p> */}
                <span onClick = {()=>handleRemove(i)}>
                  
                  <i className='fa fa-trash'>🗑️</i>
                </span>
              </li>
            );
          })}
        </ul>
        <div className='footer'>
          <span>You have {tasks.length} pending tasks.</span>
          <button onClick={handleClear}>Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

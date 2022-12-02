import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './Components/Header';
import Register from './Components/Register';
import Tasks from './Components/Tasks';
import { getTasks } from './actions/index';

import cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <CheckAuth>
              <Register />
            </CheckAuth>
          }
        />
        <Route path='/:id' element={<Tasks />} />
      </Routes>
    </Router>
  );
}

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  if (user) return <Navigate to={`/${user._id}`} />;
  const token = cookie.get('token');
  if (token) {
    dispatch(getTasks(token));

    return <Navigate to='/' />;
  } else return children;
};
export default App;

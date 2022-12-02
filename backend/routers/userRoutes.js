const express = require('express');
const {
  registerUser,
  signInUser,
  findTasks,
  addTask,
  deleteTask,
  clearTask
} = require('../Controllers/userController');
const checkAuth = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/signin').post(signInUser);
router.route('/tasks').get(checkAuth, findTasks);
router.route('/deleteTask/:id').post(checkAuth, deleteTask);
router.route('/addTask').post(checkAuth, addTask);
router.route('/clearTask').post(checkAuth, clearTask);


module.exports = router;

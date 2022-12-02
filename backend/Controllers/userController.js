const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const user = await User.create({ username, email, password });
    console.log(user);
    const token = jwt.sign(
      {
        id: user._id,
      },
      'JWTSECRETKEY',
      {
        expiresIn: '24h',
      }
    );

    return res.status(201).send({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send('Server Error while creating the user!');
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    const user = await User.findOne({ email: email });
    if (!user || !user.correctPassword(password, user.password))
      return res.status(404).send('Incorrect email or password');

    const token = jwt.sign(
      {
        id: user._id,
      },
      'JWTSECRETKEY',
      {
        expiresIn: '24h',
      }
    );

    return res.status(201).send({
      user,
      token,
      tasks: user.tasks,
    });
  } catch (error) {
    return res.status(500).send('Server Error while logging the user!');
  }
};

const findTasks = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return res.status(500).send('UnAuthorised! Error in token');

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send('No User found! Error in finding tasks!');
  }
};

const addTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { data } = req.body;
    // console.log(req.body);
    const user = await User.findById(userId);
    if (!user) return res.status(500).send('UnAuthorised! Error in token');
    console.log(user, 'HERE');

    user.tasks.push({
      title: data.slice(0, 4),
      desc: data,
    });

    await user.save();
    return res.status(200).send(user.tasks);
  } catch (error) {
    return res.status(500).send('UnAuthorised! Error in adding tasks!');
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(500).send('UnAuthorised! Error in token');

    user.tasks.splice(id, 1);

    await user.save();
    return res.status(200).send(user.tasks);
  } catch (error) {
    return res.status(500).send('UnAuthorised! Error in deleting task!');
  }
};

const clearTask = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(500).send('UnAuthorised! Error in token');

    user.tasks = [];

    await user.save();
    return res.status(200).send(user.tasks);
  } catch (error) {
    return res.status(500).send('UnAuthorised! Error in deleting task!');
  }
};

module.exports = {
  registerUser,
  signInUser,
  findTasks,
  addTask,
  deleteTask,
  clearTask,
};

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Please give valid email!'],
  },
  password: {
    type: String,
  },
  tasks: [
    {
      title: {
        type: String,
        trim: true,
      },
      desc: {
        type: String,
        trim: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

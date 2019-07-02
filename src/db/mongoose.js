const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a postive number');
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Do not includes "password" in your password');
      }
    }
  }
});

// const me = new User({
//   name: '   gyeol   ',
//   email: 'MEMAIL@sdf.com',
//   password: '123password123'
// });

// me.save()
//   .then(() => console.log(me))
//   .catch(error => console.log('Error', error));

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const firstTask = new Task({
  description: '    gogogo'
});

firstTask
  .save()
  .then(() => console.log('Save!'))
  .catch(error => console.log(error));

require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

// User.findByIdAndUpdate('5d1aed21c2c989598d91696c', { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeAndCount('5d1aed21c2c989598d91696c', 2)
//   .then(count => console.log(count))
//   .catch(e => console.log(e));

// Task.findByIdAndDelete('5d1b252b86a03331dabc584b')
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('5d1b256d3fc4cb327bc28a78')
  .then(res => console.log(res))
  .catch(e => console.log(e));

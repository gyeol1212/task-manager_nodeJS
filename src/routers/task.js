const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(e => res.status(400).send(e));
  console.log(task);
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.send(500).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const { id: _id } = req.params;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const {
    params: { id },
    body
  } = req;

  const updates = Object.keys(body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

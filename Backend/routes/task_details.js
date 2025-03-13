const express = require('express');
const router = express.Router();
const connection = require('../db.js');

// Middleware to connect to the database
router.use((req, res, next) => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      res.status(500).send('Database connection error');
      return;
    }
    next();
  });
});

// Route to insert a new task
router.post('/add', (req, res) => {
  const { task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status } = req.body;
  const insertQuery = `INSERT INTO task (task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const taskData = [task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status];

  connection.query(insertQuery, taskData, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.status(500).send({error:'Error inserting data'});
      return;
    }
    res.status(201).send({message:'Task Added Suceesfully'});
  });
});

// Route to get all tasks
router.get('/view', (req, res) => {
  const selectQuery = 'SELECT * FROM task';
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results);
  });
});

// Route to update the tasks
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status } = req.body;
  const updateQuery = `UPDATE task SET task_owner = ?, task_name = ?, task_detail = ?, start_date = ?, end_date = ?, reminder = ?, priority = ?, status = ? WHERE task_id = ?`;
  const taskData = [task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status, id];

  connection.query(updateQuery, taskData, (err, results) => {
    if (err) {
      console.error('Error updating data:', err.stack);
      res.status(500).send('Error updating data');
      return;
    }
    res.status(200).send('Task updated successfully');
  });
});

// // Route to delete the tasks
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM task WHERE task_id = ?`;

  connection.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err.stack);
      res.status(500).send('Error deleting data');
      return;
    }
    res.status(200).send('Task deleted successfully');
  });
});

module.exports = router;

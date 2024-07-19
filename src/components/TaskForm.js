import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', completed: false });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.id) {
      updateTask(task);
    } else {
      addTask({ ...task, id: Date.now() });
    }
    setTask({ title: '', description: '', dueDate: '', priority: 'Low', completed: false });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={task.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control as="select" name="priority" value={task.priority} onChange={handleChange} required>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="Completed" name="completed" checked={task.completed} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        Save Task
      </Button>
    </Form>
  );
};

export default TaskForm;

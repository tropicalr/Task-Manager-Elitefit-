import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShow(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setShow(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#CCE5FF', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Row>
          <Col className="text-center my-4">
            <h1>Task Manager</h1>
            <Button variant="primary" onClick={() => setShow(true)}>Add New Task</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <TaskList tasks={tasks} setEditingTask={setEditingTask} deleteTask={deleteTask} />
          </Col>
        </Row>

        <Modal show={show || editingTask} onHide={() => { setShow(false); setEditingTask(null); }}>
          <Modal.Header closeButton>
            <Modal.Title>{editingTask ? 'Edit Task' : 'Add New Task'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm addTask={addTask} editingTask={editingTask} updateTask={updateTask} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default App;

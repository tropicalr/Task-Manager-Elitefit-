import React, { useState } from 'react';
import { Card, Button, Form, Badge } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css'; // Import custom CSS file

const TaskList = ({ tasks, setEditingTask, deleteTask }) => {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [completionFilter, setCompletionFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCompletion = 
      completionFilter === 'all' || 
      (completionFilter === 'completed' && task.completed) || 
      (completionFilter === 'pending' && !task.completed);
    return matchesSearch && matchesPriority && matchesCompletion;
  });

  const now = new Date();
  const upcomingTasks = filteredTasks.filter(task => new Date(task.dueDate) >= now && !task.completed);
  const overdueTasks = filteredTasks.filter(task => new Date(task.dueDate) < now && !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const renderTaskList = (tasks, title, badgeVariant) => (
    <>
      <h4>{title} <Badge variant={badgeVariant}>{tasks.length}</Badge></h4>
      <TransitionGroup>
        {tasks.map(task => (
          <CSSTransition key={task.id} timeout={500} classNames="task">
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                  {task.title} <small className="text-muted">({task.priority})</small>
                </Card.Title>
                <Card.Text>
                  {task.description}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">Due: {task.dueDate}</small>
                </Card.Text>
                <Button variant="primary" className="mr-2" onClick={() => setEditingTask(task)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );

  return (
    <div>
      <Form.Control 
        type="text" 
        placeholder="Search tasks..." 
        className="mb-3" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <Form.Group>
        <Form.Label className="bold-label">Filter by Priority</Form.Label>
        <Form.Control 
          as="select" 
          className="mb-3" 
          value={priorityFilter} 
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className="bold-label">Filter by Completion Status</Form.Label>
        <Form.Control 
          as="select" 
          className="mb-3" 
          value={completionFilter} 
          onChange={(e) => setCompletionFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </Form.Control>
      </Form.Group>
      {renderTaskList(upcomingTasks, 'Upcoming Tasks', 'info')}
      {renderTaskList(overdueTasks, 'Overdue Tasks', 'danger')}
      {renderTaskList(completedTasks, 'Completed Tasks', 'success')}
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Adds a new task to the list
  const addTask = () => {
    if (task.trim()) {
      const newTask = { id: Date.now().toString(), title: task.trim(), completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTask('');
    }
  };

  // Toggles the completion status of a task
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Deletes a task
  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1513735718075-2e2d37cb7cc1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxpZ2h0aG91c2V8ZW58MHx8MHx8fDA%3D')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>My ToDo</h1>

      {/* Task List */}
      <div
        className="task-list"
        style={{
          height: '60vh',
          overflowY: 'auto',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <div
              key={t.id}
              className="task-item d-flex align-items-center justify-content-between"
              style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                color: '#000',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <div className="d-flex align-items-center flex-grow-1">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTaskCompletion(t.id)}
                  style={{ marginRight: '10px' }}
                />
                <h5 style={{ textDecoration: t.completed ? 'line-through' : 'none', margin: 0 }}>
                  {t.title}
                </h5>
              </div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleDelete(t.id)}
                style={{ marginLeft: '10px' }}
              >
                <i className="fa-solid fa-trash fa-lg" />
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'white' }}>
            No tasks available. Start by adding a task!
          </p>
        )}
      </div>

      {/* Task Input */}
      <div
        className="input-group"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px',
          gap: '10px',
        }}
      >
        <input
          type="text"
          value={task}
          className="form-control"
          placeholder="Add Your Daily Task"
          onChange={(e) => setTask(e.target.value)}
          style={{
            borderRadius: '10px',
            flex: '1',
            padding: '10px',
            border: 'none',
            color: '#000',
          }}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={addTask}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          Add
        </button>
      </div>

      {/* Task Count Badge */}
      <div
        className="badge d-flex justify-content-center mt-3"
        style={{
          marginTop: '10px',
          color: 'white',
          fontSize: '1rem',
        }}
      >
        You Have: {tasks.length === 0 ? 'no tasks' : `${tasks.length} task(s)`}
      </div>
    </div>
  );
}

export default App;

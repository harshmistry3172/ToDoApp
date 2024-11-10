import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing a task
  const [editTaskId, setEditTaskId] = useState(null); // Store the ID of the task being edited
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskPriority, setEditTaskPriority] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.userId;

          axios
            .get('https://todoapp-7zyq4d4s.b4a.run/api/users/user', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              setUserEmail(response.data.email);
            })
            .catch((error) => {
              console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
        } catch (error) {
          console.error('Invalid token', error);
        }
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://todoapp-7zyq4d4s.b4a.run/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserEmail();
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await axios.post(
        'https://todoapp-7zyq4d4s.b4a.run/api/tasks',
        { task: newTask, priority },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
      setPriority('Medium');
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (taskId, completed, taskPriority, taskText) => {
    try {
      const response = await axios.put(
        `https://todoapp-7zyq4d4s.b4a.run/api/tasks/${taskId}`,
        { text: taskText, completed, priority: taskPriority },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };
  

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://todoapp-7zyq4d4s.b4a.run/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task._id);
    setEditTaskText(task.text);
    setEditTaskPriority(task.priority);
  };

  const saveEdit = () => {
    if (editTaskText && editTaskPriority) {
      updateTask(editTaskId, false, editTaskPriority, editTaskText); // Assuming the task is not yet completed
      setIsEditing(false);
      setEditTaskId(null);
      setEditTaskText('');
      setEditTaskPriority('');
    } else {
      console.error("Task text or priority cannot be empty.");
    }
  };

    const logout = () => {
      localStorage.removeItem('authToken');
      navigate('/login');
    };

  return (
    <div
      style={{
        maxWidth: '50%',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        justifyContent: 'space-evenly'
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', marginBottom: '1.5rem' }}>Your Tasks</h2>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        {userEmail && (
          <div style={{ fontSize: '16px', color: '#333', marginRight: '1rem' }}>
            <p>Logged in as: {userEmail}</p>
          </div>
        )}
        <button
          onClick={logout}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            color: '#fff',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Task input and priority selection */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{
            width: '70%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            width: '25%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        onClick={addTask}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}
      >
        Add Task
      </button>

      {/* Task list */}
      <ul style={{ listStyleType: 'none', padding: '0', marginTop: '1.5rem' }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '0.75rem',
              marginBottom: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task._id, e.target.checked, task.priority, task.text)}
              style={{ boxSizing: '10%' }}
            />

            <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </div>
            
            <select
              value={task.priority}
              onChange={(e) => updateTask(task._id, task.completed, e.target.value, task.text)}
              style={{
                padding: '5px',
                fontSize: '14px',
                marginRight: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginLeft: '15%'
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
  <button
    onClick={() => startEdit(task)}
    style={{
      backgroundColor: '#ffc107',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginRight: '10px',  // Add some space between buttons
    }}
  >
    Edit
  </button>
  
  <button
    onClick={() => deleteTask(task._id)}
    style={{
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '5px',
    }}
  >
    Delete
  </button>
</div>

          </li>
        ))}
      </ul>

      {/* Edit task modal */}
      {isEditing && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '500px',
            }}
          >
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={saveEdit}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: '#28a745',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: '#dc3545',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

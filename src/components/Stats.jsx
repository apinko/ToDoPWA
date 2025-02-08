import React from 'react';
import { useState, useEffect } from 'react';

function Stats() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div>
      <h2>Statystyki</h2>
      <p>Ukończone zadania: {completedTasks}</p>
      <p>Nieukończone zadania: {pendingTasks}</p>
    </div>
  );
}

export default Stats;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openDB } from 'idb';
import Header from './components/Header';
import AddNewTaskForm from './components/AddNewTaskForm';
import TaskList from './components/TaskList';
import ConnectionStatus from './components/ConnectionStatus';

// ✅ Sprawdź, czy masz plik Statistics.jsx w components
import Statistics from './components/Statistics'; 

function App() {
  const [taskList, setTaskList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const openDatabase = async () => {
    const db = await openDB('mytodo', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('mytodo_tasks')) {
          db.createObjectStore('mytodo_tasks', { keyPath: 'id' });
        }
      },
    });
    return db;
  };

  const fetchTaskList = async () => {
    const db = await openDatabase();
    const tasksFromIDB = await db.getAll('mytodo_tasks');
    setTaskList(tasksFromIDB);
  };

  const addNewTask = async (newTask) => {
    const db = await openDatabase();
    await db.add('mytodo_tasks', newTask);
    fetchTaskList();
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <Router>
      <div className='flex m-auto h-screen'>
        <div className='relative flex flex-1 flex-col bg-teal-800 text-white items-center p-4'>
          <ConnectionStatus />
          <Header /> {/* Dodaje linki nawigacyjne */}
          <Routes>
            <Route path="/" element={<TaskList taskList={taskList} setEditingTask={setEditingTask} />} />
            <Route path="/add" element={<AddNewTaskForm addNewTask={addNewTask} />} />
            {/* Sprawdź, czy plik Statistics.jsx istnieje */}
            <Route path="/stats" element={<Statistics taskList={taskList} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
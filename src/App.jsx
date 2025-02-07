import { useEffect, useState } from 'react'
import { openDB } from 'idb'
import Header from './components/Header'
import AddNewTaskForm from './components/AddNewTaskForm'
import TaskList from './components/TaskList'
import NewTaskFormBtn from './components/NewTaskFormBtn'
import ConnectionStatus from './components/ConnectionStatus' // Importujemy status połączenia

function App() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [editingTask, setEditingTask] = useState(null); // Zadanie do edycji

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

  const deleteTask = async (id) => {
    const db = await openDatabase();
    await db.delete('mytodo_tasks', id);
    fetchTaskList(); 
  };

  const updateTask = async (updatedTask) => {
    const db = await openDatabase();
    await db.put('mytodo_tasks', updatedTask);
    setEditingTask(null);
    fetchTaskList();
  };

  const confirmDelete = (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
        deleteTask(id);
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  // Dodano useEffect, aby wykrywać nową wersję Service Workera i wymuszać odświeżenie
  // Jeśli Service Worker znajdzie nową wersję, użytkownik zobaczy komunikat z prośbą o odświeżenie strony
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
          registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      if (confirm("Nowa wersja dostępna! Odświeżyć stronę?")) {
                          window.location.reload();
                      }
                  }
              });
          });
      });
    }
  }, []);

  return (
    <div className='flex m-auto h-screen'>
      <div className='relative flex flex-1 flex-col bg-teal-800 text-white items-center p-4'>
        <ConnectionStatus /> {/* Poprawione – status połączenia nie jest już fixed */}
        <Header />
        {showNewTaskForm && <AddNewTaskForm addNewTask={addNewTask} setShowNewTaskForm={setShowNewTaskForm}/>} 
        <NewTaskFormBtn showNewTaskForm={showNewTaskForm} setShowNewTaskForm={setShowNewTaskForm}/>     
        { !showNewTaskForm && <TaskList taskList={taskList} deleteTask={deleteTask} setEditingTask={setEditingTask} updateTask={updateTask} editingTask={editingTask} />}
      </div>
    </div>
  )
}

export default App

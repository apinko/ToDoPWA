import { useEffect, useState } from 'react'
import { openDB } from 'idb'
import Header from './components/Header'
import AddNewTaskForm from './components/AddNewTaskForm'
import TaskList from './components/TaskList'
import NewTaskFormBtn from './components/NewTaskFormBtn'

function App() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [taskList, setTaskList] = useState([])

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

  useEffect(() => {
    fetchTaskList(); 
  }, []);

  return (
    <div className='flex m-auto overflow-y-auto h-screen'>
      <div className='relative flex flex-1 overflow-y-auto flex-col bg-teal-800 text-white items-center'>
      <Header />
      {showNewTaskForm && <AddNewTaskForm addNewTask={addNewTask} setShowNewTaskForm={setShowNewTaskForm}/>}
      <NewTaskFormBtn showNewTaskForm={showNewTaskForm} setShowNewTaskForm={setShowNewTaskForm}/>     
      { !showNewTaskForm && <TaskList taskList={taskList} deleteTask={deleteTask} />}
      </div>
    </div>
  )
}

export default App

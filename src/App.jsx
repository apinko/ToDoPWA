// src/App.jsx
import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Statistics from './components/Statistics';
import ConnectionStatus from './components/ConnectionStatus'; // Przywrócenie statusu połączenia

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
    setTaskList(tasksFromIDB || []);
  };

  const addNewTask = async (newTask) => {
    const db = await openDatabase();
    await db.add('mytodo_tasks', newTask);
    fetchTaskList(); // Odświeżenie listy
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

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <div className="min-h-screen bg-teal-800 text-white flex flex-col items-center p-4 w-full">
      <ConnectionStatus />
      
      <div className="bg-yellow-700 text-white px-6 py-4 rounded-lg shadow-md w-full max-w-6xl flex flex-col items-start">
        <h1 className="text-3xl font-bold text-yellow-300">My ToDo List</h1>
        <div className="flex justify-center gap-12 text-xl mt-3 w-full">
          <Link to="/" className="px-4">📋 Lista</Link>
          <Link to="/add" className="px-4">➕ Dodaj</Link>
          <Link to="/stats" className="px-4">📊 Statystyki</Link>
        </div>
      </div>

      <div className="w-full max-w-6xl mt-4">
        <Routes>
          <Route path="/" element={
            <TaskList 
              taskList={taskList} 
              deleteTask={deleteTask} 
              setEditingTask={setEditingTask} 
              updateTask={updateTask} 
              editingTask={editingTask}
            />
          } />
          <Route path="/add" element={<AddTask addNewTask={addNewTask} />} />
          <Route path="/stats" element={<Statistics taskList={taskList} />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;






// import { useEffect, useState } from 'react'
// import { openDB } from 'idb'
// import Header from './components/Header'
// import AddNewTaskForm from './components/AddNewTaskForm'
// import ConnectionStatus from './components/ConnectionStatus' // Importujemy status połączenia
// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom'; // Dodanie React Router do projektu
// import TaskList from './components/TaskList'


// const AddTask = () => <div><h2>Dodaj zadanie</h2></div>;
// const Statistics = () => <div><h2>Statystyki</h2></div>;

// function App() {
// //   const [showNewTaskForm, setShowNewTaskForm] = useState(false)
// //   const [taskList, setTaskList] = useState([])
// //   const [editingTask, setEditingTask] = useState(null); // Zadanie do edycji

// //   const openDatabase = async () => {
// //     const db = await openDB('mytodo', 1, {
// //       upgrade(db) {
// //         if (!db.objectStoreNames.contains('mytodo_tasks')) {
// //           db.createObjectStore('mytodo_tasks', { keyPath: 'id' });
// //         }
// //       },
// //     });
// //     return db;
// //   };

// //   const fetchTaskList = async () => {
// //     const db = await openDatabase();
// //     const tasksFromIDB = await db.getAll('mytodo_tasks');
// //     setTaskList(tasksFromIDB);
// //   };

// //   const addNewTask = async (newTask) => {
// //     const db = await openDatabase();
// //     await db.add('mytodo_tasks', newTask);
// //     fetchTaskList();
// //   };

// //   const deleteTask = async (id) => {
// //     const db = await openDatabase();
// //     await db.delete('mytodo_tasks', id);
// //     fetchTaskList(); 
// //   };

// //   const updateTask = async (updatedTask) => {
// //     const db = await openDatabase();
// //     await db.put('mytodo_tasks', updatedTask);
// //     setEditingTask(null);
// //     fetchTaskList();
// //   };

// //   const confirmDelete = (id) => {
// //     if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
// //         deleteTask(id);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTaskList();
// //   }, []);

// //   // Dodano useEffect, aby wykrywać nową wersję Service Workera i wymuszać odświeżenie
// //   useEffect(() => {
// //     if ("serviceWorker" in navigator) {
// //         navigator.serviceWorker.register("/sw.js").then((registration) => {
// //             registration.addEventListener("updatefound", () => {
// //                 const newWorker = registration.installing;
// //                 newWorker.addEventListener("statechange", () => {
// //                     if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
// //                         console.log("Nowa wersja dostępna – odświeżam stronę...");
// //                         window.location.reload(); // 🚀 Odświeżenie w tle, bez alertu!
// //                     }
// //                 });
// //             });
// //         });

// //         //  Unikamy zapętlenia reloadów
// //         let reloaded = false;
// //         navigator.serviceWorker.addEventListener("controllerchange", () => {
// //             if (!reloaded) {
// //                 console.log("Service Worker zaktualizowany, przeładowuję stronę...");
// //                 reloaded = true;
// //                 window.location.reload();
// //             }
// //         });
// //     }
// // }, []);

//   return (
//     // <div className='flex m-auto h-screen'>
//     //   <div className='relative flex flex-1 flex-col bg-teal-800 text-white items-center p-4'>
//     //     <ConnectionStatus /> {/* Poprawione – status połączenia nie jest już fixed */}
//     //     <Header />
//     //     {showNewTaskForm && <AddNewTaskForm addNewTask={addNewTask} setShowNewTaskForm={setShowNewTaskForm}/>} 
//     //     { !showNewTaskForm && <TaskList taskList={taskList} deleteTask={deleteTask} setEditingTask={setEditingTask} updateTask={updateTask} editingTask={editingTask} setShowNewTaskForm={setShowNewTaskForm} />}
//     //   </div>
//     // </div>

// <div>
// <nav>
//   <Link to="/">Lista</Link> | 
//   <Link to="/add">Dodaj</Link> | 
//   <Link to="/stats">Statystyki</Link>
// </nav>
// <Routes>
//   <Route path="/" element={<TaskList />} />
//   <Route path="/add" element={<AddTask />} />
//   <Route path="/stats" element={<Statistics />} />
// </Routes>
// </div>
//   )
// }

// export default App

<<<<<<< HEAD
=======

>>>>>>> apinko_version3.2
import { useEffect, useState } from "react";
import { openDB } from "idb";
import { Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Statistics from "./components/Statistics";
import ConnectionStatus from "./components/ConnectionStatus";

const channel = new BroadcastChannel("todo_sync");

<<<<<<< HEAD
// 📳 Funkcja uruchamiająca wibrację (Android + iPhone Haptic Engine)
function triggerHapticFeedback(type = "light") {
    if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]); // 📳 Wibracja na Androidzie
    } else if (window?.webkit?.messageHandlers?.impactOccurred) {
        // 📳 iPhone Haptic Engine
        try {
            window.webkit.messageHandlers.impactOccurred.postMessage({ style: type });
        } catch (err) {
            console.warn("⚠ Brak wsparcia dla Haptic Feedback na iOS", err);
        }
    }
}
=======
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { openDB } from 'idb';
// import Header from './components/Header';
// import AddNewTaskForm from './components/AddNewTaskForm';
// import TaskList from './components/TaskList';
// import ConnectionStatus from './components/ConnectionStatus';

// // ✅ Sprawdź, czy masz plik Statistics.jsx w components
// import Statistics from './components/Statistics'; 

>>>>>>> apinko_version3.2

function App() {
  const [taskList, setTaskList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // 🔄 Pobieranie listy zadań z IndexedDB
  useEffect(() => {
    fetchTaskList();

    // Nasłuchiwanie zmian w innych zakładkach (synchronizacja)
    channel.onmessage = (event) => {
      if (event.data === "update_tasks") {
        console.log("🔄 Otrzymano update_tasks - odświeżanie listy");
        fetchTaskList();
      }
    };
  }, []);

<<<<<<< HEAD
  // ✅ Rejestracja Service Workera, obsługa powiadomień i wibracji
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => {
          console.log("✅ Service Worker zarejestrowany:", reg);

          if (reg.active) {
            // 📌 Nasłuchiwanie zamknięcia powiadomień (obsługa wibracji)
            navigator.serviceWorker.addEventListener("notificationclose", (event) => {
              console.log("🔕 Powiadomienie zamknięte:", event.notification);
              triggerHapticFeedback("medium"); // 📳 Uruchom wibrację po zamknięciu powiadomienia
            });
          }
        })
=======
  // ✅ Rejestracja Service Workera i sprawdzenie powiadomień
  useEffect(() => {
    // Rejestracja Service Workera
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("✅ Service Worker zarejestrowany:", reg))
>>>>>>> apinko_version3.2
        .catch((err) => console.error("❌ Błąd rejestracji SW:", err));
    }

    // Sprawdzenie uprawnień do powiadomień
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("🔔 Status powiadomień:", permission);
      });
    }
  }, []);

  // 🔹 Funkcja otwierająca bazę danych IndexedDB
  const openDatabase = async () => {
    const db = await openDB("mytodo", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("mytodo_tasks")) {
          db.createObjectStore("mytodo_tasks", { keyPath: "id" });
        }
      },
    });
    return db;
  };

  // 🔹 Pobieranie zadań z IndexedDB
  const fetchTaskList = async () => {
    const db = await openDatabase();
    const tasksFromIDB = await db.getAll("mytodo_tasks");
    setTaskList(tasksFromIDB || []);
  };

  // 🔹 Dodawanie nowego zadania
  const addNewTask = async (newTask) => {
    const db = await openDatabase();
    await db.add("mytodo_tasks", newTask);
    fetchTaskList(); // Odświeżenie listy
    channel.postMessage("update_tasks"); // Powiadomienie innych okien
  };

  // 🔹 Usuwanie zadania
  const deleteTask = async (id) => {
    const db = await openDatabase();
    await db.delete("mytodo_tasks", id);
    fetchTaskList();
    channel.postMessage("update_tasks"); // Powiadomienie innych okien
  };

  // 🔹 Aktualizacja zadania
  const updateTask = async (updatedTask) => {
    const db = await openDatabase();
    await db.put("mytodo_tasks", updatedTask);
    setEditingTask(null);
    fetchTaskList();
    channel.postMessage("update_tasks"); // Powiadomienie innych okien
  };

  return (
    <div className="min-h-screen bg-teal-800 text-white flex flex-col items-center p-4 w-full relative">
      <div className="bg-yellow-700 text-white px-6 py-4 rounded-lg shadow-md w-full max-w-6xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-yellow-300">My ToDo List</h1>
          </div>
          <div>
            <ConnectionStatus />
          </div>
        </div>
        <div className="flex justify-center gap-12 text-xl mt-3">
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
<<<<<<< HEAD
=======

  // useEffect(() => {
  //   fetchTaskList();
  // }, []);

  // return (
  //   <Router>
  //     <div className='flex m-auto h-screen'>
  //       <div className='relative flex flex-1 flex-col bg-teal-800 text-white items-center p-4'>
  //         <ConnectionStatus />
  //         <Header /> {/* Dodaje linki nawigacyjne */}
  //         <Routes>
  //           <Route path="/" element={<TaskList taskList={taskList} setEditingTask={setEditingTask} />} />
  //           <Route path="/add" element={<AddNewTaskForm addNewTask={addNewTask} />} />
  //           {/* Sprawdź, czy plik Statistics.jsx istnieje */}
  //           <Route path="/stats" element={<Statistics taskList={taskList} />} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </Router>
  
>>>>>>> apinko_version3.2
  );
}

export default App;
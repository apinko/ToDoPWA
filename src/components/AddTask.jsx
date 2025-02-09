// src/components/AddTask.jsx
import { useState } from "react";

const channel = new BroadcastChannel("todo_sync");

export default function AddTask({ addNewTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("bg-yellow-300"); // Domyślnie żółty

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (taskName.trim().length < 3) {
      alert("Nazwa zadania musi mieć co najmniej 3 znaki.");
      return;
    }
    
    console.log("📌 handleSubmit() - Dodawanie zadania...");

    let newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      deadline,
      priority: { color: priority },
      note: "", // Pole na dodatkowe informacje
    };

    channel.postMessage("update_tasks"); // 🔄 Powiadomienie innych okien o zmianie
    addNewTask(newTask);

    setTaskName("");
    setTaskDescription("");
    setDeadline("");
    setPriority("bg-yellow-300");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Dodaj nowe zadanie</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nazwa zadania (min. 3 znaki)"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="p-2 border rounded text-black bg-white"
          required
        />
        <textarea
          placeholder="Opis zadania (opcjonalnie)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="p-2 border rounded text-black bg-white"
        />
        
        <div className="flex items-center gap-2">
        <span >📅</span>
        <input
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    className="p-2 border rounded text-black bg-white w-40 appearance-none"
  />
</div>

        <div>
          <label className="block mb-1 font-semibold">Priorytet:</label>
          <div className="flex gap-2">
            <buttonf
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-red-500" ? "ring-2 ring-black" : ""} bg-red-500`}
              onClick={() => setPriority("bg-red-500")}
            ></buttonf>
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-yellow-300" ? "ring-2 ring-black" : ""} bg-yellow-300`}
              onClick={() => setPriority("bg-yellow-300")}
            ></button>
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-green-500" ? "ring-2 ring-black" : ""} bg-green-500`}
              onClick={() => setPriority("bg-green-500")}
            ></button>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Dodaj
        </button>
      </form>
    </div>
  );
}

// src/components/AddTask.jsx
import { useState } from "react";

export default function AddTask({ addNewTask }) {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("bg-yellow-300"); // Domyślnie żółty

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(), // Unikalne ID
      name: taskName,
      deadline,
      priority: { color: priority }, // Priorytet
    };

    addNewTask(newTask);
    setTaskName("");
    setDeadline("");
    setPriority("bg-yellow-300"); // Reset do domyślnego koloru
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Dodaj nowe zadanie</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nazwa zadania"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="p-2 border rounded text-black bg-white"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 border rounded text-black bg-white"
        />

        {/* Wybór priorytetu */}
        <div>
          <label className="block mb-1 font-semibold">Priorytet:</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-red-500" ? "ring-2 ring-black" : ""} bg-red-500`}
              onClick={() => setPriority("bg-red-500")}
            ></button>
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
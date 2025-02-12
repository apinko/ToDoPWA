// src/components/Statistics.jsx
import React from "react";

export default function Statistics({ taskList }) {
  const totalTasks = taskList.length;
  const tasksWithDeadline = taskList.filter((task) => task.deadline).length;
  const tasksWithoutDeadline = totalTasks - tasksWithDeadline;

  const countByPriority = (color) =>
    taskList.filter((task) => task.priority.color === color).length;

  return (
<div className="p-4">
  <div className="bg-white p-4 rounded shadow-md text-black">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Statystyki zadań</h2>

    <p><strong>Łączna liczba zadań:</strong> {totalTasks}</p>
    <p><strong>Zadania z deadline:</strong> {tasksWithDeadline}</p>
    <p><strong>Zadania bez deadline:</strong> {tasksWithoutDeadline}</p>
    <div className="mt-4">
      <h3 className="text-lg font-bold text-gray-800">Podział według priorytetu:</h3>
      <p className="text-red-500">🔴 Wysoki: {countByPriority("bg-red-500")}</p>
      <p className="text-yellow-500">🟡 Średni: {countByPriority("bg-yellow-300")}</p>
      <p className="text-green-500">🟢 Niski: {countByPriority("bg-green-500")}</p>
    </div>
  </div>
</div>
  );
}


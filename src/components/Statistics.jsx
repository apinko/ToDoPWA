export default function Statistics({ taskList }) {
    const completedTasks = taskList.filter(task => task.completed).length;
    const totalTasks = taskList.length;
  
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">📊 Statystyki</h2>
        <p>Ukończone zadania: {completedTasks} / {totalTasks}</p>
      </div>
    );
  }
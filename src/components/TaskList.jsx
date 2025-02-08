import { useState } from 'react';

export default function TaskList({ taskList, deleteTask, setEditingTask, updateTask, editingTask }) {
    const [taskToDelete, setTaskToDelete] = useState(null);
    
    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
    };
    
    const confirmDelete = () => {
        deleteTask(taskToDelete.id);
        setTaskToDelete(null);
    };

    const closeModal = () => {
        setTaskToDelete(null);
    };
    
    return (
        <div className='relative w-full flex flex-wrap h-screen overflow-y-auto justify-around gap-4 p-4 pb-24'>
            {taskList.map(item => (
                <div key={item.id} className={`relative flex flex-col justify-center items-start w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-2 p-4 h-auto ${item.priority.color} hover:opacity-75 rounded-lg shadow-md`}>
                    {/* Ikony edycji i usuwania w prawym górnym rogu */}
                    <div className="absolute top-2 right-2 flex gap-1">
                        <button onClick={() => setEditingTask(item)} className="text-blue-400 text-sm">✏️</button>
                        <button onClick={() => handleDeleteClick(item)} className="text-red-400 text-sm">🗑️</button>
                    </div>
                    {editingTask && editingTask.id === item.id ? (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateTask(editingTask);
                        }} className="w-full flex flex-col items-start">
                            <input 
                                className="w-full p-1 border border-gray-300 bg-white text-black text-sm"
                                value={editingTask.name} 
                                onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })} 
                            />
                            <div className="flex gap-1 mt-1">
                                <button type="submit" className="bg-blue-500 text-white px-2 py-1 text-xs rounded">💾</button>
                                <button type="button" onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-2 py-1 text-xs rounded">❌</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-lg font-bold">{item.name}</h2>
                            {item.deadline && <p className="text-sm text-gray-400">Deadline: {item.deadline}</p>}
                        </>
                    )}
                </div>
            ))}

            {/* Modal do potwierdzenia usunięcia */}
            {taskToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md w-80 text-center">
                        <h3 className="text-lg font-bold mb-4">Czy na pewno chcesz usunąć?</h3>
                        <p className="text-gray-600">{taskToDelete.name}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Anuluj</button>
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Usuń</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
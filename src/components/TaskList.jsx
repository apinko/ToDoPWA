/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function TaskList({ taskList, deleteTask, setEditingTask, updateTask, editingTask }) {
    
    const confirmDelete = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
            deleteTask(id);
        }
    };
    
    return (
        <div className='w-full flex flex-wrap h-screen overflow-y-auto justify-around space-y-2'>
            {taskList.map(item => (
                <div key={item.id} className={`relative flex flex-col justify-center items-start w-[40%] mt-2 p-2 h-[15%] ${item.priority.color} hover:opacity-75`}>
                    {/* Ikony edycji i usuwania w prawym górnym rogu */}
                    <div className="absolute top-2 right-2 flex gap-1">
                        <button onClick={() => setEditingTask(item)} className="text-blue-400 text-sm">✏️</button>
                        <button onClick={() => confirmDelete(item.id)} className="text-red-400 text-sm">🗑️</button>
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
                                <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-2 py-1 text-xs rounded">❌</button>
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
        </div>
    );
}

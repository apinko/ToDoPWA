/* eslint-disable react/prop-types */
import { useState } from "react"

export default function AddNewTaskForm({addNewTask, setShowNewTaskForm}) {
    const defaultPriority = {name: "Medium", color: "bg-yellow-400"}
    const [newTaskName, setNewTaskName] = useState('')
    const [deadline, setDeadline] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState(defaultPriority)
    const [activeDeadline, setActiveDeadline] = useState(false)

    const handleAddNewTask = async () => {
        if(newTaskName.length >= 3) {
        await addNewTask({id: Date.now(), name: newTaskName, deadline, priority: newTaskPriority})
        setNewTaskName('')
        setActiveDeadline(false)
        setDeadline('')
        setNewTaskPriority(defaultPriority)
        setShowNewTaskForm(false)
        }
    }
  return (
    <div className='flex flex-col items-center'>
      <input className='mt-2 mb-3 px-2 py-1 bg-inherit text-inherit placeholder-white text-center border-2 border-white' placeholder='New task ...' value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
      <div className='flex-row'>
        <input type="checkbox" value={activeDeadline} onClick={() => setActiveDeadline(!activeDeadline)}/>
      <label htmlFor="deadline">Set deadline: </label>
      <input className='px-2 py-1 bg-inherit border-2 border-white' id='deadline' type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} disabled={!activeDeadline} />
      </div>
      <div className="flex flex-row mt-2">
        <div> Set priority: </div>
        <div className={`w-6 h-6 m-1 cursor-pointer bg-rose-500 border-2 ${ newTaskPriority.name === "Critical" ? 'border-black' : 'border-white opacity-50'} rounded-full`} title='Critical' onClick={(e) => setNewTaskPriority({name: e.target.title, color: 'bg-rose-500'})}></div>
        <div className={`w-6 h-6 m-1 cursor-pointer bg-orange-400 border-2 ${ newTaskPriority.name === "High" ? 'border-black' : 'border-white opacity-50'} rounded-full`} title='High' onClick={(e) => setNewTaskPriority({name: e.target.title, color: 'bg-orange-400'})}></div>
        <div className={`w-6 h-6 m-1 cursor-pointer bg-yellow-400 border-2 ${ newTaskPriority.name === "Medium" ? 'border-black' : 'border-white opacity-50'} rounded-full`} title='Medium' onClick={(e) => setNewTaskPriority({name: e.target.title, color: 'bg-yellow-400'})}></div>
        <div className={`w-6 h-6 m-1 cursor-pointer bg-green-400 border-2 ${ newTaskPriority.name === "Low" ? 'border-black' : 'border-white opacity-50'} rounded-full`} title='Low' onClick={(e) => setNewTaskPriority({name: e.target.title, color: 'bg-green-400'})}></div>
        <div className={`w-6 h-6 m-1 cursor-pointer bg-blue-400 border-2 ${ newTaskPriority.name === "Optional" ? 'border-black' : 'border-white opacity-50'} rounded-full`} title='Optional' onClick={(e) => setNewTaskPriority({name: e.target.title, color: 'bg-blue-400'})}></div>
      </div>
      <button className='bg-white text-teal-800 my-5 px-3 py-2 hover:bg-teal-500 hover:text-white rounded' onClick={handleAddNewTask}>Add</button>
      </div>
  )
}

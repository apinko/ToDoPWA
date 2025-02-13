/* eslint-disable react/prop-types */
export default function NewTaskFormBtn({showNewTaskForm, setShowNewTaskForm}) {
  return (
    <button className='absolute left-[85%] bottom-0 bg-white text-teal-800 font-bold my-4 py-2 px-3 rounded-md hover:bg-teal-500 hover:text-white border-teal-800 border-2' onClick={() => setShowNewTaskForm(!showNewTaskForm)}>{showNewTaskForm ? 'X' : '+'}</button>
  )
}

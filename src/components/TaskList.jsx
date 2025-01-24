/* eslint-disable react/prop-types */
export default function TaskList({taskList, deleteTask}) {
  return (
    <div className='w-full flex flex-wrap h-screen overflow-y-auto justify-around space-y-2'>
        {taskList.map(item => <div key={item.id} className={`flex flex-col justify-center items-center w-[40%] mt-2 p-1 h-[15%] ${item.priority.color} hover:cursor-pointer hover:opacity-75`} onClick={() => deleteTask(item.id)}>
          <h2>{item.name}</h2>
          {item.deadline && <p>Deadline: {item.deadline}</p>}
        </div>)}
      </div>
  )
}

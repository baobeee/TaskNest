import React from 'react'
import TaskEmptyState from './TaskEmptyState'
import TaskCard from './TaskCard'

const TaskList = () => {
  let filter = 'all'
  const filteredTask = [
    {
      _id: "1",
      title: "Learn ReactJS",
      status: "active",
      completedAt: null,
      createdAt: new Date()
    },
    {
      _id: "2",
      title: "Learn JavaScript",
      status: "completed",
      completedAt: new Date(),
      createdAt: new Date()
    }
  ]

  // Check valid
  if(!filteredTask || filteredTask.length === 0){
    //trả về empty page nếu ko có dữ liệu
    return <TaskEmptyState filter={filter}></TaskEmptyState>
  }
  return (
    <div className='space-y-3'>
      {filteredTask.map((task, index)=>(
        
        <TaskCard 
        //nếu _id ko tồn tại thì lấy index
          key={task._id ?? index}
          task={task}
          index={index}
        />
      ))}
    </div>
  )
}

export default TaskList
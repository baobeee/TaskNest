import React from 'react'
import TaskEmptyState from './TaskEmptyState'
import TaskCard from './TaskCard'

const TaskList = ({filteredTask, filter}) => {

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
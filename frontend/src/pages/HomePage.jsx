import { AddTask } from '@/components/AddTask'
import DateTime from '@/components/DateTime'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const HomePage = () => {

  //gom dữ liêu lại mới xử lý taskList
  const [taskBuffer, settaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)
  const [filter, setFilter] = useState("all")

  //theo dõi state
  //chạy 1 lần duy nhất khi trong deps là mảng rỗng
  useEffect(()=>{
    fetchTask()
  }, []);

  //lấy ds nhiệm vụ
  const fetchTask = async ()=>{
    try {
      const res = await api.get('/tasks')
      settaskBuffer(res.data.tasks)

      //lấy số lượng của 2 trạng thái công việc đang làm/hoàn thành
      setActiveTaskCount(res.data.activeCount)
      setCompleteTaskCount(res.data.completedCount)
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất Tasks: ", error)
      toast.error("Lỗi xảy ra khi truy xuất Tasks.")
    }
  } 

  //gọi lại fetchTask
  const handleTaskChanged = ()=>{
    fetchTask()
  } 

  // arr lưu ds nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task)=>{
    switch (filter) {
      case 'active':
        return task.status === 'active'
    
      case 'completed':
        return task.status === 'completed'
      default:
        return true
    }
  })

  return (

    <div className="min-h-screen w-full bg-[#020617] relative">
  {/* Dark Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
    }}
  />
      <div className='container pt-8 mx-auto relative z-10'>
      <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

        {/* đầu trang */}
        <Header/>

        {/* tạo nhiệm vụ */}
        <AddTask handleNewTaskAdded={handleTaskChanged}/>

        {/* thống kê và bộ lọc */}
        <StatsAndFilters 
          filter={filter}
          setFilter={setFilter}
          activeTasksCount={activeTaskCount}
          completedTasksCount={completeTaskCount}
          
        />

        {/* Danh sách nhiệm vụ */}
        <TaskList filteredTask={filteredTasks} filter={filter}
          handleTaskChanged={handleTaskChanged}//lấy từ taskList, taskList lấy props từ taskCard
        />

        {/* Phân trang và lọc theo Date */}
        <div className='flex flex-col items-center justify-between gap-6 sm: flex-row'>
            <TaskListPagination/>

            <DateTime/>
        </div>
        

      <Footer 
        activeTasksCount={activeTaskCount} 
        completedTasksCount={completeTaskCount}
      /> 
      </div>

    </div>
</div>

   
    
  )
}

export default HomePage
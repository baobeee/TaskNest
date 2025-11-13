import { AddTask } from '@/components/AddTask'
import DateTime from '@/components/DateTime'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const HomePage = () => {

  //gom dữ liêu lại mới xử lý taskList
  const [taskBuffer, settaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)

  //theo dõi state
  //chạy 1 lần duy nhất khi trong deps là mảng rỗng
  useEffect(()=>{
    fetchTask()
  }, []);

  //lấy ds nhiệm vụ
  const fetchTask = async ()=>{
    try {
      const res = await axios.get('http://localhost:8081/api/tasks')
      settaskBuffer(res.data.tasks)

      //lấy số lượng
      setActiveTaskCount(res.data.activeCount)
      setCompleteTaskCount(res.data.completedCount)
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất Tasks: ", error)
      toast.error("Lỗi xảy ra khi truy xuất Tasks.")
    }
  } 

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
        <AddTask/>

        {/* thống kê và bộ lọc */}
        <StatsAndFilters 
          activeTasksCount={activeTaskCount}
          completedTasksCount={completeTaskCount}
        />

        {/* Danh sách nhiệm vụ */}
        <TaskList filteredTask={taskBuffer}/>

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
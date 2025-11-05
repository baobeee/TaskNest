import { AddTask } from '@/components/AddTask'
import DateTime from '@/components/DateTime'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React from 'react'

const HomePage = () => {
  return (
    <div className='container pt-8 mx-auto'>
      <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

        {/* đầu trang */}
        <Header/>

        {/* tạo nhiệm vụ */}
        <AddTask/>

        {/* thống kê và bộ lọc */}
        <StatsAndFilters/>

        {/* Danh sách nhiệm vụ */}
        <TaskList/>

        {/* Phân trang và lọc theo Date */}
        <div className='flex flex-col items-center justify-between gap-6 sm: flex-row'>
            <TaskListPagination/>

            <DateTime/>
        </div>
        
      <Footer/>
      </div>

    </div>
    
  )
}

export default HomePage
import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const StatsAndFilters = ({completedTasksCount = 0,
   activeTasksCount = 0,
   filter = "all",
   setFilter
  }) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* Phần thông kê */}
      <div className='flex gap-3'>                                                                                                                                                                 
        <Badge variant="secondary" className='bg-white/20 text-accent-foreground border-info/20 py-2'>
        {/* hiển thị số nhiệm vụ đang làm kèm chữ được khai báo ở data*/}
          {activeTasksCount} {FilterType.active}
        </Badge>

        <Badge variant="secondary" className='bg-white/20 text-success border-success/20 py-2'>
        {/* hiển thị số nhiệm vụ hoàn thành kèm chữ được khai báo ở data*/}
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Phần filter */}
      <div className='flex flex-col text-accent-foreground gap-2 sm:flex-row'>
        {
        Object.keys(FilterType).map((type)=>(
          <Button
            key={type} 
            variant={filter === type ? 'gradient':'ghost'}
            size="sm"
            className="capitalize"
            onClick = {()=> setFilter(type)}//thay đổi type theo click chuột
           >

            {/* icon và trạng thái */}
            <Filter className='size-4'/>{/* icon */}
            {FilterType[type]}{/* từng trạng thái công việc */}
           </Button>
        ))
        }
      </div>
    </div>
  )
}

export default StatsAndFilters
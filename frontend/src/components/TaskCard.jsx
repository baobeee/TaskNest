import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, Calendar1, CheckCircle2, Circle, Delete, DeleteIcon, SquarePen, Trash2 } from 'lucide-react';

const TaskCard = ({task, index}) => {
    let isEditting = false;
    
  return (
    <Card clas className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && 'opacity-75'
    )}
    //render chậm dần tính theo thứ tự của từng item hiển thị ra tạo hiệu ứng
        style={{animationDelay: `${index * 50}ms`}}
    >
        <div className="flex items-center gap-4">
            {/* nút check đã hoàn thành chưa */}
            <Button 
                variant='ghost'
                size= 'icon'
                className={cn(
                    'shrink-0 size-8 rounded-full transition-all duration-200', 
                    task.status === 'completed' ? 'text-success hover:text-success/80':
                                                  'text-muted-foreground hover:text-primary'
                )}
            >
                {task.status === 'completed' ? (
                    <CheckCircle2 className='size-5'/>
                ) : (
                    <Circle className='size-5'/>
                )}
                
            </Button>

            {/* hiển thị thông tin / chỉnh sửa */}
            <div className="flex-1 min-w-0">
                {/* nếu đang chỉnh sửa thì hiển thị layout input nếu k chỉnh thì chỉ là ô text hiển thị thông tin */}
                {isEditting ? (
                    <Input 
                    placeholder="What need to do?"
                     className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20" type="text"/>
                ) : (
                    <p className={cn(
                        "text-base transition-all duration-200"
                    , 
                        task.status ==='completed' ? "line-through text-muted-foreground" : "text-foreground" 
                    )}>
                        {task.title}
                    </p>
                ) }

                
                 {/* ngày tạo và ngày hoàn thành */}
                <div className="flex items-center gap-2 mt-1">
                    <Calendar className='size-3 text-muted-foreground'/>

                    <span className='text-xs text-muted-foreground'>
                        {/* đb lưu bằng giờ quốc tế nên cần dùng toLocaleString để chuyển thành giờ VN */}
                        {new Date(task.createdAt).toLocaleString() }{/*ngày tạo*/}
                    </span>
                    {/* check nếu ngày hoàn thành chưa null thì render ra layout*/}
                    {task.completedAt &&(
                        <>
                            <span className='text-xs text-muted-foreground'> - </span>
                            <Calendar className='size-3 text-muted-foreground'/>
                            <span className='text-xs text-muted-foreground'> 
                                {new Date(task.completedAt).toLocaleString()}
                            </span>
                        </>
                    )}
                </div>
            </div>

           

            {/* nút chỉnh sửa và xóa */}
            {/* mặc định css ẩn 2 nút, sau khi hover sẽ hiển thị 2 nút này lên bằng group-hover */}
            {/* hiệu ứng trượt lên */}
            <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                {/* edit */}
                <Button
                    variant='ghost'
                    size='icon'
                    //phàn tử k co lại khi có shrink
                    className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
                >
                    {/* pen icon */}
                    <SquarePen className='size-4'/>
                </Button>
                
                {/* xóa */}
                <Button
                    variant='ghost'
                    size='icon'
                    className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'

                >
                    <Trash2 className='size-4'/>
                </Button>
            </div>
        </div>
    </Card>
  )
}

export default TaskCard
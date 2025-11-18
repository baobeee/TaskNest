import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export const AddTask = ({handleNewTaskAdded}) => {

  const [newTaskTitle, setNewTaskTitle] = useState("")//lấy giá trị nhập trên input

  const addTask = async ()=>{
    if(newTaskTitle.trim()){
      try {
        await axios.post("http://localhost:8081/api/tasks", {title: newTaskTitle})
        toast.success(`Nhiệm vụ ${newTaskTitle} được thêm thành công.`)
        handleNewTaskAdded()
      } catch (error) {
        console.error('Lỗi xảy ra khi thêm task.', error)
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.")
      }

      setNewTaskTitle("")//reset
    }else{
      console.log("Bạn cần nhập nội dung nhiệm vụ")
    }
  }

//ấn enter sẽ thêm được nhiệm vụ
  const handleKeyPress = (event) =>{
    if(event.key === "Enter"){
      addTask()
    }
  }

  return (
    <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input type="text" placeholder="Cần phải làm gì?" 
          className="h-12 text-base sm:flex-1 bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value = {newTaskTitle}
          onChange = {(even)=> setNewTaskTitle(even.target.value)}
          onKeyPress = {handleKeyPress}
          />
        
        <Button
          variant="gradient" size="xl"  className="px-6"
          onClick = {addTask}
          >
          <Plus/>
          Add
        </Button>
      </div>
    </Card>
  )
}

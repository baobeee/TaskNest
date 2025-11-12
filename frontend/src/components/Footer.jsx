import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return (
    <>
    {/* render dựa trên tổng số lượng công việc đã hoàn thành và đang làm */}
    {completedTasksCount + activeTasksCount > 0 && (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {/* số lượng công việc đã hoàn thành, và còn việc phải làm */}
          {completedTasksCount > 0 &&(
            <>
              Bạn đã hoàn thành {completedTasksCount} công việc
              {
                // nếu còn công việc thì thêm 1 đoạn
                activeTasksCount > 0 && `, còn ${activeTasksCount} công việc nữa cần hoàn thành.`
              }
            </>
          )}
          
          {/* chưa hoàn thành công việc nào*/}
          {completedTasksCount === 0 && activeTasksCount === 0 &&(
            <>
              Bạn cần phải làm {activeTasksCount} công việc.
            </>
          )}
        </p>
      </div>
    )}
    </>
  )
}

export default Footer
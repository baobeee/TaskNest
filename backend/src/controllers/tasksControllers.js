import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); //findALl, k có await Promise này sẽ hiểu đây k phải là kết quả cần trả ra
    res.status(200).json(tasks); //200 = success, return json
  } catch (error) {
    console.log("Error in getAllTaks", error); //lỗi ở backend
    res.status(500).json({ message: "System error" }); //dẩy lỗi ra api respone
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body; //lấy dữ liệu từ req ở body đi qua middleware để kiểm soát kiểu dữ liệu
    const task = new Task({ title }); // lưu obj mới vào task

    const newTask = await task.save(); //lưu vào db, kết quả cần nhận được nên dùng await
    res.status(201).json(newTask); //đẩy lỗi ra client
  } catch (error) {
    console.log("Error in createTask", error); //lỗi ở backend
    res.status(500).json({ message: "System error" }); //dẩy lỗi ra api respone
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body; //lấy dữ liệu nhập vào trên client
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true } //sau khi updated=> return về giá trị sau khi update, k có dòng đó sẽ return về giá trị cũ
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "The task does not exist" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error in updateTask", error); //lỗi ở backend
    res.status(500).json({ message: "System error" }); //dẩy lỗi ra api respone
  }
};

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Task deleted successfully" });
};

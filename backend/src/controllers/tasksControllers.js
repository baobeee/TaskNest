import Task from "../models/Task.js";
export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date(); // thời gian hiện tại
  let startDate; //mốc thời gian bắt đâu tính nhiệm vụ lọc

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // yyyy/MM/dd 00:00
      break;
    case "week":
      //thấy thứ 2 làm mốc và lùi về thứ 2 theo công thức
      //date= ngày, day= thứ | day===0 ? 7 : 0 là ngày chủ nhật vì trong day chủ nhật = 0 nên nếu là chủ nhật sẽ -7 khác chủ nhật  thì -0
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;

    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // ngày đầu tiên của tháng
      break;

    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    //kĩ thuật Aggregate Pipesline, giúp xử lí nhiều việc cùng 1 lúc mà chỉ gửi 1 request tránh làm giảm tốc độ
    const result = await Task.aggregate([
      { $match: query },
      {
        //có thể thực hiện nhiều việc cùng lúc
        $facet: {
          //gọi công việc, sắp xếp theo thời gian tạo
          tasks: [{ $sort: { createdAt: -1 } }],

          //lọc ra công việc theo status, đếm số lượng sau khi lọc
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }], //đếm số nhiệm vụ active

          completedCount: [
            { $match: { status: "complete" } }, //đếm số nhiệm vụ complete
            { $count: "count" },
          ],
        },
      },
    ]);

    //lấy các nhiệm vụ sau khi đã sắp xếp
    const tasks = result[0].tasks; //lấy ra dữ liệu đầu tiên trong data
    //lấy dữ liệu đầu tiên vầ kiểm tra mảng rỗng, nếu rỗng sẽ = 0
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    //gửi về frontend
    res.status(200).json({ tasks, activeCount, completedCount }); //200 = success, return json
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
      return res.status(404).json({ message: "The task does not exist." });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error in updateTask", error); //lỗi ở backend
    res.status(500).json({ message: "System error" }); //dẩy lỗi ra api respone
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "The task does not exist." });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Error in deleteTask", error);
    res.status(500).json({ message: "System error" });
  }
};

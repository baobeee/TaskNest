export const getAllTasks = (req, res) => {
  res.status(200).send("you have 20 tasks to do");
};

export const createTask = (req, res) => {
  res.status(201).json({ message: "New task added successfully" });
};

export const updateTask = (req, res) => {
  res.status(200).json({ message: "Task updated successfully" });
};

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Task deleted successfully" });
};

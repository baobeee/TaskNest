import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, //createdAt và updatedAt được tự động thêm vào
  }
);

//model
const Task = mongoose.model("Task", taskSchema); //từ schema được định nghĩa sinh ra model tên Task

export default Task;

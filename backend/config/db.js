import mongoose from "mongoose";

export const connectdDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("connect to database successfuly");
  } catch (error) {
    console.error("An Error when connect to database", error);
    process.exit(1); //đóng cổng db khi liên kết gặp lỗi, 1: thoát với trạng thái thất bại, 0: ngược lại
  }
};

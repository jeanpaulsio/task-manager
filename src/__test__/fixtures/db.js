import mongoose from "mongoose";
import Task from "../../models/task";

export const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
};

export const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: true,
};

export const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  completed: true,
};

export const setupDatabase = async () => {
  await Task.deleteMany();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

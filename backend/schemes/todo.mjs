import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskerScheme = new Schema( {
  id: String,
  header: String,
  data: String,
  date: String,
  time: String,
  color: String,
  isDone: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
})

const Tasker = model('Tasker', taskerScheme);

export default Tasker;
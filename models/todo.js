import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

// collection
const Task = mongoose.model("Task", todoSchema);

export { Task };
// export default Contact;
// then => import db from "...";

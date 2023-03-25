import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8000;

// import databases first
import { db } from "./config/mongoose.js";
import { Task } from "./models/todo.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));

app.get("/", async (req, res) => {
  const tasks = await Task.find();
  return res.render("index", {
    tasks: tasks,
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const task = new Task(req.body);
  task
    .save()
    .then((t) => {
      console.log("done");
      res.json({ status: "ok" });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/view", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.post("/update", async (req, res) => {
  const task = await Task.findOne({ _id: req.body.id });
  let d = task.done;
  const query = Task.updateOne({}, { $set: { name: "Jean-Luc Picard" } });
  const r = await Task.updateOne({ _id: req.body.id }, { $set: { done: !d } });
  res.json({ updated: "ok" });
});

app.post("/delete", async (req, res) => {
  const r = await Task.deleteOne({ _id: req.body.id });
  res.json({ deleted: "ok" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("error running serever ", err);
    return;
  }
  console.log("server is listening at port ", PORT);
});

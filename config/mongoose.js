import mongoose from "mongoose";

const DB_NAME = "todos";
const MONGO_USER = encodeURIComponent("johndoe");
const MONGO_PASS = encodeURIComponent("@Johndoe123");

const MONGO_REMOTE_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.oy4ru3o.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_REMOTE_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connection"));

db.once("open", function () {
  console.log("connection successful!");
});

export { db };

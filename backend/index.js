import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";

const app = express();
// console.log("this is starting of application");
dotenv.config();
const port = process.env.PORT;

db();
app.get("/", (req, res) => {
  res.send("the server has been started");
});
app.listen(port, () => {
  console.log(`the port is run on the browser http://localhost:${port}`);
});

export default app;

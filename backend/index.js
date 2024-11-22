import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// console.log("this is starting of application");
dotenv.config();
const port = process.env.PORT;

db();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/user", router);
app.get("/", (req, res) => {
  res.send("the server has been started");
});
app.listen(port, () => {
  console.log(`the port is run on the browser http://localhost:${port}`);
});

export default app;

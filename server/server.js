import "dotenv/config";
import express from "express";
import cors from "cors";
import data from "./routes/data.js";
import cookieParser from "cookie-parser";
import path from "path";

console.log("Server starting...");
const PORT = process.env.PORT || 5050;
const dirname = path.resolve();

const app = express();

const origins = [
  "http://localhost:5173",
  "https://tempus-v2-git-develop-yukikoniis-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/data", data);
app.use(express.static(path.join(dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("success");
  res.send("API is running...");
});

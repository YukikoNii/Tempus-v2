import "dotenv/config";
import express from "express";
import cors from "cors";
import data from "./routes/data.js";
import cookieParser from "cookie-parser";

console.log("Server starting...");
const PORT = process.env.PORT || 5050;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/data", data);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("success");
  res.send("API is running...");
});

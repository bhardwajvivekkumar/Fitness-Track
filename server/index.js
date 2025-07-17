import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data (form data).

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

app.use("/api/user", UserRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log("Server running on  port 8080"));
  } catch (error) {
    console.log(err);
  }
};

startServer();

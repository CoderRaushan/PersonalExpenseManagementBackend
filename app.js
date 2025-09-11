import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import ExpenseRouter from "./routes/userRoute.js";
import fetch from "node-fetch";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser()); 
const corsOptions = {
  origin: ["https://rausexpensemanagement.netlify.app","http://127.0.0.1:5500"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
const port = process.env.PORT || 9090;
const MongodbURI = process.env.mongodb_URI;
try 
{
  mongoose.connect(MongodbURI,{
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error", err))
}catch(err)
{
 console.log("connetion error",err);
}
app.get("/", (req, res) => {
  res.send("welcome to root page:");
});

app.use("/Expense",ExpenseRouter);  
app.post("/Expense/AddExpense", (req, res) => {
  console.log("Request received:", req.body);
  res.send("Expense added!");
});
app.listen(port, () => {
  console.log(`server is running at port:http://localhost:${port}`);
    // Self-ping every 13 minutes
  const SELF_URL = process.env.SELF_URL;
  setInterval(() => {
    fetch(SELF_URL)
      .then(res => console.log("Self ping:", res.status))
      .catch(err => console.error("Self ping failed:", err));
  }, 13 * 60 * 1000);
});

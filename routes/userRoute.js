import express from "express";
import {AddExpense,GetExpense,EditExpense} from "../controllers/userController.js";
const router=express.Router();
router.post("/AddExpense",AddExpense);
router.put("/EditExpense",EditExpense);
router.get("/GetExpense",GetExpense);
export default router;  
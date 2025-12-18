
import Expense from "../models/ExpenseModel.js";
import redis from "redis";
import dotenv from "dotenv"
dotenv.config();

export const AddExpense = async (req, res) => {
  const { item, cost, category, date } = req.body;
  try {
    if (!item || !cost || !category || !date) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const newExpense = new Expense({
      item,
      cost,
      category,
      date,
    });
    await newExpense.save();
    return res
      .status(201)
      .json({ message: "Item Added Successfully!", newExpense });
  } catch (error) {
    console.error("Item Added error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
export const EditExpense = async (req, res) => {
  const { _id, item, cost, category, date } = req.body;
  try {
    if (!item || !cost || !category || !date) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const expense = await Expense.findByIdAndUpdate(
      _id,
      { item, cost, category, date },
      { new: true } // Return the updated expense
    );
    if (!expense) {
      return res.status(404).send("Expense not found");
    }
    return res
      .status(201)
      .json({ message: "Item Edited Successfully!", expense });
  } catch (error) {
    console.error("Item Edit error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const GetExpense = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // page number
    const limit = parseInt(req.query.limit) || 10; // items per page

    const skip = (page - 1) * limit;

    const expenses = await Expense.find({})
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments();

    return res.status(200).json({
      data: expenses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return res.status(500).json({ error: "GetExpense error" });
  }
};


// AddTransaction.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../features/transactions/transactionSlice";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.transactions.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const newTransaction = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      type,
    };

    dispatch(addTransaction(newTransaction));
    setAmount("");
    setCategory("");
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          variants={inputVariants}
          whileFocus="focus"
        />
        <motion.select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          variants={inputVariants}
          whileFocus="focus"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-gray-800">
              {cat}
            </option>
          ))}
        </motion.select>
        <motion.select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          variants={inputVariants}
          whileFocus="focus"
        >
          <option value="income" className="text-gray-800">Income</option>
          <option value="expense" className="text-gray-800">Expense</option>
        </motion.select>
        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-300 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTransaction;

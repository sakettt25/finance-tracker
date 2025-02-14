import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBudgetGoal } from "../features/budget/budgetSlice";
import { motion } from "framer-motion";

const BudgetTracker = () => {
  const dispatch = useDispatch();
  const budgetGoal = useSelector((state) => state.budget.budgetGoal);
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );
  const totalExpenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + Math.abs(txn.amount), 0);

  const remainingBudget = budgetGoal - totalExpenses;
  const [inputBudget, setInputBudget] = useState("");
  const [budgetExceeded, setBudgetExceeded] = useState(false);

  useEffect(() => {
    setBudgetExceeded(totalExpenses > budgetGoal);
  }, [totalExpenses, budgetGoal]);

  const handleSetBudget = () => {
    if (inputBudget) {
      dispatch(setBudgetGoal(parseFloat(inputBudget)));
      setInputBudget("");
    }
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Budget Tracker</h2>
      
      {/* Input for Setting Budget */}
      <div className="mb-4">
        <input
          type="number"
          value={inputBudget}
          onChange={(e) => setInputBudget(e.target.value)}
          placeholder="Set Monthly Budget"
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md transition duration-300"
          onClick={handleSetBudget}
        >
          Set Budget
        </button>
      </div>

      {/* Remaining Budget Display */}
      <div className="text-center">
        <p className="text-lg font-medium text-gray-300 mb-2">📊 Remaining Budget</p>
        <p
          className={`text-3xl font-bold ${
            budgetExceeded ? "text-red-500" : "text-green-400"
          }`}
        >
          ${remainingBudget.toFixed(2)}
        </p>
        {budgetExceeded && (
          <motion.p
            className="mt-4 text-red-500 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⚠️ Budget Exceeded!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetTracker;

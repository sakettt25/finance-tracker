import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeRates } from "../features/currency/currencySlice";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import BudgetTracker from "../components/BudgetTracker";
import CurrencyConverter from "../features/currency/CurrencyConverter";
import Insights from "../components/Insights";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.budgetGoal || 0);
  const transactions = useSelector((state) => state.transactions.transactions);
  const { error, loading } = useSelector((state) => state.currency);

  const totalExpenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalIncome = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, txn) => acc + txn.amount, 0);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  // Variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Calmer Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 animate-gradient-x"></div>

      {/* Floating Particles - Reduced Intensity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gray-300 opacity-15 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/3 left-[45%] w-20 h-20 bg-gray-400 opacity-10 rounded-full blur-lg animate-float-fast"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Page Title */}
        <motion.h2
          className="text-center text-white text-5xl font-extrabold mb-12 tracking-tight drop-shadow-lg p-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Financial Dashboard
        </motion.h2>

        {/* Error and Loading Messages */}
        {error && (
          <motion.p
            className="text-red-600 bg-red-50 p-4 rounded-xl mb-6 shadow-md mx-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Failed to fetch exchange rates. Please try again later.
          </motion.p>
        )}
        {loading && (
          <motion.p
            className="text-blue-600 bg-blue-50 p-4 rounded-xl mb-6 shadow-md mx-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading exchange rates...
          </motion.p>
        )}

        {/* Summary Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mx-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: "Total Income", value: `$${totalIncome.toFixed(2)}`, color: "bg-green-500" },
            { title: "Total Expenses", value: `$${totalExpenses.toFixed(2)}`, color: "bg-red-500" },
            { title: "Budget Goal", value: `$${budget.toFixed(2)}`, color: "bg-blue-500" },
            {
              title: "Remaining Budget",
              value: `$${(budget - totalExpenses).toFixed(2)}`,
              color:
                totalExpenses > budget ? "bg-red-500" : "bg-blue-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-xl text-white backdrop-blur-lg bg-opacity-[0.15] border border-white/20 hover:bg-opacity-[0.3] transition-all duration-300`}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-xl font-bold">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Budget Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 mx-6">
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Expense Breakdown</h3>
            <ExpenseChart />
          </motion.div>
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Budget Progress</h3>
            <BudgetTracker />
            <Insights />
          </motion.div>
        </div>

        {/* Transactions and Currency Converter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-6">
          {/* Add Transaction and Transaction List */}
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Add Transaction</h3>
            <AddTransaction />
            
            {/* Added spacing between AddTransaction and TransactionList */}
            <div className="mt-8">
              <TransactionList />
            </div>
          </motion.div>

          {/* Currency Converter */}
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-5 text-white">Currency Converter</h3>
            <CurrencyConverter />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

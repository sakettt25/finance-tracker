import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateInsights } from "../features/insights/insightsSlice";
import { motion } from "framer-motion";

const Insights = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const insights = useSelector((state) => state.insights.insights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateInsights(transactions));
  }, [transactions, dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Spending Insights</h2>
      <ul className="space-y-4">
        {insights.map((insight, index) => (
          <motion.li 
            key={index} 
            className="bg-white/5 p-4 rounded-lg text-gray-200 shadow-inner"
            variants={itemVariants}
          >
            <div className="flex items-start">
              <span className="text-blue-400 mr-3 text-xl">💡</span>
              <p>{insight}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Insights;

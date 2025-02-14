import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionSlice";
import { motion, AnimatePresence } from "framer-motion";

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  // Variants for animations
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20"> {/* Increased padding here (p-8) */}
      <h2 className="text-2xl font-semibold mb-6 text-white">Transactions</h2>
      <AnimatePresence>
        {transactions.length > 0 ? (
          <ul className="space-y-4">
            {transactions.map((txn) => (
              <motion.li
                key={txn.id}
                className={`p-4 rounded-lg flex justify-between items-center shadow-md ${
                  txn.type === "income"
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div>
                  <p className="text-lg font-medium text-white">
                    {txn.category}
                  </p>
                  <p className="text-sm text-gray-400">
                    ${txn.amount.toFixed(2)} ({txn.type})
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                  onClick={() => dispatch(deleteTransaction(txn.id))}
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.p
            className="text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No transactions found. Add a transaction to get started!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;

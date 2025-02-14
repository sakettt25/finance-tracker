// ExpenseChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-gray-500">
        No transactions available for the chart.
      </p>
    );
  }

  const categories = {};

  transactions.forEach((txn) => {
    if (txn.type === "expense") {
      categories[txn.category] =
        (categories[txn.category] || 0) + txn.amount;
    }
  });

  const defaultData = {
    labels: ["No Data"],
    datasets: [{ data: [1], backgroundColor: ["#E0E0E0"] }],
  };

  const data = Object.keys(categories).length
    ? {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
            backgroundColor: [
              "#264653",
              "#2a9d8f",
              "#e9c46a",
              "#f4a261",
              "#e76f51",
            ],
          },
        ],
      }
    : defaultData;

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-xl font-semibold mb-3">Expense Breakdown</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default ExpenseChart;

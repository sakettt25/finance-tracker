//insightsSlice.js 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insights: [],
};

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    generateInsights: (state, action) => {
      const transactions = action.payload;
      const expenses = transactions.filter((txn) => txn.type === "expense");

      const categorySpending = {};
      expenses.forEach((expense) => {
        categorySpending[expense.category] =
          (categorySpending[expense.category] || 0) + expense.amount;
      });

      let mostSpentCategory = "";
      let maxSpending = 0;
      for (const category in categorySpending) {
        if (categorySpending[category] > maxSpending) {
          maxSpending = categorySpending[category];
          mostSpentCategory = category;
        }
      }

      const insights = [];
      if (mostSpentCategory) {
        insights.push(
          `You are spending the most on ${mostSpentCategory}: $${maxSpending.toFixed(
            2
          )}`
        );
        if (mostSpentCategory === "Dining") {
          insights.push(
            "Consider cooking at home more often to save on dining expenses."
          );
        }
      } else {
        insights.push("No spending insights available.");
      }

      state.insights = insights;
    },
  },
});

export const { generateInsights } = insightsSlice.actions;
export default insightsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionSlice";
import budgetReducer from "../features/budget/budgetSlice";
import currencyReducer from "../features/currency/currencySlice";
import insightsReducer from "../features/insights/insightsSlice"; // Import insights reducer


export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budget: budgetReducer,
    currency: currencyReducer,
    insights: insightsReducer, // Add insights reducer to the store
    
  },
});

export default store;

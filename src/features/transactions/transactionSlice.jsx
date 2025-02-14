import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  categories: ["Food", "Rent", "Entertainment", "Utilities", "Salary", "Other"], // Predefined categories
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (txn) => txn.id !== action.payload
      );
    },
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (txn) => txn.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;

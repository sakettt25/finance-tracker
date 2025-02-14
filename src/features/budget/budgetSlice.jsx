//budgetSlice.js 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetGoal: 0,
  budgetAlert: "",
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetGoal: (state, action) => {
      state.budgetGoal = action.payload;
    },
    setBudgetAlert: (state, action) => {
      state.budgetAlert = action.payload;
    },
  },
});

export const { setBudgetGoal, setBudgetAlert } = budgetSlice.actions;
export default budgetSlice.reducer;

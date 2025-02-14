//currencySlice.js 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const API_URL = ` https://v6.exchangerate-api.com/v6/c6d8253d666d51bb781a6d44/latest/USD`;

export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchRates",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.conversion_rates;
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: { rates: {}, status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default currencySlice.reducer;

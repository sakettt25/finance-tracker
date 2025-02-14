import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const CurrencyConverter = () => {
  const rates = useSelector((state) => state.currency.rates);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [converted, setConverted] = useState(null);

  const handleConvert = () => {
    if (!amount || !rates[currency]) return;
    setConverted((amount * rates[currency]).toFixed(2));
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Currency Converter</h2>
      <div className="space-y-4">
        <motion.input
          type="number"
          placeholder="Amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.select
          className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur} value={cur} className="text-gray-800">
              {cur}
            </option>
          ))}
        </motion.select>
        <motion.button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md transition duration-300"
          onClick={handleConvert}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Convert
        </motion.button>
      </div>
      {converted && (
        <motion.div 
          className="mt-6 p-4 bg-white/5 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-white">
            💱 <span className="font-semibold">{amount} USD</span> = <span className="font-semibold">{converted} {currency}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurrencyConverter;

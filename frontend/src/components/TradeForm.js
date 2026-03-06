
import React, { useState } from "react";
import { executeTrade } from "../api/portfolioApi";

const TradeForm = ({ userId, onTradeSuccess }) => {
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [cryptoName, setCryptoName] = useState("");
  const [quantity, setQuantity] = useState(""); // Added quantity field
  const [price, setPrice] = useState("");
  const [transactionType, setTransactionType] = useState("BUY"); // Renamed from 'type'

  const handleTrade = async (e) => {
    e.preventDefault();

    const tradeData = {
      userId,
      cryptoSymbol,
      cryptoName,
      quantity: parseFloat(quantity), // Changed from amount
      price: parseFloat(price),
      amount: parseFloat(quantity) * parseFloat(price), // Calculate total amount
      transactionType, // Renamed to match backend
    };

    try {
      const result = await executeTrade(tradeData);
      if (result) {
        alert("Trade executed successfully!");
        onTradeSuccess(); // Refresh transaction history
      }
    } catch (error) {
      console.error("Trade execution failed:", error);
      alert("Trade execution failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">⚡ Trade Crypto</h2>
      <form onSubmit={handleTrade} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Crypto Symbol (e.g., BTC)"
          className="p-2 rounded bg-gray-700 text-white"
          value={cryptoSymbol}
          onChange={(e) => setCryptoSymbol(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Crypto Name"
          className="p-2 rounded bg-gray-700 text-white"
          value={cryptoName}
          onChange={(e) => setCryptoName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          className="p-2 rounded bg-gray-700 text-white"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (USD)"
          className="p-2 rounded bg-gray-700 text-white"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <button type="submit" className="bg-green-500 p-2 rounded text-white">
          Execute Trade
        </button>
      </form>
    </div>
  );
};

export default TradeForm;

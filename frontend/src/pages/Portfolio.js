import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../api/portfolioApi";
import TransactionList from "../components/TransactionList";
import TradeForm from "../components/TradeForm";

const Portfolio = () => {
  const userId = 3; // 🔴 Replace with actual logged-in user ID
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const data = await fetchTransactions(userId);
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">💰 Crypto Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Trade Form */}
        <TradeForm userId={userId} onTradeSuccess={loadTransactions} />

        {/* ✅ Transaction History */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default Portfolio;

import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">📜 Transaction History</h2>
      <ul>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions found.</p>
        ) : (
          transactions.map((tx, index) => (
            <li key={index} className="text-white border-b border-gray-700 py-2">
              <span className="font-bold">{tx.cryptoSymbol.toUpperCase()}</span> - 
              {tx.transactionType === "BUY" ? (
                <span className="text-green-400"> Bought </span>
              ) : (
                <span className="text-red-400"> Sold </span>
              )}
              {tx.amount} @ ${tx.price.toFixed(2)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

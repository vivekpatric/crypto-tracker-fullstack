
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const WatchlistItem = ({ crypto, removeFromWatchlist }) => {
    const [history, setHistory] = useState([]);
    const [trend, setTrend] = useState("down");

    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/crypto/history/${crypto.name.toLowerCase()}`
                );
                const data = response.data;

                if (data.length > 0) {
                    setHistory(data);

                    // Determine if price is increasing or decreasing
                    const firstPrice = data[0].price;
                    const lastPrice = data[data.length - 1].price;
                    setTrend(lastPrice > firstPrice ? "up" : "down");
                }
            } catch (error) {
                console.error("Error fetching price history:", error);
            }
        };

        fetchPriceHistory();
    }, [crypto.name]);

    // Mini Graph Data
    const chartData = {
        labels: history.map((_, index) => index), // Example time-based labels
        datasets: [
            {
                label: "Price",
                data: history.map((data) => data.price),
                borderColor: trend === "up" ? "green" : "red",
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 2,
                pointRadius: 1,
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg mb-3"
        >
            <div className="flex items-center">
                <img src={crypto.image} alt={crypto.name} className="w-8 h-8 mr-2" />
                <div>
                    <h2 className="text-lg font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
                    <p className="text-green-400">${crypto.price?.toFixed(2)}</p>
                </div>
            </div>

            {/* Mini Graph */}
            <div className="w-32 h-16">
                <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>

            {/* Trend Indicator + Remove Button */}
            <div className="flex space-x-3 items-center">
                <span className={trend === "up" ? "text-green-400" : "text-red-400"}>
                    {trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                </span>
                <button className="text-red-500 hover:text-red-700" onClick={() => removeFromWatchlist(crypto.id)}>
                    <FaTrash />
                </button>
            </div>
        </motion.div>
    );
};

export default WatchlistItem;


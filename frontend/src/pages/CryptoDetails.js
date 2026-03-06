

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const CryptoDetails = () => {
    const { cryptoName } = useParams(); // ✅ Get the crypto name from URL
    const [history, setHistory] = useState([]);
    const [cryptoInfo, setCryptoInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cryptoName) {
            setError("Invalid cryptocurrency name!");
            setLoading(false);
            return;
        }

        const fetchCryptoData = async () => {
            try {
                setLoading(true);

                // ✅ Fetch Historical Prices
                const historyResponse = await axios.get(`http://localhost:8080/api/crypto/history/${cryptoName}`);
                setHistory(historyResponse.data);

                // ✅ Fetch Crypto Details
                const detailsResponse = await axios.get("http://localhost:8080/api/crypto/fetch");
                const cryptoDetails = detailsResponse.data.find(c => c.name.toLowerCase() === cryptoName.toLowerCase());

                if (!cryptoDetails) {
                    setError("Cryptocurrency not found!");
                } else {
                    setCryptoInfo(cryptoDetails);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoData();
    }, [cryptoName]);

    // ✅ Prepare Chart Data
    const chartData = {
        labels: history.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: `${cryptoName.toUpperCase()} Price (USD)`,
                data: history.map(data => data.price),
                borderColor: "#f39c12",
                backgroundColor: "rgba(243, 156, 18, 0.3)",
                tension: 0.4
            }
        ]
    };

    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            {loading && <p className="text-center text-yellow-400 text-xl">Loading data...</p>}
            {error && <p className="text-center text-red-400 text-xl">{error}</p>}

            {cryptoInfo && (
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                    <img src={cryptoInfo.image} alt={cryptoInfo.name} className="w-24 h-24 mx-auto mb-3" />
                    <h1 className="text-3xl font-bold">{cryptoInfo.name} ({cryptoInfo.symbol.toUpperCase()})</h1>
                    <p className="text-2xl text-green-400">${cryptoInfo.price.toFixed(2)}</p>
                    <p className="text-gray-400">Market Cap: ${cryptoInfo.marketCap.toLocaleString()}</p>
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-6 bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-center mb-4">📊 Price History (Last 90 Days)</h2>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default CryptoDetails;

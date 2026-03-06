
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { quantum } from "ldrs";

// Register the loader
quantum.register();

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/crypto/fetch")
      .then(response => {
        setCryptos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching crypto data:", error);
        setError("Failed to load cryptocurrency data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Real-Time Crypto Prices</h1>

      {/* 🔄 Loading Animation */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <l-quantum size="55" speed="1.5" color="yellow" />
        </div>
      )}

      {/* 🚨 Error Message */}
      {error && <p className="text-center text-red-400 text-xl">{error}</p>}

      {/* ✅ Crypto Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cryptos.map((crypto, index) => (
            <motion.div key={crypto.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
              
              {/* Crypto Image */}
              <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mb-3" />

              <h2 className="text-xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
              <p className="text-lg text-green-400">${crypto.price ? crypto.price.toFixed(2) : "N/A"}</p>

              {/* Link to Crypto Details Page */}
              <Link to={`/crypto/${crypto.name.toLowerCase()}`} className="mt-3 inline-block text-yellow-400 hover:text-yellow-500">
                View Details ➜
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;


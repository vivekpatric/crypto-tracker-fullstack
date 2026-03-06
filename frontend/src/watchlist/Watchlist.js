
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WatchlistItem from "./WatchlistItem";
import WatchlistService from "./WatchlistService";
import axios from "axios";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    setWatchlist(WatchlistService.getWatchlist());  // Load from local storage
    axios.get("http://localhost:8080/api/crypto/fetch")
      .then(response => setCryptos(response.data))
      .catch(error => console.error("Error fetching crypto data:", error));
  }, []);

  // Add to watchlist
  const addToWatchlist = () => {
    if (selectedCrypto) {
      const updatedList = WatchlistService.addCrypto(selectedCrypto);
      setWatchlist(updatedList);
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = (cryptoId) => {
    const updatedList = WatchlistService.removeCrypto(cryptoId);
    setWatchlist(updatedList);
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6">⭐ My Watchlist</h1>

      {/* Select Cryptocurrency */}
      <div className="flex gap-4 justify-center">
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => {
            const selected = cryptos.find(crypto => crypto.id === parseInt(e.target.value));
            setSelectedCrypto(selected);
          }}
        >
          <option value="">Select Cryptocurrency</option>
          {cryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        {/* ✅ Add Button */}
        <button
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
          onClick={addToWatchlist}
        >
          Add to Watchlist
        </button>
      </div>

      {/* Watchlist Display */}
      <div className="mt-6">
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-400">No cryptos in watchlist.</p>
        ) : (
          watchlist.map((crypto) => (
            <WatchlistItem key={crypto.id} crypto={crypto} removeFromWatchlist={removeFromWatchlist} />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;


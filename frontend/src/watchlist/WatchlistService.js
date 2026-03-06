
const WatchlistService = {
    // Get Watchlist from localStorage
    getWatchlist: () => JSON.parse(localStorage.getItem("watchlist")) || [],

    // Add a cryptocurrency to the watchlist
    addCrypto: (crypto) => {
        let watchlist = WatchlistService.getWatchlist();

        // Prevent duplicate entries
        if (!watchlist.some(item => item.id === crypto.id)) {
            watchlist.push(crypto);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }

        return watchlist;
    },

    // Remove a cryptocurrency from the watchlist
    removeCrypto: (cryptoId) => {
        let watchlist = WatchlistService.getWatchlist().filter(crypto => crypto.id !== cryptoId);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        return watchlist;
    }
};

export default WatchlistService;
    
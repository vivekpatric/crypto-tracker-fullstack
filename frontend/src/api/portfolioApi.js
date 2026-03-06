import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/portfolio";

// ✅ Fetch user transactions
export const fetchTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// ✅ Buy/Sell Crypto
export const executeTrade = async (tradeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trade`, tradeData);
    return response.data;
  } catch (error) {
    console.error("Error executing trade:", error.response?.data || error.message);
    throw error;
  }
};

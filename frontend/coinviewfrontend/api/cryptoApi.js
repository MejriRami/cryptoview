import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // 🔁 adjust if deployed

// -----------------------------
// 🟢 Authentication
// -----------------------------

export const signIn = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
  return res.data;

  // Example response:
  // {
  //   token: "jwt.token.here",
  //   user: { ...userInfo }
  // }
};

export const signUp = async (email, username, password, confirmPassword) => {
  const res = await axios.post(`${BASE_URL}/auth/signup`, {
    email,
    username,
    password,
    confirmPassword
  });
  return res.data;

  // Example response:
  // {
  //   message: "User created successfully"
  // }
};

export const googleSignIn = async (token) => {
  const res = await axios.post(`${BASE_URL}/auth/google/signin`, { token });
  return res.data;

  // Example response:
  // {
  //   token: "jwt.token.here",
  //   user: { ...userInfo }
  // }
};

// -----------------------------
// 📊 Market Insights
// -----------------------------

export const getMarketCapInsights = async (date) => {
  const res = await axios.get(`${BASE_URL}/insights/market-cap`, {
    params: { date }
  });
  return res.data;

  // Example:
  // {
  //   data: {
  //     BTC: 350000000,
  //     ETH: 200000000,
  //     ...
  //   }
  // }
};

export const getCoinInsights = async (coinId, start, end) => {
  const res = await axios.get(`${BASE_URL}/insights/coin`, {
    params: { coinId, start, end }
  });
  return res.data;

  // Example:
  // {
  //   price_trends: [{ date: '2024-06-01', price: 50000 }, ...],
  //   volume_trends: [{ date: '2024-06-01', volume: 90000 }, ...]
  // }
};

export const getTopGainers = async () => {
  const res = await axios.get(`${BASE_URL}/insights/top-gainers`);
  return res.data;

  // Example:
  // {
  //   top_gainers: ["BTC", "ETH", "SOL"]
  // }
};

export const getTrendingCoins = async () => {
  const res = await axios.get(`${BASE_URL}/insights/trending`);
  return res.data;

  // Example:
  // {
  //   trending: ["BTC", "AVAX", "DOT"]
  // }
};

// -----------------------------
// 🪙 Coin Operations
// -----------------------------

export const getCoinMetadata = async (coinId) => {
  const res = await axios.get(`${BASE_URL}/coin/metadata`, {
    params: { coinId }
  });
  return res.data;

  // Example:
  // {
  //   coinId: "BTC",
  //   market_cap: 1000000000,
  //   supply: 21000000
  // }
};

export const getTradingViewLink = async (coinId) => {
  const res = await axios.post(`${BASE_URL}/coin/trading-view`, { coinId });
  return res.data;

  // Example:
  // {
  //   redirect_url: "https://geckoterminal.com/BTC"
  // }
};

// -----------------------------
// 👤 User Portfolio
// -----------------------------

export const addToPortfolio = async (userId, coinId) => {
  const res = await axios.post(`${BASE_URL}/user/portfolio/add`, { userId, coinId });
  return res.data;

  // Example:
  // {
  //   message: "Coin BTC added to user 123's portfolio"
  // }
};

// -----------------------------
// 🚨 Alerts
// -----------------------------

export const setHighPriceAlert = async (userId, coinId, threshold) => {
  const res = await axios.post(`${BASE_URL}/alerts/price/high`, {
    userId,
    coinId,
    threshold
  });
  return res.data;

  // Example:
  // {
  //   message: "High price alert set for BTC at $50000"
  // }
};

export const setLowPriceAlert = async (userId, coinId, threshold) => {
  const res = await axios.post(`${BASE_URL}/alerts/price/low`, {
    userId,
    coinId,
    threshold
  });
  return res.data;

  // Example:
  // {
  //   message: "Low price alert set for BTC at $40000"
  // }
};

import { useEffect, useState } from 'react';
import { fetchUserPortfolio } from '../api/api';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetchUserPortfolio().then(setPortfolio);
  }, []);

  if (!portfolio) return <p>Loading your coins...</p>;

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {portfolio.coins.map(coin => (
          <li key={coin.id}>
            {coin.name}: {coin.amount} coins
          </li>
        ))}
      </ul>
    </div>
  );
}

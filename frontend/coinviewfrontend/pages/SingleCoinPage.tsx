import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCoinInsight, fetchForecast } from '../api/api';
import CoinChart from '../components/charts/CoinChart';

export default function SingleCoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCoinInsight(id).then(setCoinData);
      fetchForecast(id).then(setForecast);
    }
  }, [id]);

  if (!coinData || !forecast) return <p>Loading...</p>;

  return (
    <div>
      <CoinChart data={coinData.chartData} />
      <div>
        <h3>Prediction using Moving Average:</h3>
        <pre>{JSON.stringify(forecast, null, 2)}</pre>
      </div>
    </div>
  );
}

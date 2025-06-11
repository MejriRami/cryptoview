import { useEffect, useState } from 'react';
import { fetchMarketOverview } from '../api/api';
import Top10VolumeChart from '../components/charts/Top10VolumeChart';
import PriceIncreaseChart from '../components/charts/PriceIncreaseChart';
import VolumeTrendChart from '../components/charts/VolumeTrendChart';

export default function LandingPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMarketOverview().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Top10VolumeChart data={data.top10Volume} />
      <PriceIncreaseChart data={data.priceIncrease30d} />
      <VolumeTrendChart data={data.volume7dTrend} />
    </div>
  );
}

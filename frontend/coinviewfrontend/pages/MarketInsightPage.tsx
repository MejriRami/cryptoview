import { useEffect, useState } from 'react';
import { fetchMarketInsightsByDate } from '../api/api';
import MarketCapInsight from '../components/charts/MarketCapInsight';
import VolumeInsight from '../components/charts/VolumeInsight';

export default function MarketInsightPage() {
  const [date, setDate] = useState('2025-06-01');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMarketInsightsByDate(date).then(setData);
  }, [date]);

  return (
    <div>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {data ? (
        <>
          <MarketCapInsight data={data.marketCap} />
          <VolumeInsight data={data.volume} />
        </>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
}

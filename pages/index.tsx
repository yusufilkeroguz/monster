import { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';

import { Currency } from '@/components/Currency';
import { IStoreEvents, IStoreState } from '@/store/interface';
import { useFilteredCurrencies } from '@/hooks/useFilteredCurrencies';
import { Table } from '@/components/Table';

export default function Home() {
  const { selected, translates, rates, dispatch } = useStoreon<
    IStoreState,
    IStoreEvents
  >('currencies', 'selected', 'translates', 'rates');

  const filteredCurrencies = useFilteredCurrencies();
  const [fetchCount, setFetchCount] = useState<number>(1);

  useEffect(() => {
    dispatch('currency/fetch/all-currencies');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * I listen to fetchCount to update the exchange rate every minute and when component mounted
   * If you write it like below, it will be called only every minute
   */
  useEffect(() => {
    dispatch('currency/fetch/exchange-rate', fetchCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFetchCount((prevCount) => prevCount + 1);
    }, 1000 * 5); // 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container mx-auto flex justify-center items-center mt-10 flex-wrap">
      <div className="flex flex-nowrap">
        <span className="text-5xl font-semibold mr-10">
          1 {translates[selected]}
        </span>
        <span className="flex justify-between space-x-4">
          {filteredCurrencies.map((currency) => (
            <Currency key={`currency_${currency}`} currency={currency} />
          ))}
        </span>
      </div>

      <div className="w-full">
        <Table />
      </div>
    </main>
  );
}

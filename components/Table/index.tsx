import { Fragment } from 'react';
import { useStoreon } from 'storeon/react';
import { twMerge } from 'tailwind-merge';

import { useFilteredCurrencies } from '@/hooks/useFilteredCurrencies';
import { IStoreEvents, IStoreState, TCurrencies } from '@/store/interface';

export const Table = () => {
  const { translates, rates } = useStoreon<IStoreState, IStoreEvents>(
    'translates',
    'rates',
  );
  const filteredCurrencies = useFilteredCurrencies();

  const renderRates = (currency: TCurrencies) => {
    const rate = rates.find((rate) => rate.currency === currency);
    const rateLast = rates.findLast((rate) => rate.currency === currency);

    return (
      <Fragment key={`rate_${rate}`}>
        <td className="border border-gray-400 px-4 py-2">{rate?.date}</td>
        <td
          className={twMerge(
            'border border-gray-400 px-4 py-2',
            rateLast?.rate && rate?.rate && rateLast?.rate !== rate?.rate
              ? rateLast?.rate > rate?.rate
                ? 'bg-green-800'
                : 'bg-red-800'
              : 'bg-transparent',
          )}
        >
          {rate?.rate}
        </td>
      </Fragment>
    );
  };

  return (
    <table className="w-full text-center mt-10 bg-gray-50 table">
      <thead>
        <tr>
          {['Kod', 'İsmi', 'Tarih', 'Değer'].map((title) => (
            <th
              className="bg-gray-300 border border-gray-400 px-4 py-2"
              key={`table-head_${title}`}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredCurrencies.map((currency) => (
          <tr key={`row_${currency}`}>
            <td className="border border-gray-400 px-4 py-2 bg-gray-100">
              {currency}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {translates[currency]}
            </td>
            {renderRates(currency)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

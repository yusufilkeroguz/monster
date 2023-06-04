import { FC } from 'react';
import { useStoreon } from 'storeon/react';

import { IStoreEvents, IStoreState } from '@/store/interface';
import { ICurrencyProps } from './interface';

/**
 * @name Currency
 * @description Its button for change selected currency
 * @param ICurrencyProps
 * @returns ReactNode
 */
export const Currency: FC<ICurrencyProps> = ({ currency }) => {
  const { dispatch } = useStoreon<IStoreState, IStoreEvents>('selected');
  const onClick = () => {
    dispatch('currency/set/selected', currency);
    dispatch('currency/fetch/exchange-rate', 1);
  };

  return (
    <button
      className="px-12 py-2 bg-gray-200 border border-gray-300 rounded-lg uppercase"
      onClick={onClick}
    >
      {currency}
    </button>
  );
};

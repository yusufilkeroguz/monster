import { useStoreon } from 'storeon/react';

import { IStoreEvents, IStoreState } from '@/store/interface';

export const useFilteredCurrencies = () => {
  const { currencies, selected } = useStoreon<IStoreState, IStoreEvents>(
    'currencies',
    'selected',
  );

  return currencies.filter((currency) => selected !== currency);
};

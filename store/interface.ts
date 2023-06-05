/**
 * @name TCurrencies
 * @description Currency types
 */
export type TCurrencies = 'usd' | 'try' | 'eur' | 'gbp' | 'jpy' | 'cny';

export enum ECurrencySymbols {
  usd = '$',
  try = '₺',
  eur = '€',
  gbp = '£',
  jpy = '¥',
  cny = '¥',
}

export type TTranslates = {
  [key in TCurrencies]: string;
};

export type TRates = {
  date: string;
  rate: number;
  currency: TCurrencies;
  fetchCount: number;
  symbol: string;
  prefix: boolean;
};

/**
 * @name IStoreState
 * @description Store state interface
 */
export interface IStoreState {
  translates: TTranslates;
  currencies: Array<TCurrencies>;
  selected: TCurrencies;
  rates: Array<TRates>;
}

export interface IStoreEvents {
  'currency/set/selected': TCurrencies;
  'currency/set/translates': IStoreState['translates'];
  'currency/set/rates': TRates;
  'currency/fetch/all-currencies': undefined;
  'currency/fetch/exchange-rate': number;
}

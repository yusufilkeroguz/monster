import { createStoreon, StoreonModule } from 'storeon';
import { IStoreEvents, IStoreState, TRates } from './interface';

const INITIAL_STATE: IStoreState = {
  /**
   * Types are correct but when to set a value to translate its giving error.
   * Thats why I added this to prevent errors for Typescript.
   */
  translates: {
    cny: '',
    eur: '',
    gbp: '',
    jpy: '',
    try: '',
    usd: '',
  },
  /**
   * Default Currencies
   */
  currencies: ['usd', 'try', 'eur', 'gbp', 'jpy', 'cny'],
  /**
   * Initial selected
   */
  selected: 'usd',
  rates: [],
};

const counterModule: StoreonModule<IStoreState, IStoreEvents> = (store) => {
  store.on('@init', () => INITIAL_STATE);
  /**
   * @name currency/set/selected
   */
  store.on('currency/set/selected', (state, currency) => {
    return {
      ...state,
      rates: [],
      selected: currency,
    };
  });
  /**
   * @name currency/set/translates
   */
  store.on('currency/set/translates', (state, translates) => ({
    ...state,
    translates,
  }));
  /**
   * @name currency/set/rates
   */
  store.on('currency/set/rates', (state, rate) => {
    // Delete old rate
    const rates = [...state.rates, rate]
      .filter((currentRate) => rate.fetchCount - 2 < currentRate.fetchCount)
      .sort((a, b) => (a.fetchCount < b.fetchCount ? 1 : -1));

    return {
      ...state,
      rates,
    };
  });
  /**
   * @name currency/fetch/all-currencies
   */
  store.on('currency/fetch/all-currencies', async () => {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
    );

    const translates = await response.json();

    store.dispatch('currency/set/translates', translates);
  });
  /**
   * @name currency/fetch/exchange-rate
   */
  store.on('currency/fetch/exchange-rate', async (state, fetchCount) => {
    const { selected, currencies } = state;

    currencies
      .filter((currency) => currency !== selected)
      .map((currency) => {
        fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selected}/${currency}.json`,
        )
          .then((res) => res.json())
          .then((res) => {
            const data: TRates = {
              date: res.date as string,
              rate: res[currency] as number,
              currency,
              fetchCount,
            };
            store.dispatch('currency/set/rates', data);
          });
      });
  });
};

export default createStoreon<IStoreState, IStoreEvents>([counterModule]);

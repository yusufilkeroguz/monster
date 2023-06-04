import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { StoreContext } from 'storeon/react';

import store from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import store from '@/store';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

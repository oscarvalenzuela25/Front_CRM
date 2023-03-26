import '@/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import OrderProvider from '@/context/order/OrderProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <OrderProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </OrderProvider>
  );
};

export default App;

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { Provider as UrqlProvider } from "urql";
import { store } from "../redux/store";
import Head from "next/head";
import createUrqlClient from "../urql/createUrqlClient";
import InfoBar from "../components/InfoBar";
import SearchBar from "../components/SearchBar";
import FriendSuggestions from "../components/FriendSuggestions";
import Trendings from "../components/Trendings";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={createUrqlClient}>
      <Provider store={store}>
        <Head>
          <title>Booking App</title>
          <meta
            name="description"
            content="A lightweight booking app, welcome!"
            key="desc"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UrqlProvider>
  );
}

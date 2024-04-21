import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <title>FastChat</title>
  </Head>;
  return <Component {...pageProps} />;
}

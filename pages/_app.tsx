import Head from "next/head";
import "/styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Header from "../components/Header";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>俺ブログ</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <Header />
        <Component {...pageProps} />
      </body>
    </CacheProvider>
  );
};

export default MyApp;

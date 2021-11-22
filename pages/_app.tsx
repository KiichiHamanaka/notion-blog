import Head from "next/head";
import "/styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider, css, EmotionCache } from "@emotion/react";

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
        <Component {...pageProps} />
      </body>
    </CacheProvider>
  );
};

export default MyApp;

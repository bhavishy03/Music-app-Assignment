// pages/_app.js
import '../styles/globals.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Music</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
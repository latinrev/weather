import "@/styles/globals.css";
import { Staatliches as MyFont } from "next/font/google";
/* import { Unlock as MyFont } from "next/font/google"*/
/* import { Alata as MyFont } from "next/font/google"; */

const righteous = MyFont({ weight: "400", display: "swap", subsets: ["latin"], variable: "--font-righteous" });
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>How&apos;s the weather?</title>
      </Head>
      <main className={righteous.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

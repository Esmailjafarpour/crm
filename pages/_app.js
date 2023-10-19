import '../styles/globals.css';
import Layout from "@/layout/Layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Head>
        <title>Jafarpour Crm</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  ) 
}

export default MyApp;

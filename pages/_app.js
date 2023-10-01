import '../styles/globals.css';
import Layout from "@/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Head>
        <title>Jafarpour Crm</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp;

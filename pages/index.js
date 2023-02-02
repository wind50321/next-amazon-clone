import Head from 'next/head';
import axios from 'axios';

import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ProductFeed from '@/components/ProductFeed';

export default function Home({ products }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return { props: { products: data } };
}

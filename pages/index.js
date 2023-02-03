import Head from 'next/head';

import Banner from '@/components/product/Banner';
import ProductFeed from '@/components/product/ProductFeed';

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Banner />
      <ProductFeed products={products} />
    </>
  );
}

import axios from 'axios';

export async function getStaticProps() {
  const { data } = await axios.get('https://fakestoreapi.com/products');

  return {
    props: { products: data },
    revalidate: 10,
  };
}

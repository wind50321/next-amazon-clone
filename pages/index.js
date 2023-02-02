import axios from 'axios';

import Banner from '@/components/product/Banner';
import ProductFeed from '@/components/product/ProductFeed';

export default function Home({ products }) {
  return (
    <>
      <Banner />
      <ProductFeed products={products} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return { props: { products: data } };
}

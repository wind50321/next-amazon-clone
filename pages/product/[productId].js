import Head from 'next/head';

import ProductDetail from '@/components/product/ProductDetail';

export default function ProductDetails({ product }) {
  return (
    <>
      <Head>
        <title>Product Details</title>
      </Head>
      <ProductDetail
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        category={product.category}
        image={product.image}
        rating={product.rating}
      />
    </>
  );
}

import axios from 'axios';

export async function getStaticPaths() {
  const { data: products } = await axios.get(
    'https://fakestoreapi.com/products'
  );

  return {
    fallback: false,
    paths: products.map((product) => ({
      params: { productId: product.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { productId } = context.params;

  const { data: product } = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );

  return { props: { product } };
}

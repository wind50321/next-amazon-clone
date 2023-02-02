import Image from 'next/image';

export default function OrderProduct({ quantity, image }) {
  return (
    <>
      {Array(quantity)
        .fill()
        .map((_, i) => (
          <Image
            key={i}
            className="w-20 sm:w-32 aspect-square object-contain"
            width={200}
            height={200}
            src={image}
            alt="product"
          />
        ))}
    </>
  );
}

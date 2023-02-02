import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

import { addToBasket } from '@/store/basketSlice';
import formatCurrency from '@/utilities/formatCurrency';

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  const dispatch = useDispatch();

  const hasPrime = rating.rate >= 4;

  function addItemToBasket() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
      quantity: 1,
    };

    dispatch(addToBasket(product));
  }

  return (
    <div className="relative z-30 flex flex-col m-5 p-10 bg-white">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image
        className="aspect-square object-contain mx-auto"
        width={200}
        height={200}
        src={image}
        alt="product"
      />

      <h4 className="my-3">{title}</h4>

      {/* Rating */}
      <div className="flex -ml-0.5">
        {Array(Math.floor(rating.rate))
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="my-2 text-xs line-clamp-2">{description}</p>

      {/* Price */}
      <div className="mb-5">{formatCurrency(price)}</div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image width={48} height={48} src="/images/prime.png" alt="prime" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}

      <button className="button mt-auto" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

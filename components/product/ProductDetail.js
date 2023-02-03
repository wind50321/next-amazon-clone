import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

import { addToBasket } from '@/store/basketSlice';
import formatCurrency from '@/utilities/formatCurrency';

export default function ProductDetail({
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
    <div className="relative flex flex-col lg:flex-row m-5 p-10 bg-white">
      <p className="absolute top-2 right-2 italic text-gray-400">{category}</p>

      {/* Image */}
      <div className="flex-1 m-5">
        <Image
          className=" aspect-square object-contain mx-auto"
          width={300}
          height={300}
          src={image}
          alt="product"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col items-center lg:items-start">
        <h4 className="my-5 text-xl">{title}</h4>

        {/* Rating */}
        <div className="flex">
          {Array(Math.floor(rating.rate))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-6 text-yellow-500" />
            ))}
        </div>

        <p className="my-5 text-gray-500">{description}</p>

        {/* Price */}
        <div className="mb-5 text-xl">{formatCurrency(price)}</div>

        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-3">
            <Image width={64} height={64} src="/images/prime.png" alt="prime" />
            <p className="text-gray-500">Free Next-day Delivery</p>
          </div>
        )}

        <button className="button my-2 text-lg" onClick={addItemToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}

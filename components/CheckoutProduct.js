import { useDispatch } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { addToBasket, removeFromBasket } from '@/store/basketSlice';
import formatCurrency from '@/utilities/formatCurrency';

export default function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
  quantity,
}) {
  const dispatch = useDispatch();

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

  function removeItemFromBasket() {
    dispatch(removeFromBasket({ id }));
  }

  return (
    <div className="flex">
      {/* Left */}
      <div className="w-1/5">
        <Image
          className="aspect-square object-contain min-w-[80px] mx-auto"
          width={200}
          height={200}
          src={image}
          alt="product"
        />
      </div>

      {/* Middle */}
      <div className="w-3/5 mx-5">
        <h4 className="mb-2">{title}</h4>

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
        <div>
          {formatCurrency(price)}
          <span className="ml-4 font-bold">x{quantity}</span>
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <Image width={48} height={48} src="/images/prime.png" alt="prime" />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="w-1/5 flex flex-col space-y-2 justify-center">
        <button className="button" onClick={addItemToBasket}>
          Add
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove
        </button>
      </div>
    </div>
  );
}

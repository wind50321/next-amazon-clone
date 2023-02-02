import moment from 'moment';

import OrderProduct from './OrderProduct';
import formatCurrency from '@/utilities/formatCurrency';

export default function Order({
  id,
  amount,
  amountShipping,
  items,
  timestamp,
}) {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative border rounded-md">
      {/* Top */}
      <div className="flex items-center p-5 space-x-10 bg-gray-100 text-gray-600 text-sm">
        {/* Left */}
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
        </div>
        {/* Middle */}
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            {formatCurrency(amount)} - Next Day Delivery{' '}
            {formatCurrency(amountShipping)}
          </p>
        </div>
        {/* Right */}
        <p className="flex-1 self-end text-right text-sm sm:text-xl text-blue-500 whitespace-nowrap">
          {totalQuantity} item(s)
        </p>
        {/* Order ID */}
        <p className="absolute top-2 right-2 w-1/3 text-xs truncate">
          ORDER # {id}
        </p>
      </div>

      {/* Bottom */}
      <div className="p-5">
        <div className="flex space-x-6 overflow-x-auto">
          {items.map((item) => (
            <OrderProduct
              key={item.id}
              quantity={item.quantity}
              image={item.price.product.images[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

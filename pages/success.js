import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function Success() {
  return (
    <div className="p-10 bg-white">
      <div className="flex items-center space-x-2 mb-5">
        <CheckCircleIcon className="h-10 text-green-500" />
        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
      </div>
      <p>
        Thank you for shopping with us. We&#39;ll send a confirmation once your
        item has shipped. If you would like to check the status of your
        order(s), please press the link below.
      </p>
      <div className="mt-8 text-center">
        <Link href="/orders" className="button px-20">
          Go to my orders
        </Link>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

import { selectTotalQuantity } from '@/store/basketSlice';

export default function Header() {
  const { data: session } = useSession();

  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center py-3 bg-amazon">
        {/* Logo */}
        <div className="flex-grow sm:flex-grow-0">
          <Link href="/">
            <Image
              priority
              className="mx-4"
              width={120}
              height={40}
              src="/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 flex-grow rounded-md cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="w-6 h-full px-3 py-2 flex-grow rounded-l-md focus:outline-none"
          />
          <MagnifyingGlassIcon strokeWidth={3} className="w-12 p-4" />
        </div>

        {/* Right */}
        <div className="flex items-center mx-3 sm:mx-6 space-x-3 sm:space-x-6 text-xs text-white whitespace-nowrap">
          <div className="link" onClick={session ? signOut : signIn}>
            <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <Link href="/orders" className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </Link>
          <Link href="/checkout" className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 w-4 h-4 bg-yellow-400 text-black font-bold text-center rounded-full">
              {totalQuantity}
            </span>
            <ShoppingCartIcon className="w-10" />
            <p className="font-extrabold md:text-sm hidden md:block mt-2">
              Basket
            </p>
          </Link>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center py-2 px-5 space-x-3 text-sm bg-amazon-light text-white whitespace-nowrap overflow-x-auto no-scrollbar">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link">Electronics</p>
        <p className="link">Food & Grocery</p>
        <p className="link">Prime</p>
        <p className="link">Buy Again</p>
        <p className="link">Shopper Toolkit</p>
        <p className="link">Health & Personal Care</p>
      </div>
    </header>
  );
}

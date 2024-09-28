import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center py-4 px-6 bg-white border-b border-gray-200">
      <div className="flex-shrink-0">
        <Link href="/" className="text-xl font-bold">
          DaVoice
        </Link>
      </div>

      <div className="hidden md:flex space-x-10">
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Home
        </Link>
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Resources
        </Link>
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Browse
        </Link>
        <Link href="/" className="text-gray-800 hover:text-red-600">
          Other Route
        </Link>
      </div>

      {/* <Search /> */}
    </nav>
  );
};

export default Navbar;

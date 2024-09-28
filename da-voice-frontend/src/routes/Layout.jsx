import { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "../contexts/location";
import { Outlet } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const Layout = () => {
  const { location, zipcode, error } = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">DaVoice</h1>
            </div>
            <div className="flex space-x-4 mx-auto">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Representatives
              </Link>
              <Link
                to="/elections"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Elections
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </Link>
            </div>
            <div className="hidden sm:block text-gray-300">
              {location.lat ? (
                <p className="text-sm">{zipcode}</p>
              ) : (
                <p className="text-sm">
                  {error ? error : "Loading location..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <div className="w-2/3 h-full">
          <MapComponent />
        </div>

        <div className="w-1/3 h-full p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <footer className="p-4 bg-gray-200 text-center">
        <p>Additional Information or Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;

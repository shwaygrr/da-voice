"use client"

import React, { createContext, useEffect, useState, useContext  } from 'react';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
          },
          (err) => {
            switch (err.code) {
              case err.PERMISSION_DENIED:
                setError('User denied the request for Geolocation.');
                break;
              case err.POSITION_UNAVAILABLE:
                setError('Location information is unavailable.');
                break;
              case err.TIMEOUT:
                setError('The request to get user location timed out.');
                break;
              case err.UNKNOWN_ERROR:
                setError('An unknown error occurred.');
                break;
              default:
                setError('An error occurred while fetching location.');
            }
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  console.log(location)
  return (
    <LocationContext.Provider value={{ location, error }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);


export { LocationProvider, useLocation };

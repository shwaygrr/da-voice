import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [zipcode, setZipcode] = useState(null);
  const [error, setError] = useState(null);

  const getZipcode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      if (data.address && data.address.postcode) {
        setZipcode(data.address.postcode);
      } else {
        setZipcode("No zipcode found");
      }
    } catch (err) {
      console.error("Error in reverse geocoding:", err);
      setZipcode("Error fetching zipcode");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });

          // Get the zipcode using the coordinates
          getZipcode(lat, lon);
        },
        (err) => {
          setError(err.message);
          console.error("Error getting location:", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, zipcode, error }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { useLocation, LocationProvider };

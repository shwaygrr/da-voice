import { createContext, useState, useEffect, useContext, useRef } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState(null);
  const hasFetchedLocation = useRef(false); // Ref to track if we have already fetched location

  const getZipcode = async (lat, lon) => {
    if (zipcode) return; // Prevent fetching if zipcode is already set

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
      setZipcode("10001");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });

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

  console.log(zipcode)

  return (
    <LocationContext.Provider value={{ location, zipcode, setZipcode, error }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { useLocation, LocationProvider };

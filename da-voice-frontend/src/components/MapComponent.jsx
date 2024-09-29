import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../contexts/location";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const UpdateMapCenter = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location.lat && location.lon) {
      map.setView([location.lat, location.lon], map.getZoom());
    } 
  }, [location, map]);

  return null;
};

const MapComponent = () => {
  const { location, zipcode, setLocation } = useLocation();
  const [address, setAddress] = useState("");
  const [isGeolocationUsed, setIsGeolocationUsed] = useState(false);

  const defaultLocation = { lat: 40.7128, lon: -74.0060 };

  const getCoordinatesFromZipcode = async (zipcode) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&countrycodes=us&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setLocation({ lat, lon });
      }
    } catch (err) {
      console.error("Error fetching coordinates from zip code:", err);
    }
  };

  const getCityAndState = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village;
      const state = data.address.state;
      return `${city}, ${state}`;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Unknown location";
    }
  };

  useEffect(() => {
    if (zipcode.length === 5) {
      getCoordinatesFromZipcode(zipcode);
    }
  }, [zipcode]);

  useEffect(() => {
    if (!isGeolocationUsed) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });

          const locationName = await getCityAndState(latitude, longitude);
          setAddress(locationName);

          setIsGeolocationUsed(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation(defaultLocation);
          setIsGeolocationUsed(true);
        }
      );
    }
  }, [setLocation, isGeolocationUsed]);

  const currentLocation = location && location.lat && location.lon ? location : defaultLocation;

  return (
    <div className="h-full w-full">
      <MapContainer center={[currentLocation.lat, currentLocation.lon]} zoom={9} style={{ height: "100%", width: "100%" }}>
        <UpdateMapCenter location={currentLocation} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLocation.lat && currentLocation.lon && (
          <Marker position={[currentLocation.lat, currentLocation.lon]}>
            <Popup>
              You are here: <br /> {address || "Loading..."}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

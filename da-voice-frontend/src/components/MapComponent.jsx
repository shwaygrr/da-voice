import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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
    map.setView(location, map.getZoom());
  }, [location, map]);

  return null;
};

const MapComponent = () => {
  const [location, setLocation] = useState([25.76, -80.37]);
  const [address, setAddress] = useState("");

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
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
        
        const locationName = await getCityAndState(latitude, longitude);
        setAddress(locationName);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocation([40.7128, -74.0060]);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer center={location} zoom={9} style={{ height: "100%", width: "100%" }}>
        <UpdateMapCenter location={location} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={location}>
          <Popup>
            You are here: <br /> {address || "Loading..."}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

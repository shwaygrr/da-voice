import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  const [location, setLocation] = useState([25.76, -80.37]); // Default location (London)

  useEffect(() => {
    // Attempt to get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location", error);
        // Fallback to a default location if geolocation fails (New York City in this case)
        setLocation([40.7128, -74.0060]); // New York City
      }
    );
  }, []);

  return (
    <div className="h-full w-full"> {/* Ensure the map container takes full height and width */}
      <MapContainer center={location} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            You are here: <br /> {location[0].toFixed(2)}, {location[1].toFixed(2)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

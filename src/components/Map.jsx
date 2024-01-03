import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import { useState } from "react";
import { useEffect } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([32, 35]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPos,
    getPostion,
  } = useGeoLocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (geoLocationPos)
      setMapPosition([geoLocationPos.lat, geoLocationPos.lng]);
  }, [geoLocationPos]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPos && (
        <Button type="position" onClick={getPostion}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <MapPositionChange position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

const MapPositionChange = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;

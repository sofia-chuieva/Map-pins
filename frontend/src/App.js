import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 6,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken="pk.eyJ1Ijoic3VwZXJzb25pazAwMiIsImEiOiJjbGQyNDdtYXcwNTY0M3FvMHR5MWxlOTNhIn0.7p9dBpNC0r7agArQmP4H0w"
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={2.294694}
        latitude={48.858093}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <LocationOnIcon fontSize="large" />
      </Marker>
    </Map>
  );
}
export default App;

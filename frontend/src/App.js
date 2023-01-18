import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./app.css";

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
        <LocationOnIcon fontSize="large" color="primary" />
      </Marker>
      {/* <Popup longitude={2.294694} latitude={48.858093} anchor="left">
        <div className="popup">
          <label>Place</label>
          <h4 className="place-name">Eiffell Tower</h4>
          <label>Review</label>
          <p className="description">Beautiful place</p>
          <label>Rating</label>
          <div className="stars">
            <StarIcon className="star" />
            <StarIcon className="star" />
            <StarIcon className="star" />
            <StarIcon className="star" />
            <StarIcon className="star" />
          </div>
          <label>Information </label>
          <span className="username">
            Created by <b>Bob</b>
          </span>
          <span className="date">1 hour ago</span>
        </div>
  </Popup> */}
    </Map>
  );
}
export default App;

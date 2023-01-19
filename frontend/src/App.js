import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 6,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken="pk.eyJ1Ijoic3VwZXJzb25pazAwMiIsImEiOiJjbGQyNDdtYXcwNTY0M3FvMHR5MWxlOTNhIn0.7p9dBpNC0r7agArQmP4H0w"
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {pins.map((pin, k) => (
        <>
          <Marker
            key={k}
            longitude={pin.long}
            latitude={pin.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <IconButton onClick={() => handleMarkerClick(pin._id)}>
              <LocationOnIcon fontSize="large" color="primary" />
            </IconButton>
          </Marker>
          {pin._id === currentPlaceId && (
            <Popup
              longitude={pin.long}
              latitude={pin.lat}
              anchor="left"
              onClose={() => setCurrentPlaceId(null)}
              closeButton={true}
              closeOnClick={false}
            >
              <div className="popup">
                <label>Place</label>
                <h4 className="place-name">{pin.title}</h4>
                <label>Review</label>
                <p className="description">{pin.description}</p>
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
                  Created by <b>{pin.username}</b>
                </span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}
export default App;

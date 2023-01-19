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
  let currentUser = "Elle";
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
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

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat.toArray();
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null); //not to see popup
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken="pk.eyJ1Ijoic3VwZXJzb25pazAwMiIsImEiOiJjbGQyNDdtYXcwNTY0M3FvMHR5MWxlOTNhIn0.7p9dBpNC0r7agArQmP4H0w"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      {pins.map((pin) => (
        <>
          <Marker
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
              key={pin._id}
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
                  {Array(pin.rating).fill(<StarIcon className="star" />)}
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
      {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="enter a title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <label>Review</label>
              <textarea
                placeholder="say smth"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="btn" type="submit">
                Add pin
              </button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
  );
}
export default App;

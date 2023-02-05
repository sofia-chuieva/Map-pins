import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import "./styles/app.css";
import axios from "axios";
import { format } from "timeago.js";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("user")
  );
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 6,
  });

  useEffect(() => {
    getPins();
  }, []);

  const getPins = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/pins`);
      setPins(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/pins/${id}`);
      getPins();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/pins`, {
        username: currentUser,
        title,
        description,
        rating,
        lat: newPlace.lat,
        long: newPlace.long,
      });

      setPins([...pins, res.data]);
      setNewPlace(null); //not to see popup
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAP_API}
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
                  <button
                    className="delete-btn"
                    disabled={currentUser !== pin.username}
                    onClick={() => handleDelete(pin._id)}
                  >
                    Delete
                  </button>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && currentUser && (
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
                  required
                  placeholder="enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  required
                  placeholder="say review"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select required onChange={(e) => setRating(e.target.value)}>
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

        <>
          {currentUser ? (
            <div className="containerLogOut">
              <h4 className="welcomeUser">Welcome, {currentUser}</h4>
              <button className="logout button" onClick={handleLogOut}>
                Logout
              </button>
            </div>
          ) : (
            <div className="buttons">
              <button
                className="login button"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className="register button"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          )}
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              setCurrentUser={setCurrentUser}
            />
          )}
        </>
      </Map>
    </div>
  );
}
export default App;

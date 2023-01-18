/*import Map from "react-map-gl";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  return (
    <Map
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoic3VwZXJzb25pazAwMiIsImEiOiJjbGQyNDdtYXcwNTY0M3FvMHR5MWxlOTNhIn0.7p9dBpNC0r7agArQmP4H0w"
    />
  );
}
*/
import * as React from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
function App() {
  const [viewState, setViewState] = React.useState({
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
    />
  );
}
export default App;

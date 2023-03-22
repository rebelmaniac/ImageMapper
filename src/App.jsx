import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayRoute from "./components/DisplayRoute";
import HighlightAreas from "./components/HighlightAreas";
import CreateRoute from "./components/CreateRoute";
import JSON from "./data/area.json"
import image from "./assets/rockWall.jpg";

const wall = {
  data: JSON,
  Image: image,
  dimentions: { width: 3024, height: 4032 },
};

export const RouteContext = React.createContext();

function App() {

  return (
      <div>
        <RouteContext.Provider value={wall}>
          <Router>
            <Routes>
              <Route path="/" element={<DisplayRoute />}></Route>
              <Route path="/RouteDisplay" element={<HighlightAreas />}></Route>
              <Route path="/CreateRoute" element={<CreateRoute />}></Route>
            </Routes>
          </Router>

        </RouteContext.Provider>
      </div>
  );
}

export default App;

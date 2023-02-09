import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container as BootstrapContainer } from "react-bootstrap";
import DisplayRoute from "./components/DisplayRoute";
import HighlightAreas from "./components/HighlightAreas";
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
    <BootstrapContainer
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <RouteContext.Provider value={wall}>
          <Router>
            <Routes>
              <Route path="/" element={<DisplayRoute />}></Route>
              <Route path="/RouteDisplay" element={<HighlightAreas />}></Route>
            </Routes>
          </Router>

        </RouteContext.Provider>
      </div>
    </BootstrapContainer>
  );
}

export default App;

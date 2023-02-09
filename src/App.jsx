import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container as BootstrapContainer } from "react-bootstrap";
import DisplayRoute from "./components/DisplayRoute";
import HighlightAreas from "./components/HighlightAreas";

function App() {
  return (
    <BootstrapContainer
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route path="/" element={<DisplayRoute />}></Route>
            <Route path="/RouteDisplay" element={<HighlightAreas />}></Route>
          </Routes>
        </Router>
      </div>
    </BootstrapContainer>
  );
}

export default App;

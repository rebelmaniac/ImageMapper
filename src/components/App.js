import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";

import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

import CreateRoute from "./CreateRoute";
import DisplayRoute from "./DisplayRoute";
import HighlightAreas from "./HighlightAreas";

import JSON from "../data/area.json";
import image from "../assets/rockWall.jpg";

const wall = {
  data: JSON,
  Image: image,
  dimentions: { width: 3024, height: 4032 },
};

export const RouteContext = React.createContext();

function App() {
  return (
    <Container>
      <div className="w-100">
        <RouteContext.Provider value={wall}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="update-profile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/DisplayRoute"
                  element={
                    <PrivateRoute>
                      <DisplayRoute />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/RouteDisplay"
                  element={
                    <PrivateRoute>
                      <HighlightAreas />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/CreateRoute"
                  element={
                    <PrivateRoute>
                      <CreateRoute />
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </RouteContext.Provider>
      </div>
    </Container>
  );
}

export default App;

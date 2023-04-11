import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="create-route">Create a Route</Link>
      </div>
      <div>
        <Link to="DisplayRoute">Display a Route</Link>
      </div>
    </>
  );
}

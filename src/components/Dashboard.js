import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { adaAddDoc } from "./add_ada_lovelace";
import { addAlanTuring } from "./add_alan_turing";
import { UserGrab } from "./get_all_users";

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Users</h2>
          <Button variant="info w-100 mt-3" onClick={() => adaAddDoc()}>
            Add Ada
          </Button>
          <Button variant="info w-100 mt-3" onClick={() => addAlanTuring()}>
            Add Alan
          </Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <UserGrab />
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

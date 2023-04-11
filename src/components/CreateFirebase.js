import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Alert,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

export default function CreateFirebase() {
  const nameRef = useRef();
  const gradeRef = useRef();

  const [newRoute, setNewRoute] = useState({});
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addRoute = async (e) => {
    e.preventDefault();
    console.log(nameRef);
    console.log(gradeRef);
    setNewRoute({
      name: nameRef.current.value,
      grade: gradeRef.current.value,
    });
    console.log(newRoute);
    try {
      setError("");
      setLoading(true);
      const docRef = await addDoc(collection(db, "routes"), {
        name: nameRef.current.value,
        grade: gradeRef.current.value,
      });
    } catch (e) {
      setError("Failed to add a New Route");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      await getDocs(collection(db, "routes")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRoutes(newData);
        console.log(routes, newData);
      });
    };

    fetchPost();
  }, []);

  return (
    <>
      <Card>
        <Card.Header>Create a Route</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={addRoute}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="17"
                ref={gradeRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Add Route
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <div>
          <ListGroup>
            {routes?.map((route, i) => (
              <ListGroupItem key={i}>
                {`${route.name} => ${route.grade}`}
                <Button>hey</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/">Dashboard</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/CreateRoute">CreateRoute</Link>
      </div>
    </>
  );
}

import React, { Fragment, useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";

import { RouteContext } from "./App";
import _ from "lodash"
import { Button, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

import { addRoute } from "./firebaseCalls/addRoute";
import { deleteRoute } from "./firebaseCalls/deleteRoute"
import { getRoutes } from "./firebaseCalls/getRoutes";

const CreateRoute = () => {
  const wall = useContext(RouteContext);
  const wallCopy = _.cloneDeep(wall)
  const wallData = wallCopy.data

  const { currentUser } = useAuth();
  const userID = currentUser.uid;

  const nameRef = useRef();
  const gradeRef = useRef();
  const descriptionRef = useRef();

  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  // const { innerWidth: width, innerHeight: height } = window;
  // console.log(innerWidth)
  const scale = imageWidth / 500;

  const [displayHolds, setDisplayHolds] = useState([...wallData]);

  const [highlightedAreas, setHighlightedAreas] = useState([]);
  const preFillColor = "#8980807c";

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisplayHolds((prev) => {
      return prev.map((cur) => {
        cur.coords = cur.coords.map((coord) => coord / scale)
        return cur
      })
    })
    
  }, [scale]);

  useEffect(() => {
    setDisplayHolds((prev) =>
      prev.map((cur) =>
        highlightedAreas.includes(cur.id) ? { ...cur, preFillColor } : cur
      )
    );
    // console.log(highlightedAreas)
  }, [highlightedAreas]);

  useEffect(() => {
    const fetchPost = async () => {
      await getRoutes().then((response) => {
        const allRoutes = [...response]
        setRoutes(allRoutes)
      })
    }

    fetchPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const holdsBuild = highlightedAreas.map((x) => ({ id: x }));
    addRoute(nameRef.current.value, gradeRef.current.value, descriptionRef.current.value, holdsBuild, userID)
      .then((response) => 
        {
          const newRoutes = [...routes, response]
          setRoutes(newRoutes)
          nameRef.current.value = "";
          gradeRef.current.value = "";
          descriptionRef.current.value = "";
          setHighlightedAreas([]);
        })
  }

  const handleDelete = (e,route) => {
    e.preventDefault()
    deleteRoute(route).then(() => {
      const routesWithoutCurrent = routes.filter(item => item.id !== route.id);
      setRoutes(routesWithoutCurrent)
    })
  }

  const handleEvent = (isClicked) => (area) => {
    // console.log(area);
    if (isClicked) {
      setHighlightedAreas((prev) => {
        return prev.includes(area.id)
          ? prev.filter((cur) => cur !== area.id)
          : [...prev, area.id];
      });
    }

    setDisplayHolds((prev) =>
      prev.map((cur) => {
        if (
          highlightedAreas.includes(cur.id)
        ) {
          return { ...cur, preFillColor };
        }

        return {
          ...cur,
          preFillColor: area.id === cur.id ? preFillColor : undefined,
        };
      })
    );
  };

  return (
    <>
      <Card>
        <Card.Body className="mx-auto">
          <ImageMapper
            src={URL}
            map={{
              name: "my-map",
              areas: displayHolds,
            }}
            active={false}
            onClick={handleEvent(true)}
            onMouseEnter={handleEvent(false)}
            width={500}
            rerenderProps={["map"]}
          />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/DisplayRoute">DisplayRoute</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/RouteDisplay">HighlightAreas</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/">DashBoard</Link>
      </div>
      <div>This is CreateRoute</div>
      <Card>
        <Card.Header>Route Details</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
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
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button variant="dark" style={{width: "50%"}}disabled={loading} type="submit">
              Add Route
            </Button>
          </Form>
          <h3>Route Holds</h3>
          <ul>
          {highlightedAreas.map((route) => (
                    <li id={route} key={route}>{route}</li>
                  ))}
          </ul>
        </Card.Body>
      </Card>
      <Card>
        <div>
          <ListGroup>
            {routes?.map((route, i) => (
              <ListGroupItem
                key={i}
                className="d-flex justify-content-between"
              >{`${route.name} => ${route.grade}`}<Button variant="danger" className="d-flex align-items-center justify-content-center" style={{ width: "25%", height: "25px" }} onClick={(e) => {handleDelete(e,route)}}>Delete</Button></ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Card>
    </>
  );
};

export default CreateRoute;

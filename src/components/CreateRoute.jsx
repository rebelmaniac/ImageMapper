import React, { Fragment, useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";

import { RouteContext } from "../App.jsx";
import _ from "lodash"
import { Button, Card, Form } from "react-bootstrap";

const CreateRoute = () => {
  const wall = useContext(RouteContext);
  const wallCopy = _.cloneDeep(wall)
  const wallData = wallCopy.data

  const nameRef = useRef();
  const gradeRef = useRef();

  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  // const { innerWidth: width, innerHeight: height } = window;
  // console.log(innerWidth)
  const scale = imageWidth / 500;

  const [displayHolds, setDisplayHolds] = useState([...wallData]);
  // console.log(displayHolds)
  const [highlightedAreas, setHighlightedAreas] = useState([]);
  const preFillColor = "#8980807c";

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
        <Link to="/">DisplayRoute</Link>
        <Link to="/RouteDisplay">HighlightAreas</Link>
      </div>
      <div>This is CreateRoute</div>
      <Card>
        <Card.Header>Route Details</Card.Header>
        <Card.Body>
          <Form>
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
                required
              ></Form.Control>
            </Form.Group>
          </Form>
          <h3>Route Holds</h3>
          <ul>
          {highlightedAreas.map((route) => (
                    <li id={route} key={route}>{route}</li>
                  ))}
          </ul>
          <Button variant="dark" style={{ width: "50%"}}>Submit Route</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateRoute;

import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";
import "../App.css";
import { RouteContext } from "../App.jsx";
import _ from "lodash"
import { ButtonGroup, Button, Card, Container } from "react-bootstrap";
import JSON from "../data/route.json"
import "../DisplayRoute.css"

const DisplayRoute = () => {
  const wall = useContext(RouteContext);
  const wallCopy = _.cloneDeep(wall)
  const wallData = wallCopy.data
  const routes = JSON;
  // const wallCopy = JSON.parse(JSON.stringify(wall.data))
  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  //const { innerWidth: width, innerHeight: height } = window;
  const scale = imageWidth / 500;

  const [displayRoutes, setDisplayRoutes] = useState([...wallData]);
  const [currentRoute, setCurrentRoute] = useState([])

  console.log(displayRoutes)
  const preFillColor = "#898080A3";

  useEffect(() => {
    setDisplayRoutes((prev) => {
      return prev.map((cur,index) => {
        cur.coords = cur.coords.map((coord) => coord / scale)
        return cur
      })
    })
    
  }, [scale]);

  useEffect(() => {
    setDisplayRoutes((prev) => prev.map((hold) => {
      if (currentRoute.holds) {
        return {
            ...hold,
            preFillColor: currentRoute.holds.some((e) => e.id === hold.id) ?   preFillColor : undefined
          };
      }
      return hold;
    }))
    
  }, [currentRoute]);

  return (
    <>    
      <Container fluid>
        <Card>
          <Card.Body>
            <ImageMapper
              src={URL}
              map={{
                name: "my-map",
                areas: displayRoutes
              }}
              active={true}
              width={500}
              rerenderProps={["map"]}
              disabled
            />
          </Card.Body>
        </Card>

      </Container>

      <div>
        <ButtonGroup>
            {routes.map((route) => (
                <Button id={route.id} key={route.id} type="button" onClick={() => setCurrentRoute(route)}>{route.title}</Button>
              ))}
        </ButtonGroup>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/RouteDisplay">DisplayRoute</Link>
      </div>
      <div>I am here what do you need</div>
    </>
  );
};

export default DisplayRoute;

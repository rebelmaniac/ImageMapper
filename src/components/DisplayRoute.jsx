import React, { Fragment, useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";

import { RouteContext } from "./App";
import _ from "lodash"
import { ButtonGroup, Button, Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import JSON from "../data/route.json"

const DisplayRoute = () => {
  const wall = useContext(RouteContext);
  const wallCopy = _.cloneDeep(wall)
  const wallData = wallCopy.data
  // const routes = JSON;
  //console.log(routes)

  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  //const { innerWidth: width, innerHeight: height } = window;
  const scale = imageWidth / 500;

  const [displayRoutes, setDisplayRoutes] = useState([...wallData]);
  const [currentRoute, setCurrentRoute] = useState([]);
  const [routes, setRoutes] = useState([]);

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
      <Container fluid>
        <Card style={{ width: "50%"}} className="mx-auto">
          <Card.Header as="h4">{currentRoute.title}</Card.Header>
          <Card.Body className="mx-auto">
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

      <div className="w-100 text-center">
        <ButtonGroup className="mx-auto">
            {routes.map((route) => (
                <Button id={route.id} key={route.id} type="button" variant="dark" className="mx-auto" onClick={() => setCurrentRoute(route)}>{route.name}</Button>
              ))}
        </ButtonGroup>
      </div>
      <div>
      <ListGroup>
            {routes?.map((route, i) => (

              <ListGroupItem
                key={i}
              >
                <div>
                  {`${route.name} => ${route.grade}`}
                </div>
                <div>
                  {route.holds.map((hold) => (
                    <div>{hold.id}</div>
                  ))}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/RouteDisplay">HighlightAreas</Link>
        <Link to="/CreateRoute">CreateRoute</Link>
      </div>
      <div className="text-center">This is Display Routes</div>
    </>
  );
};

export default DisplayRoute;

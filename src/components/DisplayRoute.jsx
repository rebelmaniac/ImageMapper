import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";
import "../App.css";
import { RouteContext } from "../App.jsx";

const DisplayRoute = () => {
  //Wall is the data from area.json. It is currently being directly manipulated in some way
  const wall = useContext(RouteContext)
  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  //const { innerWidth: width, innerHeight: height } = window;
  const scale = imageWidth / 500;
  const [displayAreas, setDisplayAreas] = useState([...wall.data]);
  const [highlightedAreas, setHighlightedAreas] = useState([]);
  const preFillColor = "#8980807c";

  useEffect(() => {
    const coordScale = () => {
      let newAreas = [...wall.data];
      newAreas = newAreas.map((cur) => {
        cur.coords = cur.coords.map((coord) => coord / scale);
        return cur;
      });
      setDisplayAreas(newAreas);
    };
    coordScale();
  }, [scale, wall]);

  useEffect(() => {
    setDisplayAreas((prev) =>
      prev.map((cur) =>
        highlightedAreas.includes(cur.id) ? { ...cur, preFillColor } : cur
      )
    );
  }, [highlightedAreas]);

  const handleEvent = (isClicked) => (area) => {
    // WINDOW ID IS 21a3befd-c97b-476d-8e0c-7c98399988bf IN AREA.JSON
    // REFRIGERATOR ID IS 5998531a-25b3-4288-adbe-53c4470a369b IN AREA.JSON
    const refrigeratorId = "5998531a-25b3-4288-adbe-53c4470a369b";
    const windowId = "21a3befd-c97b-476d-8e0c-7c98399988bf";
    // console.log(area);
    if (isClicked) {
      setHighlightedAreas((prev) => {
        return prev.includes(area.id)
          ? prev.filter((cur) => cur !== area.id)
          : [...prev, area.id];
      });
    }

    setDisplayAreas((prev) =>
      prev.map((cur) => {
        if (
          highlightedAreas.includes(cur.id) ||
          (area.id === windowId && cur.id === refrigeratorId)
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
      <div>
        <ImageMapper
          src={URL}
          map={{
            name: "my-map",
            areas: displayAreas,
          }}
          active={false}
          onClick={handleEvent(true)}
          onMouseEnter={handleEvent(false)}
          width={500}
          rerenderProps={["map"]}
        />
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/RouteDisplay">DisplayRoute</Link>
      </div>
      <div>I am here what do you need</div>
    </>
  );
};

export default DisplayRoute;

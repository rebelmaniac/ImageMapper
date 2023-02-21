import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ImageMapper from "react-img-mapper";
import "../App.css";
import { RouteContext } from "../App.jsx";
import _ from "lodash"

const HighlightAreas = () => {
  const wall = useContext(RouteContext);
  const wallCopy = _.cloneDeep(wall)
  const wallData = wallCopy.data
  // const wallCopy = JSON.parse(JSON.stringify(wall.data))
  const URL = wall.Image;
  const imageWidth = wall.dimentions.width;
  //const { innerWidth: width, innerHeight: height } = window;
  const scale = imageWidth / 500;

  const [displayHolds, setDisplayHolds] = useState([...wallData]);
  console.log(displayHolds)
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
      <div>
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
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/">DisplayRoute</Link>
      </div>
      <div>I am here what do you need</div>
    </>
  );
};

export default HighlightAreas;

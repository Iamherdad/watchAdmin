import React, { useEffect, useState } from "react";
import "./index.scss";
const screenDisplay = true;
const COLOR_STYLE_LIST = [
  {
    opacity: 0,
  },
  {
    opacity: 0.2,
  },
  {
    opacity: 0.3,
  },
  {
    opacity: 0.4,
  },
  {
    opacity: 0.5,
  },
  {
    opacity: 0.6,
  },
  {
    opacity: 0.7,
  },
  {
    opacity: 0.8,
  },
  {
    opacity: 0.9,
  },
  {
    opacity: 1,
  },
];
let time = null;
let count = 0;
export default function index(props) {
  const [ledAnimationArray, setLedArr] = useState([]);

  useEffect(() => {
    setLedArr(props.workInfo.ledAnimationArray[0]);
  }, []);

  return (
    <div className="work">
      <div className="dark-box">
        {ledAnimationArray.map((ite, ind) => {
          return <div key={ind} className=" item dark-item"></div>;
        })}
      </div>
      <div className="bright-box">
        {ledAnimationArray.map((ite, ind) => {
          return (
            <div
              key={ind}
              className=" item  bright-item"
              style={COLOR_STYLE_LIST[ite]}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

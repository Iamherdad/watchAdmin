import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "antd";
import Icon from "@/components/icon";
import {
  setWork,
  setBrush,
  setWorkname,
  clearWork,
} from "@/store/modules/demo";
import classnames from "classnames";
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

export default function index(props) {
  const dispatch = useDispatch();
  const currentBrush = useSelector((store) => store.demolSlice.currentBrush);
  const work = useSelector((store) => store.demolSlice.work);
  //   const iptVal = useSelector((store) => store.demolSlice.workName);

  const [paintbrush, setPaintbrush] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleClick = (ind) => {
    dispatch(setWork({ ind }));
  };

  const opacityComputed = (ind) => {
    return ind === 0
      ? {
          opacity: 0.5,
          backgroundColor: "#333",
        }
      : COLOR_STYLE_LIST[ind];
  };
  const brushClick = (ind) => {
    dispatch(setBrush({ currentBrush: ind }));
  };

  const iptChange = (e) => {
    dispatch(setWorkname({ workName: e.target.value }));
  };

  const removeWork = () => {
    dispatch(clearWork());
  };
  return (
    <div className="edit-box">
      <div className="ipt">
        <Input placeholder="输入名称" onChange={iptChange}></Input>
      </div>
      <div className="work-box">
        <div className="dark-box">
          {work.map((ite, ind) => {
            return <div key={ind} className=" item dark-item"></div>;
          })}
        </div>
        <div className="bright-box">
          {work.map((ite, ind) => {
            return (
              <div
                key={ind}
                className="item bright-item"
                style={COLOR_STYLE_LIST[ite]}
                onClick={() => handleClick(ind)}
              ></div>
            );
          })}
        </div>
        <div className="remove" onClick={removeWork}>
          <Icon type="icon-clear" />
        </div>
      </div>
      {/* 画笔 */}
      <div className="paintbrush">
        {paintbrush.map((ite, ind) => {
          return (
            <div
              key={ind}
              className={classnames({
                "paintbrush-item": true,
                active: currentBrush == ind,
              })}
              //   className={["paintbrush-item", "aa"]}
              onClick={() => brushClick(ind)}
              style={opacityComputed(ind)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

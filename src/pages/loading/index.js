import React from "react";
import { Spin, Button } from "antd";
import ReactDOM from "react-dom/client";
let loadingIsshow = false;

const showLoading = () => {
  if (loadingIsshow == false) {
    let dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(<Spin />);
  }
  loadingIsshow = true;
};

const hideLoading = () => {
  if (!loadingIsshow) return;
  loadingIsshow = false;
  if (loadingIsshow == false) {
    document.body.removeChild(document.getElementById("loading"));
  }
};

export { showLoading, hideLoading };

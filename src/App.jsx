import React from "react";
import { HashRouter, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import Router from "./router";

import "./App.css";

function App() {
  const loadingState = useSelector((state) => state.globalSlice.loadingIsshow);
  return (
    <div className="App">
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;

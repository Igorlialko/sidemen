import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.scss";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <App/>
);
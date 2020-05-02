/** @format */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";
import "./index.css";
import RootStore from "./stores";

const root = new RootStore();

ReactDOM.render(
  <Provider {...root}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

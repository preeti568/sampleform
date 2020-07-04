import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UpdateSample from "./Component/updateSample";
import Address from "./Component/address";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <App {...props} />} />
        <Route
          exact
          path="/address/:id"
          render={(props) => <Address {...props} />}
        />
        <Route
          exact
          path="/updateSample/:id"
          render={(props) => <UpdateSample {...props} />}
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

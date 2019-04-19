import React from "react";
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import Home from "./Home";
import * as serviceWorker from "./serviceWorker";
import "tachyons";
import "./components/layout/Form.css";
import store from "./ConfigureStore";
import SignIn from "./components/layout/SignIn"
import { Provider } from "react-redux";

ReactDOM.render(

  
  <Provider store={store}>
    <Home />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();

import "bootstrap/dist/css/bootstrap.min.css";
// import "jquery-ui";
// import "react-datepicker/dist/react-datepicker.css";
import proxy from "http-proxy-middleware";

import React from "react";
import ReactDOM from "react-dom";
// createStore와 루트 리듀서 불러오기
import { createStore, apply, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import logger from "redux-logger";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./store/moduels";

// i18n 다국어처리 (아직 처리되지 않음)
import "./config/lang/i18n";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();

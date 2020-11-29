import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "./containers/App";
import {
  updateMyGridEntries,
  updateEnemyGridEntries,
  updateGameState
} from "./reducers";
import { createLogger } from "redux-logger";

const logger = createLogger();
const rootReducer = combineReducers({
  updateMyGridEntries,
  updateEnemyGridEntries,
  updateGameState
});
const store = createStore(rootReducer, applyMiddleware(logger));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <h1 className="f1 orange">BattleBoats</h1>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </React.StrictMode>,
  rootElement
);

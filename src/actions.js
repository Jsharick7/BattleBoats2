import {
  UPDATE_GRID,
  UPDATE_E_GRID,
  UPDATE_PLAYSTATE,
  UPDATE_TURNS,
  SET_TOTAL_BOATS,
  SET_BOARD_SIZE,
  SET_TURN_POSSESSION,
  SET_MY_HITS,
  SET_ENEMY_HITS
} from "./constants";

export const setMyGrid = (gridArray) => ({
  type: UPDATE_GRID,
  payload: gridArray
});

export const setEnemyGrid = (gridArray) => ({
  type: UPDATE_E_GRID,
  payload: gridArray
});

//gamestate actions
export const setPlayState = (text) => ({
  type: UPDATE_PLAYSTATE,
  payload: text
});

export const incTurns = () => ({
  type: UPDATE_TURNS
});

export const setBoats = (int) => ({
  type: SET_TOTAL_BOATS,
  payload: int
});

export const setBoardSize = (int) => ({
  type: SET_BOARD_SIZE,
  payload: int
});

export const setTurnPossession = (text) => ({
  type: SET_TURN_POSSESSION,
  payload: text
});

export const setMyHits = () => ({
  type: SET_MY_HITS
});

export const setEnemyHits = () => ({
  type: SET_ENEMY_HITS
});

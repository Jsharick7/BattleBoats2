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

const initialMyGridState = {
  grid: [
    ["x", "x"],
    ["x", "x"]
  ]
};

export const updateMyGridEntries = (
  state = initialMyGridState,
  action = {}
) => {
  switch (action.type) {
    case UPDATE_GRID:
      return Object.assign({}, state, { grid: action.payload });
    default:
      return state;
  }
};

const initialEnemyGridState = {
  enemygrid: [
    ["x", "x"],
    ["x", "x"]
  ]
};

export const updateEnemyGridEntries = (
  state = initialEnemyGridState,
  action = {}
) => {
  switch (action.type) {
    case UPDATE_E_GRID:
      return Object.assign({}, state, { enemygrid: action.payload });
    default:
      return state;
  }
};

const initialGameState = {
  playstate: "init",
  turns: 0,
  boats: 4,
  boardsize: 5,
  turnpossession: "player",
  myhits: 0,
  enemyhits: 0
};

export const updateGameState = (state = initialGameState, action = {}) => {
  switch (action.type) {
    case UPDATE_PLAYSTATE:
      return { ...state, playstate: action.payload };
    case UPDATE_TURNS:
      return { ...state, turns: state.turns + 1 };
    case SET_TOTAL_BOATS:
      return { ...state, boats: action.payload };
    case SET_BOARD_SIZE:
      return { ...state, boardsize: action.payload };
    case SET_TURN_POSSESSION:
      return { ...state, turnpossession: action.payload };
    case SET_MY_HITS:
      return { ...state, myhits: state.myhits + 1 };
    case SET_ENEMY_HITS:
      return { ...state, enemyhits: state.enemyhits + 1 };
    default:
      return state;
  }
};

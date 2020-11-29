import React, { Component } from "react";
import Cell from "../components/Cell";
import { connect } from "react-redux";

import {
  setMyGrid,
  setEnemyGrid,
  setPlayState,
  incTurns,
  setBoats,
  setBoardSize,
  setTurnPossession,
  setMyHits,
  setEnemyHits
} from "../actions";

const mapStateToProps = (state) => {
  return {
    grid: state.updateMyGridEntries.grid,
    enemygrid: state.updateEnemyGridEntries.enemygrid,
    playstate: state.updateGameState.playstate,
    turns: state.updateGameState.turns,
    boats: state.updateGameState.boats,
    boardsize: state.updateGameState.boardsize,
    turnpossession: state.updateGameState.turnpossession,
    myhits: state.updateGameState.myhits,
    enemyhits: state.updateGameState.enemyhits
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onMyGridUpdate: (gridArray) => dispatch(setMyGrid(gridArray)),
    onEnemyGridUpdate: (gridArray) => dispatch(setEnemyGrid(gridArray)),
    onChangePlayState: (playState) => dispatch(setPlayState(playState)),
    onIncrementTurns: () => dispatch(incTurns()),
    onSetBoats: (int) => dispatch(setBoats(int)),
    onSetBoardSize: (int) => dispatch(setBoardSize(int)),
    onSetTurnPossession: (text) => dispatch(setTurnPossession(text)),
    onSetMyHits: () => dispatch(setMyHits()),
    onSetEnemyHits: () => dispatch(setEnemyHits())
  };
};

class Playingboard extends Component {
  labelConvertY(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alpha[idx];
  }

  componentDidMount = () => {
    const { playstate, grid } = this.props;
    if (playstate === "playing") {
      grid.map((row, idx1) => {
        row.map((cell, idx2) => {
          if (cell === "s") {
            let element = document.getElementById(idx1 + "p" + idx2);
            element.className = this.addClass("selected");
          }
        });
      });
    }
  };

  addClass(classToAdd) {
    let names = "";
    switch (classToAdd) {
      case "highlight":
        names = "square highlight";
        break;
      case "selected":
        names = "square selected";
        break;
      case "no-select":
        names = "square no-select";
        break;
      default:
        names = "square";
    }
    return names;
  }

  render() {
    const { grid, playstate } = this.props;
    const drawX = grid.map((row) => {
      return <h2 className="col-label">{grid.indexOf(row) + 1}</h2>;
    });
    const drawnMap = grid.map((row, idx1) => {
      return (
        <>
          <div className="row">
            <h2 className="row-label">
              {this.labelConvertY(grid.indexOf(row))}
            </h2>
            {row.map((unit, idx2) => {
              return (
                <Cell
                  playState={playstate}
                  id={idx1 + "p" + idx2}
                  cellClick={null}
                  idx1={idx1}
                  idx2={idx2}
                  key={this.id}
                  className={"square"}
                  checked={false}
                  value={unit}
                ></Cell>
              );
            })}
          </div>
        </>
      );
    });

    return (
      <>
        <div className="playing-board">
          <h2>My Boats:</h2>
          <div className="col-labels-row">{drawX}</div>
          <div>{drawnMap}</div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playingboard);

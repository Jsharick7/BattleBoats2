import React, { Component } from "react";
import Board from "./Board";
import Enemyboard from "./EnemyBoard";
import Setup from "../components/Setup";
import Playingboard from "./Playingboard";
import "../styles.css";
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

class App extends Component {
  handleSubmit = (event) => {
    const {
      boats,
      boardsize,
      onChangePlayState,
      onMyGridUpdate,
      onEnemyGridUpdate
    } = this.props;
    event.preventDefault();
    if (boats < 1) {
      alert("Error: Boats must be a positive number!");
    } else if (boats < boardsize * boardsize * 0.6) {
      onChangePlayState("selection");
      onMyGridUpdate(this.generateBoard(boardsize));
      onEnemyGridUpdate(this.generateEnemyBoard(boardsize));
    } else {
      alert("Error: Number of boats must not exceed 60% of game board.");
    }
  };

  generateBoard = (size) => {
    let board = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push("x");
      }
      board.push(row);
    }
    return board;
  };

  generateEnemyBoard = (size) => {
    let enemyBoard = this.generateBoard(size);
    let boatsToPlace = this.props.boats;
    while (boatsToPlace > 0) {
      enemyBoard.forEach((row, idx1) => {
        row.forEach((cell, idx2) => {
          var i = Math.floor(Math.random() * 100);
          if (i > 75 && cell === "x" && boatsToPlace > 0) {
            enemyBoard[idx1][idx2] = "s";
            boatsToPlace -= 1;
          }
        });
      });
    }
    return enemyBoard;
  };

  handleStart = () => {
    this.props.onChangePlayState("playing");
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
      case "hit":
        names = "square hit";
        break;
      case "selected-hit":
        names = "square selected hit";
        break;
      case "miss":
        names = "square miss";
        break;
      default:
        names = "square";
    }
    return names;
  }

  handleClick = (event, val, i1, i2) => {
    const {
      enemygrid,
      onEnemyGridUpdate,
      onSetTurnPossession,
      onIncrementTurns,
      onSetMyHits
    } = this.props;

    if (val === "s") {
      onSetMyHits();
      this.checkVictory();
      event.target.className = this.addClass("hit");
      onEnemyGridUpdate(enemygrid);
      onSetTurnPossession("enemy");
      onIncrementTurns();

      setTimeout(this.handleEnemyAttack, 700);
    } else if (val === "x") {
      console.log(val);
      event.target.className = this.addClass("miss");
      onEnemyGridUpdate(enemygrid);
      onSetTurnPossession("enemy");
      onIncrementTurns();
      setTimeout(this.handleEnemyAttack, 1500);
    }
  };

  handleEnemyAttack = () => {
    const { grid, boardsize } = this.props;
    const { onMyGridUpdate, onSetTurnPossession, onSetEnemyHits } = this.props;
    let picked = false;
    while (!picked) {
      let aidx1 = Math.floor(Math.random() * boardsize);
      let aidx2 = Math.floor(Math.random() * boardsize);
      if (grid[aidx1][aidx2] === "x") {
        picked = true;
        grid[aidx1][aidx2] = "m";
        onMyGridUpdate(grid);
        onSetTurnPossession("player");
        // if (playstate === "playing") {
        document.getElementById(aidx1 + "p" + aidx2).className = this.addClass(
          "miss"
        );
        // }
      } else if (grid[aidx1][aidx2] === "s") {
        picked = true;
        grid[aidx1][aidx2] = "h";
        onMyGridUpdate(grid);
        onSetTurnPossession("player");
        onSetEnemyHits();
        // if (this.state.playState === "playing") {
        document.getElementById(aidx1 + "p" + aidx2).className = this.addClass(
          "selected-hit"
        );
      }
    }
    setTimeout(this.checkVictory(), 1500); // }
  };

  checkVictory = () => {
    const { myhits, enemyhits, boats, onChangePlayState } = this.props;

    if (myhits == boats) {
      onChangePlayState("endp");
    } else if (enemyhits == boats) {
      onChangePlayState("ende");
    }
  };

  reinitialize = () => {
    window.location.reload();
  };

  render() {
    const { playstate, boardsize, boats } = this.props;
    switch (playstate) {
      case "init":
        return (
          <Setup
            defaultSize={boardsize}
            handleSubmit={this.handleSubmit}
            boats={boats}
          />
        );

      case "selection":
        return (
          <>
            <Board handleStart={this.handleStart} />
          </>
        );
      case "playing":
        return (
          <>
            <div className="combat-div">
              <Enemyboard
                handleEnemyAttack={this.handleEnemyAttack}
                handleClick={this.handleClick}
                checkvictory={this.checkVictory}
              />
              <Playingboard />
            </div>
          </>
        );
      case "endp":
        return (
          <>
            <h1 className="f2 white">You Win!</h1>
            <button
              className="btn f2 orange pa2 br2 grow"
              onClick={this.reinitialize}
            >
              Play Again
            </button>
          </>
        );
      case "ende":
        return (
          <>
            <h1 className="f2 white">You Lost!</h1>
            <button
              className="btn f2 orange pa2 br2 grow"
              onClick={this.reinitialize}
            >
              Play Again
            </button>
          </>
        );
      default:
        break;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

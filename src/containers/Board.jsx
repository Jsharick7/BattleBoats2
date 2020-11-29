import React, { Component } from "react";
import Cell from "../components/Cell";
import Buttons from "../components/Buttons";
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

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingShips: this.props.boats,
      placeable: true,
      maxSelected: false,
      ready: false
    };
  }

  labelConvertY(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alpha[idx];
  }

  selectCell = (event, val, idx1, idx2) => {
    const { grid, onMyGridUpdate } = this.props;

    if (
      val === "x" &&
      this.state.placeable &&
      this.state.maxSelected === false &&
      this.state.remainingShips > 0
    ) {
      let item = grid[idx1][idx2];
      item = "h";
      grid[idx1][idx2] = item;
      event.target.className = this.addClass("highlight");
      onMyGridUpdate(grid);
      this.setState({
        placeable: true,
        remainingShips: this.state.remainingShips - 1
      });
    } else if (val === "h") {
      let item = grid[idx1][idx2];
      item = "x";
      grid[idx1][idx2] = item;
      event.target.className = this.addClass("");
      onMyGridUpdate(grid);
      this.setState({
        placeable: true,
        maxSelected: false,
        remainingShips: this.state.remainingShips + 1
      });
    } else if (
      val === "s" &&
      this.state.placeable &&
      this.state.maxSelected === false
    ) {
      let item = grid[idx1][idx2];
      item = "e";
      grid[idx1][idx2] = item;
      event.target.className = this.addClass("no-select");
      onMyGridUpdate(grid);
      this.setState({ placeable: false });
    } else if (val === "e") {
      let item = grid[idx1][idx2];
      item = "s";
      grid[idx1][idx2] = item;
      event.target.className = this.addClass("selected");
      onMyGridUpdate(grid);
      this.setState({ placeable: true, maxSelected: false });
    }
  };

  checkRemaining = () => {
    if (this.state.remainingShips < 1) {
      this.setState({ maxSelected: true });
    }
  };
  lockInSelected = () => {
    if (this.state.placeable) {
      const { grid, onMyGridUpdate } = this.props;
      grid.map((row, idx1) => {
        row.map((cell, idx2) => {
          if (cell === "h") {
            let search = idx1 + "" + idx2;
            let element = document.getElementById(search);
            let item = grid[idx1][idx2];
            item = "s";
            grid[idx1][idx2] = item;
            element.className = this.addClass("selected");
            onMyGridUpdate(grid);
            this.setState({
              placeable: true,
              maxSelected: false
            });
          }
        });
      });
    }
    if (this.state.remainingShips < 1) {
      this.setState({ ready: true });
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
      return <h1 className="col-label">{grid.indexOf(row) + 1}</h1>;
    });
    const drawnMap = grid.map((row, idx1) => {
      return (
        <>
          <div className="select-row white">
            <h1 className="row-label ">
              {this.labelConvertY(grid.indexOf(row))}
            </h1>
            {row.map((unit, idx2) => {
              return (
                <Cell
                  playstate={playstate}
                  id={idx1 + "" + idx2}
                  cellClick={this.selectCell}
                  idx1={idx1}
                  idx2={idx2}
                  key={this.id}
                  className="square"
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
        <h2 className="f3 white">
          Remaining Ships to Place:{this.state.remainingShips}
        </h2>
        <Buttons
          handleStart={this.props.handleStart}
          ready={this.state.ready}
          lockInSelected={this.lockInSelected}
        />
        <div className="board">
          <div className="col-labels-row white">{drawX}</div>
          <div>{drawnMap}</div>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);

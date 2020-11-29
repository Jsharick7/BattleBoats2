import React, { Component } from "react";
import EnemyCell from "../components/EnemyCell";
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

class Enemyboard extends Component {
  labelConvertY(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alpha[idx];
  }

  handleClick = (event, val, i1, i2) => {
    this.props.handleClick(event, val, i1, i2);
  };

  render() {
    const { enemygrid, turnpossession } = this.props;
    const drawX = enemygrid.map((row) => {
      return <h2 className="col-label">{enemygrid.indexOf(row) + 1}</h2>;
    });
    const drawnMap = enemygrid.map((row, idx1) => {
      return (
        <>
          <div className="row">
            <h2 className="row-label">
              {this.labelConvertY(enemygrid.indexOf(row))}
            </h2>
            {row.map((unit, idx2) => {
              return (
                <EnemyCell
                  turnpossession={turnpossession}
                  id={"enemy" + idx1 + "" + idx2}
                  key={this.id}
                  handleClick={this.handleClick}
                  idx1={idx1}
                  idx2={idx2}
                  className="square"
                  checked={false}
                  value={unit}
                ></EnemyCell>
              );
            })}
          </div>
        </>
      );
    });

    return (
      <>
        <div className="enemy-board">
          <h2>Enemy Boats:</h2>
          <div className="col-labels-row">{drawX}</div>
          <div className="actual-grid">{drawnMap}</div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemyboard);

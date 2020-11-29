import React, { Component } from "react";
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

class Setup extends Component {
  decSize = (e) => {
    const { boardsize, onSetBoardSize } = this.props;
    e.preventDefault();
    if (boardsize > 3) {
      onSetBoardSize(boardsize - 1);
    }
  };
  incSize = (e) => {
    const { boardsize, onSetBoardSize } = this.props;
    e.preventDefault();
    if (boardsize < 15) {
      onSetBoardSize(boardsize + 1);
    }
  };
  handleChange = (e) => {
    const { onSetBoats } = this.props;
    e.preventDefault();
    onSetBoats(e.target.value);
  };

  render() {
    const { boardsize, boats } = this.props;
    return (
      <div>
        <h2 className="f2 white">Setup</h2>
        <form onSubmit={(event) => this.props.handleSubmit(event)}>
          <div className="options-row">
            <div>
              <h3 className="f4 white">
                Board Size
                <br />
                (min:3, max:15)
              </h3>
              <button className="btn f2 orange" onClick={this.decSize}>
                &lt;
              </button>{" "}
              <span className="f4 white">
                {boardsize}x{boardsize}{" "}
              </span>{" "}
              <button className="btn f2 orange" onClick={this.incSize}>
                &gt;
              </button>
            </div>
            <div>
              <h3 className="f4 white">
                Number of Boats
                <br />
                (max: 60% of total spaces)
              </h3>
              <input
                className="boat-input lh-copy"
                onChange={this.handleChange}
                type="number"
                defaultValue={boats}
              ></input>
            </div>
          </div>
          <br />
          <input
            className="btn f2 orange pa2 br2 grow"
            value="Confirm"
            type="submit"
          ></input>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);

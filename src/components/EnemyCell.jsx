import React, { Component } from "react";

class EnemyCell extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  render() {
    return (
      <div
        onClick={(event) => {
          if (
            this.props.turnpossession === "player" &&
            this.state.clicked === false
          ) {
            this.setState({ clicked: true });
            this.props.handleClick(
              event,
              this.props.value,
              this.props.idx1,
              this.props.idx2
            );
          }
        }}
        id={this.props.id}
        className={this.props.className}
      ></div>
    );
  }
}

export default EnemyCell;

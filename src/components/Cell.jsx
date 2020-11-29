import React, { Component } from "react";

class Cell extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        onClick={(event) => {
          if (this.props.playstate === "selection")
            this.props.cellClick(
              event,
              this.props.value,
              this.props.idx1,
              this.props.idx2,
              this.props.className
            );
        }}
        className={this.props.className}
      ></div>
    );
  }
}

export default Cell;

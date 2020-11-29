import React, { Component } from "react";

class Buttons extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    if (!this.props.ready) {
      return (
        <>
          <div className="top-button-row">
            <button
              onClick={this.props.lockInSelected}
              className="btn f3 pa2 br1 ma3 purple underline-hover"
            >
              Place
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className="top-button-row">
          <button
            className="btn f3 pa2 br1 ma3 purple underline-hover"
            onClick={this.props.handleStart}
          >
            Start Game!
          </button>
        </div>
      );
    }
  }
}
export default Buttons;

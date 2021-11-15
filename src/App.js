import "./App.css";

import React, { Component } from "react";
import Circle from "./Circle";
import { circles } from "./circles";
import GameOverPopUp from "./GameOverPopUp";
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
  };
  timer = undefined;
  pace = 1500;
  clickHandler = () => {
    this.setState({
      score: this.state.score + 10,
    });
  };
  nextCircle = () => {
    let nextActive;
    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
    });
    console.log("active circle is ", this.state.current);
    this.pace *= 0.95;
    this.timer = setTimeout(this.nextCircle, this.pace);
  };
  startHandler = () => {
    this.nextCircle();
  };
  stopHandler = () => {
    this.setState({
      gameOver: true,
    });
    clearTimeout(this.timer);
  };
  render() {
    return (
      <div>
        <h1>Speed Game</h1>

        <p>Your Score : {this.state.score}</p>
        <div>
          <div className="circles">
            {circles.map((c) => (
              <Circle
                key={c.id}
                id={c.id}
                color={c.color}
                click={this.clickHandler}
                active={this.state.current === c.id}
              />
            ))}
          </div>
          {this.state.gameOver && <GameOverPopUp score={this.state.score} />}
          <div className="buttons">
            <button onClick={this.startHandler}>Start</button>
            <button onClick={this.stopHandler}>Stop</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

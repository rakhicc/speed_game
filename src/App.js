import "./App.css";

import React, { Component } from "react";
import Circle from "./Circle";
import { circles } from "./circles";
import GameOverPopUp from "./GameOverPopUp";
import stopSound from "./assets/sounds/stop.mp3";
import gameStartSound from "./assets/sounds/start.mp3";
import mouseClickSound from "./assets/sounds/Mouse-Click.mp3";
let startSound = new Audio(gameStartSound);
let gameEndSound = new Audio(stopSound);
let clickSound = new Audio(mouseClickSound);
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
    rounds: 0,
    didGameStart: false,
  };
  timer = undefined;

  clickHandler = (id) => {
    clickSound.play();
    console.log("you clicked on", id);
    if (this.state.current !== id) {
      this.stopHandler();
      return;
    }
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };
  nextCircle = () => {
    if (this.state.rounds >= 5) {
      this.stopHandler();
      return;
    }
    let nextActive;
    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log("rounds", this.state.rounds);
    console.log("active circle is ", this.state.current);
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };
  startHandler = () => {
    startSound.play();
    this.nextCircle();
    this.setState({
      didGameStart: true,
    });
  };
  stopHandler = () => {
    gameEndSound.play();
    startSound.pause();
    this.setState({
      gameOver: true,
      didGameStart: false,
    });
    clearTimeout(this.timer);
  };
  closeHandler = () => {
    this.setState({
      gameOver: false,
      score: 0,
      current: 0,
      pace: 1500,
      rounds: 0,
    });
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
                click={() => this.clickHandler(c.id)}
                active={this.state.current === c.id}
                disabled={this.state.didGameStart}
              />
            ))}
          </div>
          {this.state.gameOver && (
            <GameOverPopUp score={this.state.score} close={this.closeHandler} />
          )}
          <div className="buttons">
            <button
              disabled={this.state.didGameStart}
              onClick={this.startHandler}
            >
              Start
            </button>
            <button onClick={this.stopHandler}>Stop</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

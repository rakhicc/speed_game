import React from "react";

const GameOverPopUp = (props) => {
  return (
    <div className="overlay">
      <div className="popUpDiv">
        <h1>Game over</h1>
        <p>Your score was: {props.score}</p>
        <button onClick={props.close}>X</button>
      </div>
    </div>
  );
};

export default GameOverPopUp;

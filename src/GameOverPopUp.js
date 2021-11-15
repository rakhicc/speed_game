import React from "react";
const closeHandler = () => {
  window.location.reload();
};
const GameOverPopUp = (props) => {
  return (
    <div className="overlay">
      <div className="popUpDiv">
        <h1>Game over</h1>
        <p>Your score was: {props.score}</p>
        <button onClick={closeHandler}>X</button>
      </div>
    </div>
  );
};

export default GameOverPopUp;

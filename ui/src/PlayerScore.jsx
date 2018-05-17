import React from "react";
import "./playerscore.css";

const PlayerScore = props => (
  <div className="playerScore">
    <h1 className="playerName">{props.name}</h1>
    <div>{props.score}</div>
  </div>
);

export default PlayerScore;

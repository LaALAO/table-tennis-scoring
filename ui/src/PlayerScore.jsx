import React from "react";

const PlayerScore = props => (
  <div>
    <div>{props.name}</div>
    <div>{props.score}</div>
  </div>
);

export default PlayerScore;

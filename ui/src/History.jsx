import React from "react";
import "./history.css";
import GameResult from "./GameResult";

const History = props => (
  <div>
    {props.games.map((game, index) => (
      <GameResult
        key={index}
        leftscore={game.score.player1}
        rightscore={game.score.player2}
      />
    ))}
  </div>
);

export default History;

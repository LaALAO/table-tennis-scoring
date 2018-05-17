import React from 'react';
import "./history.css";
import GameResult from './GameResult';

const History = (props) => (
<div>
    <h1>history</h1>
        {props.games.map(game => (
            <GameResult leftscore={game.player1.score} rightscore={game.player2.score} />
    ))}
  </div>
);

export default History;
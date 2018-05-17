import React from 'react';
import "./GameResult.css";

const GameResult = (props) => (
    <div>{props.leftscore}:{props.rightscore}</div>
);

export default GameResult;
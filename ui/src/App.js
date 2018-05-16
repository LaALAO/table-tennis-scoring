import React, { Component } from "react";
import "./App.css";
import * as api from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: { player1: { score: 3 }, player2: { score: 3 } },
      games: []
    };
  }

  getCurrentGameScore() {
    api.getCurrentGame()
      .then(game => this.setState({ current: game }));
  }

  getGameScores() {
    api.getGames()
      .then(games => this.setState({ games: games }));
  }

  renderHistory() {
    console.log('test');
    return this.state.games.map(game => (
      <div>{game.player1.score}:{game.player2.score}</div>
    ));
  }

  render() {
    let { current, games } = this.state;

    return (
      <div>
        <div>
          <div>Player 1</div>
          <div>{current.player1.score}</div>
        </div>
        <div>
          <div>Player 2</div>
          <div>{current.player2.score}</div>
        </div>
        <button onClick={this.getCurrentGameScore.bind(this)}>Get Current Score</button>
        <button onClick={this.getGameScores.bind(this)}>Get all scores</button>
        <div>
          <h1>history</h1>
          {this.renderHistory()}
        </div>

      </div>
    );
  }
}

export default App;

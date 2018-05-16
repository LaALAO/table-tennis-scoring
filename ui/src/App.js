import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: { player1: { score: 3 }, player2: { score: 3 } },
      games: []
    };
  }

  getCurrentGameScore() {
    this.setState({ current: { player1: { score: 5 }, player2: { score: 2 } } });
  }

  getGameScores() {
    this.setState({
      games: [
        { player1: { score: 11 }, player2: { score: 5 } },
        { player1: { score: 12 }, player2: { score: 10 } },
        { player1: { score: 8 }, player2: { score: 11 } },
        { player1: { score: 11 }, player2: { score: 5 } },
      ]
    });
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

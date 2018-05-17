import React, { Component } from "react";
import "./App.css";
import * as api from './api';
import PlayerScore from './PlayerScore';
import Logo from './Logo';
import History from './History';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: { player1: { score: 3 }, player2: { score: 3 } },
      games: []
    };
  }

  componentDidMount() {
    this.getCurrentGameScore();
    this.getGameScores();
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
  }

  render() {
    let { current, games } = this.state;

    return (
      <div>
        <PlayerScore name="Player 1" score={current.player1.score} />
        <PlayerScore name="Player 2" score={current.player2.score} />
        <Logo />
        <History games={this.state.games} />
      </div>
    );
  }
}

export default App;

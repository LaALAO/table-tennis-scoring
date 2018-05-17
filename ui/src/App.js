import React, { Component } from "react";
import "./App.css";
import * as api from "./api";
import PlayerScore from "./PlayerScore";
import Logo from "./Logo";
import History from "./History";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        score: {
          player1: 0,
          player2: 0
        },
        player1: "Player 1",
        player2: "Player 2"
      },
      games: []
    };
  }

  componentDidMount() {
    this.update();
    api.getGames().then(games => this.setState({ games: games }));
  }

  update() {
    console.log('checking...');
    api.getCurrentGame()
      .then(game => {
        this.setState({ current: game });
        if (game.score.player1 === 0 && game.score.player2 === 0) {
          api.getGames().then(games => this.setState({ games: games }));
        }
      })
    .then(() => setTimeout(this.update.bind(this), 3000));
  }

  render() {
    let { current, games } = this.state;
    return (
      <div className="App">
        <PlayerScore name={current.player1} score={current.score.player1} />
        <PlayerScore name={current.player2} score={current.score.player2} />
        <Logo />
        <History games={this.state.games} />
      </div>
    );
  }
}

export default App;

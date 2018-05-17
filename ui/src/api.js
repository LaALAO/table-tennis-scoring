import axios from "axios";

const http = axios.create({
  baseUrl: "https://cz307e5t6k.execute-api.ap-southeast-2.amazonaws.com/dev/",
  crossDomain: true
});

export const getGames = () => {
  // axios.get('http://google.com/games')
  //     .then(data => {
  //         //parse
  //     })
  return Promise.resolve([
    { player1: { score: 11 }, player2: { score: 5 } },
    { player1: { score: 12 }, player2: { score: 10 } },
    { player1: { score: 8 }, player2: { score: 11 } },
    { player1: { score: 11 }, player2: { score: 5 } }
  ]);
};

export const getCurrentGame = () => {
    let url = 'https://cz307e5t6k.execute-api.ap-southeast-2.amazonaws.com/dev/games/current';

    return axios.get(url, { mode: 'cors' })
        .then(response => response.data);
};

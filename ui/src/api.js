import axios from 'axios';

export const getGames = () => {
    // axios.get('http://google.com/games')
    //     .then(data => {
    //         //parse 
    //     })
    return Promise.resolve(
    [
        { player1: { score: 11 }, player2: { score: 5 } },
        { player1: { score: 12 }, player2: { score: 10 } },
        { player1: { score: 8 }, player2: { score: 11 } },
        { player1: { score: 11 }, player2: { score: 5 } }
    ]);
};

export const getCurrentGame = () => {
    return Promise.resolve({ player1: { score: 5 }, player2: { score: 2 } });
}
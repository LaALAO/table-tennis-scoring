import axios from "axios";

const http = axios.create({
  baseURL: "https://6acan5gz02.execute-api.ap-southeast-2.amazonaws.com/dev/",
  mode: 'cors'
});

export const getGames = () => {
    return http.get('/games')
        .then(response => response.data);
};

export const getCurrentGame = () => {
    return http.get('/games/current')
        .then(response => response.data.payload);
};

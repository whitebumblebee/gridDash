// import Arena from "./arena.js";


// const arena = new Arena();

// arena.start()

import { Game, Player } from "./game.mjs";

const games = []

const game1 = new Game(3, 4, 1);
const game2 = new Game(4, 4, 2);

games.push(game1);
games.push(game2)

const playerA = new Player(1);
const playerB = new Player(2);
const playerC = new Player(3);
const playerD = new Player(4);

game1.addPlayer(playerA);
game1.addPlayer(playerB);
game2.addPlayer(playerC);
game2.addPlayer(playerD);

const intervalId = setInterval(() => {
    let allgamesExited = games.every(game => game.players.length === 0)
    if(allgamesExited === true){
        clearInterval(intervalId)
    }
    for(let game of [game1, game2]){
        game.play();
    }
}, 5000);


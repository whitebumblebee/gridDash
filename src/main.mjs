// import Arena from "./arena.js";


// const arena = new Arena();

// arena.start()

import { Game, Player } from "./game.mjs";

const games = []

const game1 = new Game(10, 10, 1);
const game2 = new Game(10, 10, 2);

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

game1.play();
game2.play();



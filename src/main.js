import {Game, Point} from './game.mjs'
import {Player} from './player.mjs'
import {getRandomInteger} from './utils.mjs'
// create player objects



const gameObj = new Game(4,4);

const firstPlayer = new Player(Point(
    getRandomInteger(4),
    getRandomInteger(4)
));
const secondPlayer = new Player(Point(
    getRandomInteger(4),
    getRandomInteger(4)
));

gameObj.addPlayer(firstPlayer);
gameObj.addPlayer(secondPlayer);


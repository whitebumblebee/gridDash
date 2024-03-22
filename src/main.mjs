import { Game } from './game.mjs'



const game = new Game(5,5);
for(let i=0; i<2; i++) {
    game.addPlayer();
}
game.play()


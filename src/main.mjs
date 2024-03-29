import { Game } from './game.mjs'



const game = new Game(5,5);
for(let i=0; i<2; i++) {
    game.addPlayer();
}
game.play()

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Game Constants ---
const MAX_PLAYERS_PER_GAME = 4;

const gameState = {
    games: {},
    players: {}
};

function displayAvailableGames() {
    console.log('Available Games:');
    for (const gameId in gameState.games) {
        console.log(`  Game ${gameId}: ${gameState.games[gameId].players.length} players`);
    }
}

function displayGrid(game) {
    // Basic display - you'll want to improve this formatting
    game.showGrid();
}

function updateGameState(gameId, player) {
    const game = gameState.games[gameId];
    if (game.players.length >= MAX_PLAYERS_PER_GAME) {
        console.log('Game is full!');
        return;
    }
    const emptyCell = game.findEmptyCell();
    player.coordinate = emptyCell;
    player.alive = true;
    player.gameId = gameId;
    game.addPl
}

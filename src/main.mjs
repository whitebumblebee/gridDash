import { Game } from './game.mjs'
import readline from 'readline'


// const game = new Game(5,5);
// for(let i=0; i<2; i++) {
//     game.addPlayer();
// }
// game.play()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Game Constants ---
const gameState = {
    games: [],
    players: [],
    lastGameId: 0,
    lastPlayerId: 0
};

function displayAvailableGames() {
    console.log('Available Games:');
    for (const game of gameState.games) {
        console.log(`Game ${gameId}: ${gameState.games[gameId].players.length} players`);
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

function addGame(m, n) {
    gameState.lastGameId++;
    const game = new Game(m, n, gameState.lastGameId)
    gameState.games.push(game);
    game.play();
    return game.id;
}

function getGameFromId(id){
    for(const game of gameState.game){
        if(game.id === id) {
            return game;
        }
    }
    return null;
}

rl.question('Want to add the game? y/n', (entry) => {
    if(entry === 'y'){
        rl.question('Enter rows and columns for the grid', (entry) => {
            const [m, n] = entry.split(' ');
            const gameId = addGame(m, n)
            console.log(`New game with ${gameId} started!`)
            console.log(`Total no of games running = ${gameState.games.length}`)
            let gameIds = gameState.games.map(g => g.id)
            rl.question('Enter the id to add players your options:'+gameIds.join(','), (id) => {
                if(id in gameIds){
                    const game = getGameFromId(id);
                    const player = new Player();
                    gameState.players.push(player);
                    game.addPlayer();
                }
                
                console.log(m, n)
                // console.log(gameState)
                rl.close();
            });
            rl.close();
        });
    }
    const [m, n] = game.split(' ');
    addGame(m, n)
    console.log(gameState)
    rl.question('Want to start 2nd game? ', (game) => {
        const [m, n] = game.split(' ');
        console.log(m, n)
        // console.log(gameState)
        rl.close();
    });
    
  });





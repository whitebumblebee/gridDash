
import readline from 'readline'

function question(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout 
  });

  return new Promise(resolve => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function linearInput() {
  try{
    while(true) {
      const doAddGame = await question('Want to add the game?\n y for yes\n n for no',)
      if(doAddGame === 'y') {
        const doAddRowsColumns = await question("Add rows and columns for grid");
        const [m, n] = doAddRowsColumns.split(' ');
        const gameId = addGame(m, n)
        console.log(`New game with ${gameId} started!`)
        console.log(`Total no of games running = ${gameState.games.length}`)
        let gameIds = gameState.games.map(g => g.id)
        const doAddGameId = await question('Enter the id to add players your options:'+gameIds.join(','));

        if(doAddGameId in gameIds) {
          const game = getGameFromId(id);
          const player = new Player();
          gameState.players.push(player);
          game.addPlayer();
        }


      } else if(doAddGame === 'n') {
        break;
      } else {
        console.log("invalid response. try again")
      }
    }
  } catch (error) {
    console.error("Error reading input:", error);  
  }
}

linearInput();

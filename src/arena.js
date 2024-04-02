import readline from 'readline';
import chalk from 'chalk'
import { Player, Game } from './game.mjs';


function getNumberOfRowsAndColumns(){
  const x = Math.floor(Math.random() * 15) + 1;
  const y = Math.floor(Math.random() * 15) + 1;
  return [x, y];
}

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

class Arena {
    constructor() {
        this.games = [],
        this.players = [],
        this.lastGameId = 0,
        this.lastPlayerId = 0
    }
    getGameIds() {
      return this.games.map(g => g.id && g.isExpired === false);
    }

    getPlayerIds() {
      return this.players.map(p => p.id);
    }
    async addGamesToArena() {
      let noOfGames = await question("How many games do you want to create? Max 5 allowed");
      while(noOfGames > 5) {
        console.log("Wrong value, number is supposed to be less than or equal to 5");
        noOfGames = await question("How many games do you want to create? Max 5 allowed");
      }
      for(let i=0; i<noOfGames; i++){
        const [rows, columns] = getNumberOfRowsAndColumns();
        console.log(rows, columns);
        const gameId = this.addGame(rows, columns);
        console.log(`Game ${gameId} started`);
      }
      console.log(`Arena with ${this.games.length} games started`)
    }

    async addPlayersToArena() {
      let enterArenaPrompt = await question(chalk.green("Hey there, wanna enter arena?"));
      while(enterArenaPrompt !== 'n') {
        this.lastPlayerId++;
        const player = new Player(this.lastPlayerId);
        this.players.push(player);
        console.log(chalk.green(`New player ${player.id} entered the arena`));
        enterArenaPrompt = await question(chalk.green("Hey there, wanna enter arena?"));
      }
    }

    async assignPlayersToGames() {
      const availablePlayers = this.players.filter(p => p.gameId === null);
      console.log(chalk.yellow("Available players"));
      availablePlayers.forEach(p => {
        console.log(chalk.bgYellow(p.toString()));
      });
        for(let player of availablePlayers) {
          const gameIds = this.games.map(g => g.id);
          console.log(`Hey player${player.id}`);
          let gameId = await question(chalk.green('Which game which would you like to join?\n Options are:'+gameIds.join(',')));
          if(gameIds.includes(parseInt(gameId))) {
            const game = this.getGameFromId(gameId);
            game.addPlayer(player);
            console.log(chalk.yellow(`player${player.id} added to the game ${game.id}`));
          } else {
            console.log(chalk.red("No game with this id"));
          }
        }
    }


    async start() {
      console.log(chalk.cyan.bold("Welcome! you have created a new arena"));
      await this.addGamesToArena();
      while(this.games.length > 0) {
        await this.addPlayersToArena();
        await this.assignPlayersToGames();
        for(const game of this.games) {
          game.play();
          this.removeExpiredGames();
        }
      }
      console.log(chalk.red.bold("all games expired"));
    }

    removeExpiredGames() {
      this.games = this.games.filter(game => game.isExpired === false);
      this.players = this.players.filter(player => player.wonGame === false);
    }

    addGame(m, n) {
        this.lastGameId++;
        const game = new Game(m, n, this.lastGameId)
        this.games.push(game);
        return game.id;
    }

    getGameFromId(id){
      for(let game of this.games){
        if(game.id == id) {
            return game;
        }
      }
      return null;
    }

}

export default Arena;
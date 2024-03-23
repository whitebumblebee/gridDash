import readline from 'readline'
import { randomUUID } from 'crypto';

function getUserInput(prompt) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(prompt, ans => { rl.close(); resolve(ans); }));
  }
export class Player {
    constructor(point) {
        this.coordinate = point;
        this.id = null;
        this.gameId = null;
    }
}
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual = p => this.x === p.x && this.y === p.y;

    toString = () => `Point(${this.x}, ${this.y})`;
}
export class Game {
    constructor(rows, columns) {
        this.id = randomUUID();
        this.rows = rows;
        this.columns = columns;
        this.grid = this.createGrid(this.rows, this.columns)
        this.destination = this.getRandomCoordinate(this.rows, this.columns);
        this.players = [];
        this.gameInterval = null;
    }

    getRandomCoordinate(m, n){
        const x = Math.floor(Math.random() * m);
        const y = Math.floor(Math.random() * n);
        return new Point(x, y);
    }

    addPlayer(player) {
        const randomCoordinate = this.getRandomCoordinate(this.rows, this.columns);
        player.coordinate = randomCoordinate;
        player.gameId = this.id;
        this.players.push(player);
    }

    createGrid(rows, columns) {
        const grid = []
        for(let i = 0; i < rows; i++) {
            grid[i] = []
            for(let j = 0; j < columns; j++) {
                grid[i][j] = new Point(i, j);
            }
        }
        return grid;
    }

    findEmptyCell() {
        // Implement logic to find an empty cell in the grid
        // ...
        return emptyCell; // Return { x: ..., y: ... }
    }

    showGrid() {
        this.grid.forEach(rows => {
            let rowString = '';
            rows.forEach(point => {
                const player = this.players.find(p => {
                    p.coordinate.isEqual(point)
                })
                rowString += player ? `P${player.id}`: point.toString() + " | ";
            });
            console.log(rowString)
        });
        // console.log(this.players)
        // console.log("\n\n\n")
    }

    getPath(source, destination) {
        let xDirection;
        let yDirection;
        if(source.x < destination.x) {
            xDirection = 1;
        } else {
            xDirection = -1;
        }

        if(source.y < destination.y) {
            yDirection = 1;
        } else {
            yDirection = -1;
        }
        if(Math.abs(source.x - destination.x) === Math.abs(source.y - destination.y)) {
            source.x += xDirection;
            source.y += yDirection;
        } else if(Math.abs(source.x - destination.x) > Math.abs(source.y - destination.y)) {
            source.x += xDirection;
        } else {
            source.y += yDirection;
        }
        return source;
    }

    movePlayer(player) {
        let source = player.coordinate;
        source = this.getPath(source, this.destination);
        player.coordinate.x = Math.max(0, Math.min(source.x, this.rows - 1));
        player.coordinate.y = Math.max(0, Math.min(source.y, this.columns - 1));
        console.log("Player moved to:")
        console.log(player.coordinate.x, player.coordinate.y)
        console.log("destination is")
        console.log(this.destination.x, this.destination.y)
    }

    detectCollisions() {
        const alivePlayersObject = {}
        // create keys of alive players
        this.players.forEach(player => {
            if(player.gameId && !player.coordinate.isEqual(this.destination)) {
                const key = `${player.coordinate.x}-${player.coordinate.y}`; 
                if(key in alivePlayersObject){
                    alivePlayersObject[key] += 1;
                } else {
                    alivePlayersObject[key] = 1;
                }
            }
        });
        // check for collision and eliminate
        this.players.forEach(player => {
            if(player.gameId) {
                const key = `${player.coordinate.x}-${player.coordinate.y}`;
                if(alivePlayersObject.hasOwnProperty(key) && alivePlayersObject[key] > 1){
                    player.gameId = null;
                    this.removeEvictedPlayers();
                    console.log(`player ${player.id} has been eliminated!`)
                }
            }
        });

        // check if game is over
        if(this.players.every(player => !player.gameId)){
            clearInterval(this.gameInterval);
            console.log("All players eliminated. Game Over!")
        }
    }

    removePlayers() {
        this.players = this.players.filter(p => p.gameId !== null);
    }

    checkForWinners() {
        console.log("winners check")
        console.log(this.destination)
        console.log(this.players)
        const winner = this.players.find(player => player.gameId && player.coordinate.isEqual(this.destination));
        console.log("did we get winner?")
        console.log(winner)
        if(winner) {
            clearInterval(this.gameInterval);
            console.log(`Game over. Player ${winner.id} wins!`);
        }
    }

    play() {
        this.gameInterval = setInterval(() => {
            for(let player of this.players) {
                if(player.gameId) {
                    this.movePlayer(player);
                }
            }
            this.detectCollisions();
            this.checkForWinners();
            this.showGrid();
        }, 5000);
    }

}
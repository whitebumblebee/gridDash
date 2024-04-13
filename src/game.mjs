import chalk from 'chalk' 
export class Player {
    constructor(id) {
        this.coordinate = null;
        this.id = id;
        this.gameId = null;
        this.wonGame = false;
    }

    toString = () => `Player${this.id} @ (${this.x}, ${this.y})`;
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
    constructor(rows, columns, id) {
        this.id = id;
        this.rows = rows;
        this.columns = columns;
        this.destination = this.getRandomCoordinate(this.rows, this.columns);
        this.grid = this.createGrid()
        this.players = [];
        this.isExpired = false;
        this.intervalId = null;
        this.plays = 1;
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
        this.grid[player.coordinate.x][player.coordinate.y] = player.id;
    }

    createGrid() {
        const grid = []
        for(let i = 0; i < this.rows; i++) {
            grid[i] = []
            for(let j = 0; j < this.columns; j++) {
                if(i===this.destination.x && j===this.destination.y){
                    grid[i][j] = 'X'
                } else {
                    grid[i][j] = '_';
                }
            }
        }
        return grid;
    }

    showGrid() {
        console.log(this.grid.map(row => row.join(' ')).join('\n'));
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
        this.grid[player.coordinate.x][player.coordinate.y] = '_';
        source = this.getPath(source, this.destination);
        player.coordinate.x = Math.max(0, Math.min(source.x, this.rows - 1));
        player.coordinate.y = Math.max(0, Math.min(source.y, this.columns - 1));
        this.grid[player.coordinate.x][player.coordinate.y] = player.id;
        console.log(chalk.blue(`Player${player.id} moved to: (${player.coordinate.x},${player.coordinate.y}) in game${this.id}`));
    }

    detectCollisions() {
        const alivePlayersObject = {}
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
                    console.log(chalk.red(`player ${player.id} has been eliminated from game${this.id}`));
                }
            }
        });

        // check if game is over
        if(this.players.every(player => !player.gameId)){
            
            console.log(chalk.red(`All players eliminated. Game${this.id} Over!`));
            this.isExpired = true;
            clearInterval(this.intervalId);
        }
    }

    removePlayers() {
        
        if(this.isExpired) {
            for(let player of this.players){
                player.gameId = null;
            }
            this.players = [];
        }
        this.players = this.players.filter(p => p.gameId !== null);
    }

    checkForWinners() {
        const winners = this.players.filter(player => player.gameId && player.coordinate.isEqual(this.destination));
        if(winners.length > 0) {
            if(winners.length > 1){
                console.log(chalk.red(`Game ${this.id}over! ${winners.length} players won:`));
                console.log(chalk.white(`${winners.map(p => p.id).join(',')} are the winners`));
                winners.forEach(winner => {
                    winner.wonGame = true;
                    winner.gameId = null;
                });
                this.isExpired = true;
                clearInterval(this.intervalId);
            } else if(winners.length === 1){
                console.log(chalk.red(`Game ${this.id} over! Player${winners[0].id} won!`));
                winners[0].wonGame = true;
                winners[0].gameId = null;
                this.isExpired = true;
                clearInterval(this.intervalId);
            }
    }
    }

    play() {
        this.intervalId = setInterval(() => {
            console.log(chalk.bgRed(`Game ${this.id} Turn - ${this.plays}`));
            if(this.players.length > 0) {
                for(let player of this.players) {
                    if(player.gameId) {
                        this.movePlayer(player);
                    }
                }
                this.detectCollisions();
                this.checkForWinners();
                this.showGrid();
                this.plays++;
                this.removePlayers();
            } else {
                console.log(chalk.red("No players in this game"));
            }
        }, 5000);
        
    
    }

}
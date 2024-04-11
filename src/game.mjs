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
        this.grid = this.createGrid(this.rows, this.columns)
        this.destination = this.getRandomCoordinate(this.rows, this.columns);
        this.players = [];
        this.isExpired = false;
        this.intervalId = null;
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
            clearInterval(this.gameInterval);
            console.log(chalk.red(`All players eliminated. Game${this.id} Over!`));
            this.isExpired = true;
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
                console.log(chalk.red(`Game over! ${winners.length} players won:`));
                console.log(chalk.white(`${winners.map(p => p.id).join(',')} are the winners`));
                winners.forEach(winner => {
                    winner.wonGame = true;
                    winner.gameId = null;
                });
                this.isExpired = true;
            } else if(winners.length === 1){
                console.log(chalk.red(`Game over! Player${winners[0].id} won!`));
                winners[0].wonGame = true;
                winners[0].gameId = null;
                this.isExpired = true;
            }
    }
    }

    play() {
        console.log(chalk.bgRed(`destination is (${this.destination.x},${this.destination.y}) in game${this.id}`));
        if(this.players.length > 0) {
            for(let player of this.players) {
                if(player.gameId) {
                    this.movePlayer(player);
                }
            }
            this.detectCollisions();
            this.checkForWinners();
            this.removePlayers();
    } else {
        console.log(chalk.red("No players in this game"));
    }
    }

}
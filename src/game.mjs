import { getRandomInteger } from "./utils.mjs";
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(p) {
        return p.x === this.x && p.y === this.y;
    }

    toString() {
        return `Point(${this.x}, ${this.y})`;
      }
}
export class Game {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.createGrid(rows, columns)
        this.destination = Point(
            getRandomInteger(rows),
            getRandomInteger(columns)
        );
        this.players = []
    }
    addaddPlayer(player) {
        this.players.push(player)
    }

    createGrid(rows, columns) {
        const grid = []
        for(let i = 0; i < rows; i++) {
            grid[i] = []
            for(let j = 0; j < columns; j++) {
                grid[i][j] = Point(i, j);
            }
        }
        return grid;
    }

    showGrid() {
        this.grid.forEach(rows => {
            rows.forEach(point => {
                console.log(point.toString());
            });
        });
    }

}
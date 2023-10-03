import { DrawShape } from "./helpers/drawShape.js";
const drawShape = new DrawShape();

//0: empty space,  1: red wall,  2: green wall,  3: blue wall,  4: white wall,  5: yellow wall
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const CELL_SIZE = 20;
const walls = [];

class Wall {
    constructor({position, color}) {
        this.position = position;
        this.color = color;
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
    }
    
    draw(ctx) {
        //Draw colored square in the correct position
        drawShape.rect(ctx, this.position.x, this.position.y, this.width, this.height, this.color);

        // if(grid.checked) {
        //     //Draw vertical lines
        //     for (let col = 0; col < map[0].length; col++) {
        //         const x = col * CELL_SIZE;
        //         createLine(ctx, x, 0, x, scaledMapHeight, "gray");
        //     }

        //     //Draw horizontal lines
        //     for (let row = 0; row < map.length; row++) {
        //         const y = row * CELL_SIZE;
        //         createLine(ctx, 0, y, scaledMapWidth, y, "gray");
        //     }
        // }
    }
}

export class Map {
    constructor() {
        this.map = map
    }

    populateMap() {
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                const symbol = this.map[row][col];

                switch(symbol) {
                    case 1:
                        walls.push(new Wall ({
                            position: {
                                x: CELL_SIZE * col,
                                y: CELL_SIZE * row
                            },
                            color: "red"
                        }));
                        break;

                    case 2:
                        walls.push(new Wall ({
                            position: {
                                x: CELL_SIZE * col,
                                y: CELL_SIZE * row
                            },
                            color: "green"
                        }));
                        break;

                    case 3:
                        walls.push(new Wall ({
                            position: {
                                x: CELL_SIZE * col,
                                y: CELL_SIZE * row
                            },
                            color: "blue"
                        }));
                        break;

                    case 4:
                        walls.push(new Wall ({
                            position: {
                                x: CELL_SIZE * col,
                                y: CELL_SIZE * row
                            },
                            color: "white"
                        }));
                        break;

                    case 5:
                        walls.push(new Wall ({
                            position: {
                                x: CELL_SIZE * col,
                                y: CELL_SIZE * row
                            },
                            color: "yellow"
                        }));
                        break;
                }
            }
        }
    }

    draw(ctx) {
        this.populateMap();
        walls.forEach((wall) => {
            wall.draw(ctx);
        });
    }
}
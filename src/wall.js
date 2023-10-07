import { DrawShape } from "./helpers/drawShape.js";
const drawShape = new DrawShape();

export const CELL_SIZE = 20;

export class Wall {
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
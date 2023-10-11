import { output } from "./map.js";
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

        //Draw vertical lines
        // for (let col = 0; col < output[0].length; col++) {
        //     const x = col * CELL_SIZE;
        //     drawShape.line(ctx, x, 0, x, 480, "gray");
        // }

        // //Draw horizontal lines
        // for (let row = 0; row < output.length; row++) {
        //     const y = row * CELL_SIZE;
        //     drawShape.line(ctx, 0, y, 480, y, "gray");
        // }
    }
}
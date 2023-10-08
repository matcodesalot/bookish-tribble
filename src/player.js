import { DrawShape } from "./helpers/drawShape.js";
import { Input, keys } from "./input.js";
import { output } from "./map.js";
import { CELL_SIZE } from "./wall.js";
const drawShape = new DrawShape();
const input = new Input();

export class Player {
    constructor({position}) {
        this.position = position;
        this.width = 8;
        this.height = 8;
        this.angle = 0; //0: facing right, 3 * Math.PI / 2: facing up
        this.moveSpeed = 0.05;
        this.rotSpeed = 0.003;
    }

    movement(timeStep) {
        const sinA = Math.sin(this.angle);
        const cosA = Math.cos(this.angle);

        const scaledMoveSpeed = this.moveSpeed * timeStep;

        let dx = 0;
        let dy = 0;

        const speedSin = scaledMoveSpeed * sinA;
        const speedCos = scaledMoveSpeed * cosA;

        //moving forward and backward
        if(keys.up.pressed) {
            dx += speedCos;
            dy += speedSin;
        }
        if(keys.down.pressed) {
            dx += -speedCos;
            dy += -speedSin;
        }

        //strafing left and right
        // if(keys.left.pressed) {
        //     dx += speedSin;
        //     dy += -speedCos;
        // }
        // if(keys.right.pressed) {
        //     dx += -speedSin;
        //     dy += speedCos;
        // }

        //looking left and right
        if(keys.left.pressed) {
            this.angle -= this.rotSpeed * timeStep;
        }
        if(keys.right.pressed) {
            this.angle += this.rotSpeed * timeStep;
        }
        //if the angle goes over Math.PI * 2 or under Math.PI * 2, reset it to 0
        this.angle %= Math.PI * 2;

        //this.position.x += dx;
        //this.position.y += dy;

        this.checkWallCollision(dx, dy);
    }

    checkWall(x, y) {
        //Ensure the coordinates are within the map bounds
        if (x < 0 || x >= output.length || y < 0 || y >= output[0].length) {
            return true;  //Treat out-of-bounds as collision
        }

        return output[x][y] > 0;
    }
    
    checkWallCollision(dx, dy) {
        const playerLeft = Math.floor((this.position.x + dx) / CELL_SIZE);
        const playerRight = Math.floor((this.position.x + dx + this.width) / CELL_SIZE);
        const playerTop = Math.floor((this.position.y + dy) / CELL_SIZE);
        const playerBottom = Math.floor((this.position.y + dy + this.height) / CELL_SIZE);
    
        //Checking left and right of player
        if (!this.checkWall(playerLeft, Math.floor(this.position.y / CELL_SIZE)) && !this.checkWall(playerRight, Math.floor((this.position.y + this.height) / CELL_SIZE))) {
            this.position.x += dx;
        }
    
        //checking top and bottom of player
        if (!this.checkWall(Math.floor(this.position.x / CELL_SIZE), playerTop) && !this.checkWall(Math.floor((this.position.x + this.width) / CELL_SIZE)), playerBottom) {
            this.position.y += dy;
        }
    }

    draw(ctx) {
        drawShape.rect(ctx, this.position.x, this.position.y, this.width, this.height, "cyan");

        //Calculate the center point of the player
        const playerMiddleX = this.position.x + this.width / 2;
        const playerMiddleY = this.position.y + this.height / 2;

        //Calculate the ending point of the line based on the player's angle
        const lineEndX = playerMiddleX + Math.cos(this.angle) * this.width * 2;
        const lineEndY = playerMiddleY + Math.sin(this.angle) * this.height * 2;

        //Draw the line
        drawShape.line(ctx, playerMiddleX, playerMiddleY, lineEndX, lineEndY, "cyan");
    }
}
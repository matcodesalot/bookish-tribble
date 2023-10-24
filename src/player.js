import { DrawShape } from "./helpers/drawShape.js";
import { Input, keys } from "./input.js";
import { output } from "./map.js";
import { Vector2 } from "./vector2.js";
import { CELL_SIZE } from "./wall.js";
import { Map } from "./map.js";
const drawShape = new DrawShape();
const input = new Input();
const map = new Map();

export class Player {
    constructor({position}) {
        this.position = position;
        this.width = 8;
        this.height = 8;
        this.direction = new Vector2(-1, 0); //initial direction vector
        this.plane = new Vector2(0, 0.66); //the 2d raycaster version of camera plane
        this.moveSpeed = 0.005;
        this.rotSpeed = 0.003;
    }

    checkWall(map, x, y) {
        //Ensure the coordinates are within the map bounds
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return true;  //Treat out-of-bounds as collision
        }

        return map[x][y] > 0;
    }

    movement(timeStep) {
        const scaledMoveSpeed = this.moveSpeed * timeStep;
        const scaledRotSpeed = this.rotSpeed * timeStep;

        let dx = 0;
        let dy = 0;

        //moving forward and backward
        if(keys.up.pressed) {
            if(!this.checkWall(map.map, Math.floor(this.position.x + this.direction.x * scaledMoveSpeed), Math.floor(this.position.y))) {
                dx += this.direction.x * scaledMoveSpeed;
            }

            if(!this.checkWall(map.map, Math.floor(this.position.x), Math.floor(this.position.y + this.direction.y * scaledMoveSpeed))) {
                dy += this.direction.y * scaledMoveSpeed;
            }
        }
        if(keys.down.pressed) {
            if(!this.checkWall(map.map, Math.floor(this.position.x - this.direction.x * scaledMoveSpeed), Math.floor(this.position.y))) {
                dx += -this.direction.x * scaledMoveSpeed;
            }

            if(!this.checkWall(map.map, Math.floor(this.position.x), Math.floor(this.position.y - this.direction.y * scaledMoveSpeed))) {
                dy += -this.direction.y * scaledMoveSpeed;
            }
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
            //both camera direction and camera plane must be rotated
            let oldDirX = this.direction.x;
            this.direction.x = this.direction.x * Math.cos(scaledRotSpeed) - this.direction.y * Math.sin(scaledRotSpeed);
            this.direction.y = oldDirX * Math.sin(scaledRotSpeed) + this.direction.y * Math.cos(scaledRotSpeed);

            let oldPlaneX = this.plane.x;
            this.plane.x = this.plane.x * Math.cos(scaledRotSpeed) - this.plane.y * Math.sin(scaledRotSpeed);
            this.plane.y = oldPlaneX * Math.sin(scaledRotSpeed) + this.plane.y * Math.cos(scaledRotSpeed);
        }
        if(keys.right.pressed) {
            //both camera direction and camera plane must be rotated
            let oldDirX = this.direction.x;
            this.direction.x = this.direction.x * Math.cos(-scaledRotSpeed) - this.direction.y * Math.sin(-scaledRotSpeed);
            this.direction.y = oldDirX * Math.sin(-scaledRotSpeed) + this.direction.y * Math.cos(-scaledRotSpeed);

            let oldPlaneX = this.plane.x;
            this.plane.x = this.plane.x * Math.cos(-scaledRotSpeed) - this.plane.y * Math.sin(-scaledRotSpeed);
            this.plane.y = oldPlaneX * Math.sin(-scaledRotSpeed) + this.plane.y * Math.cos(-scaledRotSpeed);
        }

        this.position.x += dx;
        this.position.y += dy;
    }

    //This doesn't really work right now
    draw(ctx) {
        drawShape.rect(ctx, this.position.x * CELL_SIZE, this.position.y * CELL_SIZE, this.width, this.height, "cyan");

        //Calculate the center point of the player
        const playerMiddleX = this.position.x*CELL_SIZE + this.width / 2;
        const playerMiddleY = this.position.y*CELL_SIZE + this.height / 2;

        //Calculate the ending point of the line based on the player's angle
        const lineEndX = (playerMiddleX + this.direction.x * 4) * CELL_SIZE;
        const lineEndY = (playerMiddleY + this.direction.y * 4) * CELL_SIZE;

        //Draw the line
        drawShape.line(ctx, playerMiddleX, playerMiddleY, lineEndX, lineEndY, "cyan");
    }
}
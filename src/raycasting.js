import { output } from "./map.js";
import { DrawShape } from "./helpers/drawShape.js";
import { CELL_SIZE } from "./wall.js";
import { Map } from "./map.js";

const drawShape = new DrawShape();
const map = new Map();

export class Raycasting {
    constructor() {
        this.fov = Math.PI / 3;
        this.halfFov = this.fov / 2;
        this.numRays = 480; //480 = canvas.width
        this.halfNumRays = this.numRays / 2;
        this.deltaAngle = this.fov / this.numRays;
        this.maxDepth = 20;
    }

    distance(x1, y1, x2, y2) {
        //Pythagorean theorem
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    checkWall(map, x, y) {
        //Ensure the coordinates are within the map bounds
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return true;  //Treat out-of-bounds as collision
        }

        //return map[x][y] > 0;
    }

    getVCollision(player, angle) {
        //if this value is even, player is facing right. If it's odd, player is facing left
        const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

        let firstX;

        if(right) {
            firstX = Math.floor(player.position.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
        } 
        else {
            firstX = Math.floor(player.position.x / CELL_SIZE) * CELL_SIZE;
        }

        let firstY = player.position.y + (firstX - player.position.x) * Math.tan(angle);

        let stepX;

        if(right) {
            stepX = CELL_SIZE;
        }
        else {
            stepX = -CELL_SIZE;
        }

        let stepY = stepX * Math.tan(angle);

        let wall;
        let nextX = firstX;
        let nextY = firstY;

        //while the ray hasn't hit a wall
        while(!wall) {
            let cellX;
            //facing right
            if(right) {
                cellX = Math.floor(nextX / CELL_SIZE);
            }
            //facing left
            else {
                cellX = Math.floor(nextX / CELL_SIZE) - 1;
            }

            let cellY = Math.floor(nextY / CELL_SIZE);

            if(this.checkWall(output, cellX, cellY)) {
                break;
            }

            wall = output[cellX][cellY];

            if(!wall) {
                nextX += stepX;
                nextY += stepY;
            }
        }

        return {
            angle,
            distance: this.distance(player.position.x, player.position.y, nextX, nextY),
            vertical: true
        };
    }

    getHCollision(player, angle) {
        const up = Math.abs(Math.floor(angle / Math.PI) % 2);

        let firstY;

        if(up) {
            firstY = Math.floor(player.position.y / CELL_SIZE) * CELL_SIZE;
        } 
        else {
            firstY = Math.floor(player.position.y / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
        }

        let firstX = player.position.x + (firstY - player.position.y) / Math.tan(angle);

        let stepY;

        if(up) {
            stepY = -CELL_SIZE;
        }
        else {
            stepY = CELL_SIZE;
        }

        let stepX = stepY / Math.tan(angle);

        let wall;
        let nextX = firstX;
        let nextY = firstY;

        //while the ray hasn't hit a wall
        while(!wall) {
            let cellX = Math.floor(nextX / CELL_SIZE);
            let cellY;
            //facing up
            if(up) {
                cellY = Math.floor(nextY / CELL_SIZE) - 1;
            }
            //facing down
            else {
                cellY = Math.floor(nextY / CELL_SIZE);
            }

            if(this.checkWall(output, cellX, cellY)) {
                break;
            }

            wall = output[cellX][cellY];

            if(!wall) {
                nextX += stepX;
                nextY += stepY;
            }
        }

        return {
            angle,
            distance: this.distance(player.position.x, player.position.y, nextX, nextY),
            vertical: false
        };
    }

    castRay(player, angle) {
        const vCollision = this.getVCollision(player, angle);
        const hCollision = this.getHCollision(player, angle);

        return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
    }

    draw(player, ctx) {
        // Calculate the center point of the player
        const playerMiddleX = player.position.x + player.width / 2;
        const playerMiddleY = player.position.y + player.height / 2;

        //Iterate over each ray
        for (let rayCount = 0; rayCount < this.numRays; rayCount++) {
            const angle = player.angle - this.halfFov + rayCount * this.deltaAngle;

            //Cast the ray and get the collision point
            const collision = this.castRay(player, angle);

            //Calculate the end point of the ray
            const endX = player.position.x + Math.cos(angle) * collision.distance;
            const endY = player.position.y + Math.sin(angle) * collision.distance;

            //Draw the ray
            drawShape.line(ctx, playerMiddleX, playerMiddleY, endX, endY, "yellow");
        }
    }
}
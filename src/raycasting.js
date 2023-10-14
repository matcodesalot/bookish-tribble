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
        this.numRays = gameCanvas.width;
        this.halfNumRays = this.numRays / 2;
        this.deltaAngle = this.fov / this.numRays;
        this.maxDepth = 20;
    }

    distance(x1, y1, x2, y2) {
        //Pythagorean theorem
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    outOfMapBounds(map, x, y) {
        return x < 0 || x >= map.length || y < 0 || y >= map[0].length;
    }

    getWallColor(symbol) {
        if(symbol === 1) return "red"; //Red wall
        else if(symbol === 2) return "green"; //Green wall
        else if(symbol === 3) return "blue"; //Blue wall
        else if(symbol === 4) return "white"; //White wall
        else if(symbol === 5) return "yellow"; //Yellow wall
        else return "black"; //Default color for empty space or unrecognized symbols
    }

    getVCollision(player, angle) {
        //if this value is even, player is facing right. If it's odd, player is facing left
        const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

        const mapX = Math.floor(player.position.x / CELL_SIZE);

        let firstX;

        if(right) {
            firstX = mapX * CELL_SIZE + CELL_SIZE;
        } 
        else {
            firstX = mapX * CELL_SIZE;
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

            if(this.outOfMapBounds(output, cellX, cellY)) {
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

        const mapY = Math.floor(player.position.y / CELL_SIZE);

        let firstY;

        if(up) {
            firstY = mapY * CELL_SIZE;
        } 
        else {
            firstY = mapY * CELL_SIZE + CELL_SIZE;
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

            if(this.outOfMapBounds(output, cellX, cellY)) {
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

        let rayAngle = player.angle - this.halfFov;

        //Iterate over each ray
        for (let rayCount = 0; rayCount < this.numRays; rayCount++) {
            const rayCos = Math.cos(rayAngle);
            const raySin = Math.sin(rayAngle);

            //Cast the ray and get the collision point
            const ray = this.castRay(player, rayAngle);

            //Calculate the end point of the ray
            const endX = playerMiddleX + rayCos * ray.distance;
            const endY = playerMiddleY + raySin * ray.distance;

            //Limit the amount of rays that are being drawn on the mini-map
            if (rayCount === 0 || rayCount === ctx.canvas.width || rayCount % 80 === 0) {
                //Draw the ray: Vertical collision is blue, horizontal collision is red
                const color = ray.vertical ? 'blue' : 'red';
                drawShape.line(ctx, playerMiddleX, playerMiddleY, endX, endY, color);
            }

            rayAngle += this.deltaAngle;
        }
    }

    draw3D(player, ctx) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
    
        const columnWidth = canvasWidth / this.numRays;

        let rayAngle = player.angle - this.halfFov;

        //Render the floor
        ctx.fillStyle = "rgb(48, 52, 59)";
        ctx.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);

        //Render the ceiling
        ctx.fillStyle = "rgb(66, 135, 245)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight / 2);
    
        //Iterate over each ray
        for (let rayCount = 0; rayCount < this.numRays; rayCount++) {
            //Cast the ray and get the collision point
            const ray = this.castRay(player, rayAngle);

            //Fix fish-eye effect
            ray.distance *= Math.cos(player.angle - ray.angle);
    
            //Calculate the height of the column based on the distance to the wall
            const columnHeight = (canvasHeight / ray.distance) * this.maxDepth;
    
            //Calculate the y-position for the top of the column
            const columnTop = (canvasHeight - columnHeight) / 2;

            //Draw the column
            ctx.fillStyle = "white";
            ctx.fillRect(rayCount * columnWidth, columnTop, columnWidth, columnHeight);

            rayAngle += this.deltaAngle;
        }
    }
}
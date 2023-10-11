import { output } from "./map.js";
import { DrawShape } from "./helpers/drawShape.js";
import { CELL_SIZE } from "./wall.js";
import { Vector2 } from "./vector2.js";

const drawShape = new DrawShape();

export class Raycasting {
    constructor() {
        this.fov = Math.PI / 3;
        this.halfFov = this.fov / 2;
        this.numRays = 480 / 2; //480 = canvas.width
        this.halfNumRays = this.numRays / 2;
        this.deltaAngle = this.fov / this.numRays;
        this.maxDepth = 20;
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    checkWall(map, x, y) {
        //Ensure the coordinates are within the map bounds
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return true;  //Treat out-of-bounds as collision
        }

        return map[x][y] > 0;
    }

    // raycast(player, ctx) {
    //     //Calculate the center point of the player
    //     const playerMiddleX = player.position.x + player.width / 2;
    //     const playerMiddleY = player.position.y + player.height / 2;

    //     //map unit the player is standing in (CELL_SIZE = 20)
    //     const mapX = Math.floor(player.position.x / CELL_SIZE);
    //     const mapY = Math.floor(player.position.y / CELL_SIZE);

    //     console.log(`mapX: ${mapX}, mapY: ${mapY}`);

    //     let rayAngle = player.angle - this.halfFov;

    //     for(let rayCount = 0; rayCount <= this.numRays; rayCount++) {
    //         let rayCos = Math.cos(rayAngle);
    //         let raySin = Math.sin(rayAngle);

    //         // let verticalStep = new Vector2();

    //         // let x_vert;
    //         // let dx;
    //         // if (rayCos > 0) {
    //         //     x_vert = mapX + 1;
    //         //     dx = 1;
    //         // }
    //         // else {
    //         //     x_vert = mapX - 1e-6;
    //         //     dx = -1;
    //         // }

    //         //Calculate the ending point of the line based on the ray angle
    //         const lineEndX = playerMiddleX + rayCos * 1000;
    //         const lineEndY = playerMiddleY + raySin * 1000;

    //         //Draw the ray
    //         drawShape.line(ctx, playerMiddleX, playerMiddleY, lineEndX, lineEndY, "red");

    //         rayAngle += this.deltaAngle;
    //     }
    // }

    raycast(player, ctx) {
        const playerMiddleX = player.position.x + player.width / 2;
        const playerMiddleY = player.position.y + player.height / 2;

        const mapX = Math.floor(player.position.x / CELL_SIZE);
        const mapY = Math.floor(player.position.y / CELL_SIZE);
        
        let rayAngle = player.angle - this.halfFov;
    
        for (let rayCount = 0; rayCount < this.numRays; rayCount++) {
            let rayCos = Math.cos(rayAngle);
            let raySin = Math.sin(rayAngle);
    
            let deltaX = Math.abs(1 / rayCos); // distance between vertical grid lines
            let deltaY = Math.abs(1 / raySin); // distance between horizontal grid lines
    
            let step = new Vector2();
            let mapHit = new Vector2();
            let side;  // 0 for vertical hit, 1 for horizontal hit
            let hit = false;
    
            if (rayCos < 0) {
                step.x = -1;
                mapHit.x = mapX * CELL_SIZE;
            } 
            else {
                step.x = 1;
                mapHit.x = mapX * CELL_SIZE + CELL_SIZE;
            }
    
            if (raySin < 0) {
                step.y = -1;
                mapHit.y = mapY * CELL_SIZE;
            } 
            else {
                step.y = 1;
                mapHit.y = mapY * CELL_SIZE + CELL_SIZE;
            }
    
            // DDA algorithm
            while (!hit) {
                if (deltaX < deltaY) {
                    deltaX += Math.abs(1 / rayCos);
                    mapHit.x += step.x * CELL_SIZE;
                    side = 0;  // vertical hit
                } else {
                    deltaY += Math.abs(1 / raySin);
                    mapHit.y += step.y * CELL_SIZE;
                    side = 1;  // horizontal hit
                }

                if(this.checkWall(output, Math.floor(mapHit.y / CELL_SIZE), Math.floor(mapHit.x / CELL_SIZE))) {
                    hit = true;
                    console.log(hit);
                }
            }
    
            // Calculate the intersection point
            //const intersectionX = playerMiddleX + rayCos * distance * CELL_SIZE;
            //const intersectionY = playerMiddleY + raySin * distance * CELL_SIZE;
            
            // Draw the ray
            drawShape.line(ctx, playerMiddleX, playerMiddleY, mapHit.x, mapHit.y, "green");
    
            rayAngle += this.deltaAngle;
        }
    }
}
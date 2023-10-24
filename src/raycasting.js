import { DrawShape } from "./helpers/drawShape.js";
import { Map } from "./map.js";

const drawShape = new DrawShape();
const map = new Map();

export class Raycasting {
    constructor() {
        this.numRays = gameCanvas.width;
    }

    checkWall(map, x, y) {
        //Ensure the coordinates are within the map bounds
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return true;  //Treat out-of-bounds as collision
        }

        return map[x][y] > 0;
    }

    cmyk2rgb(c, m, y, k) {
        c = (c / 100);
        m = (m / 100);
        y = (y / 100);
        k = (k / 100);
        
        c = c * (1 - k) + k;
        m = m * (1 - k) + k;
        y = y * (1 - k) + k;
        
        let r = 1 - c;
        let g = 1 - m;
        let b = 1 - y;
        
        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);

        return `rgb(${r}, ${g}, ${b})`;
    }

    getWallColor(symbol, darkness) {
        if(symbol === 1) return this.cmyk2rgb(0, 100, 100, darkness); //Red wall
        else if(symbol === 2) return this.cmyk2rgb(100, 0, 100, darkness); //Green wall
        else if(symbol === 3) return this.cmyk2rgb(100, 100, 0, darkness); //Blue wall
        else if(symbol === 4) return this.cmyk2rgb(0, 0, 0, darkness); //White wall
        else if(symbol === 5) return this.cmyk2rgb(15, 0, 100, darkness); //Yellow wall
        else return "black"; //Default color for empty space or unrecognized symbols
    }

    raycast(player, ctx) {
        for (let rayIndex = 0; rayIndex < this.numRays; rayIndex++) {
            //Calculate ray position and direction
            let cameraX = 2 * rayIndex / this.numRays - 1; //x coordinate in camera space
            let rayDirX = player.direction.x + player.plane.x * cameraX;
            let rayDirY = player.direction.y + player.plane.y * cameraX;

            //Which box of the map we're in
            let mapX = Math.floor(player.position.x);
            let mapY = Math.floor(player.position.y);

            //Length of ray from current position to next x or y side
            let sideDistX;
            let sideDistY;

            //length of ray from one x or y side to next x or y side
            let deltaDistX = (rayDirX === 0) ? 1e30 : Math.abs(1 / rayDirX);
            let deltaDistY = (rayDirY === 0) ? 1e30 : Math.abs(1 / rayDirY);

            //What direction to step in. x or y direction (either +1 or -1)
            let stepX;
            let stepY;

            //Was a wall hit
            let hit = false;

            //Was a north/south (horizontal) or east/west (vertical) wall hit
            let side;

            //Calculate step and initial sideDist
            if(rayDirX < 0) {
                stepX = -1;
                sideDistX = (player.position.x - mapX) * deltaDistX;
            }
            else {
                stepX = 1;
                sideDistX = (mapX + 1.0 - player.position.x) * deltaDistX;
            }

            if(rayDirY < 0) {
                stepY = -1;
                sideDistY = (player.position.y - mapY) * deltaDistY;
            }
            else {
                stepY = 1;
                sideDistY = (mapY + 1.0 - player.position.y) * deltaDistY;
            }

            //DDA
            while(!hit) {
                //Jump to next map square, either in x direction or y direction
                if(sideDistX < sideDistY) {
                    sideDistX += deltaDistX;
                    mapX += stepX;
                    side = 0;
                }
                else {
                    sideDistY += deltaDistY;
                    mapY += stepY;
                    side = 1;
                }

                //Check if ray has hit a wall
                if(this.checkWall(map.map, mapX, mapY)) {
                    hit = true;
                }
            }

            //Calculate distance projected on camera direction. This is the shortest distance from the point where the wall is hit to the camera plane.
            let perpWallDist;

            //Horizontal
            if(side === 0) { 
                perpWallDist = (sideDistX - deltaDistX);
            }
            //Vertical
            else {
                perpWallDist = (sideDistY - deltaDistY);
            }

            //Calculate height of line to draw on screen
            let lineHeight = Math.floor(gameCanvas.height / perpWallDist);

            //calculate lowest and highest pixel to fill in current stripe
            let drawStart = Math.floor(-lineHeight / 2 + gameCanvas.height / 2);
            if (drawStart < 0) {
                drawStart = 0;
            }

            let drawEnd = Math.floor(lineHeight / 2 + gameCanvas.height / 2);
            if (drawEnd >= gameCanvas.height) {
                drawEnd = gameCanvas.height - 1;
            }

            //choose wall color
            let color = side === 1 ? this.getWallColor(map.map[mapX][mapY], 40) : this.getWallColor(map.map[mapX][mapY], 0);

            //draw rays
            drawShape.line(ctx, rayIndex, drawStart, rayIndex, drawEnd, color, 1);
        }
    }
}
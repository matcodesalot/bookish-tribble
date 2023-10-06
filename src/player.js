import { DrawShape } from "./helpers/drawShape.js";
import { Input, keys } from "./input.js";
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

    // movement(timeStep) {
    //     const sinA = Math.sin(this.angle);
    //     const cosA = Math.cos(this.angle);
    //     let deltaX = 0;
    //     let deltaY = 0;
        
    //     const speed = this.moveSpeed;

    //     const speedSin = speed * sinA;
    //     const speedCos = speed * cosA;

    //     //moving forward and backward
    //     if(keys.up.pressed) {
    //         deltaX += speedCos;
    //         deltaY += speedSin;
    //     }
    //     if(keys.down.pressed) {
    //         deltaX += -speedCos;
    //         deltaY += -speedSin;
    //     }
    //     //strafing left and right
    //     // if(input.direction === LEFT) {
    //     //     deltaX += speedSin;
    //     //     deltaY += -speedCos;
    //     // }
    //     // if(input.direction === RIGHT) {
    //     //     deltaX += -speedSin;
    //     //     deltaY += speedCos;
    //     // }

    //     //looking left and right
    //     if(keys.left.pressed) {
    //         this.angle -= this.rotSpeed;
    //     }
    //     if(keys.right.pressed) {
    //         this.angle += this.rotSpeed;
    //     }
    //     //if the angle goes over Math.PI * 2 or under Math.PI * 2, reset it to 0
    //     this.angle %= Math.PI * 2;

    //     this.position.x += deltaX;
    //     this.position.y += deltaY;
    // }

    movement(timeStep) {
        const sinA = Math.sin(this.angle);
        const cosA = Math.cos(this.angle);

        const scaledMoveSpeed = this.moveSpeed * timeStep;

        const deltaX = scaledMoveSpeed * cosA;
        const deltaY = scaledMoveSpeed * sinA;

        let moveX = 0;
        let moveY = 0;

        //moving forward and backward
        if(keys.up.pressed) {
            moveX += deltaX;
            moveY += deltaY;
        }
        if(keys.down.pressed) {
            moveX += -deltaX;
            moveY += -deltaY;
        }

        //strafing left and right
        // if(keys.left.pressed) {
        //     moveX += deltaY;
        //     moveY += -deltaX;
        // }
        // if(keys.right.pressed) {
        //     moveX += -deltaY;
        //     moveY += deltaX;
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

        this.position.x += moveX;
        this.position.y += moveY;
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
import { GameLoop } from "./src/gameLoop.js";
import { Vector2 } from "./src/vector2.js";
import { Player } from "./src/player.js";
import { Map } from "./src/map.js";
import { Raycasting } from "./src/raycasting.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 480;

const player = new Player({
    position: new Vector2(240, 440)
});

const map = new Map();

const update = (deltaTime) => {
    //Updating entities in the game
    player.movement(deltaTime);
}

const draw = () => {
    //Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw map
    map.draw(ctx);

    //Draw player
    player.draw(ctx);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
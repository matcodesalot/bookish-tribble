import { GameLoop } from "./src/gameLoop.js";
import { Vector2 } from "./src/vector2.js";
import { Player } from "./src/player.js";
import { Map } from "./src/map.js";
import { Raycasting } from "./src/raycasting.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 480;

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");

gameCanvas.width = 640;
gameCanvas.height = 480;

const player = new Player({
    position: new Vector2(22, 12)
});

const map = new Map();

const raycasting = new Raycasting();

const update = (deltaTime) => {
    //Updating entities in the game
    player.movement(deltaTime);
}

const draw = () => {
    //Clear both mini-map screen and game screen.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    //Draw map (2d)
    map.draw(ctx);

    //Cast rays
    raycasting.raycast(player, gameCtx);

    //Draw player (2d)
    //player.draw(ctx);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

document.addEventListener("keydown", (e) => {
    if(e.code === "KeyJ") {
        gameLoop.stop();
    }
    if(e.code === "KeyK") {
        gameLoop.start();
    }
});
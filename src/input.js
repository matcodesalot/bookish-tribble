export const keys = {
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    left: {
        pressed: false
    },
    right: {
        pressed: false
    }
};

export class Input {
    constructor() {
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                keys.up.pressed = true;
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                keys.down.pressed = true;
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                keys.left.pressed = true;
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                keys.right.pressed = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                keys.up.pressed = false;
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                keys.down.pressed = false;
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                keys.left.pressed = false;
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                keys.right.pressed = false;
            }
        });
    }
}
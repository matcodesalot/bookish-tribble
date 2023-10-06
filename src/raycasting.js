export class Raycasting {
    constructor() {
        this.fov = math.pi / 3;
        this.halfFov = this.fov / 2;
        this.numRays = canvas.width / 2;
        this.halfNumRays = this.numRays / 2;
        this.deltaAngle = this.fov / this.numRays;
        this.maxDepth = 20;
    }

    raycast(player, walls) {
        const rayAngle = player.angle - this.halfFov + 0.0001;
    }
}
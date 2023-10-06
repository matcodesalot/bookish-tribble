export class Raycasting {
    constructor() {
        this.fov = math.pi / 3;
        this.halfFov = this.fov / 2;
        this.numRays = 480; //480 = canvas.width
        this.halfNumRays = this.numRays / 2;
        this.deltaAngle = this.fov / this.numRays;
        this.maxDepth = 20;
    }

    raycast(player, walls) {
        const ox = player.position.x;
        const oy = player.position.y;

        //need to loop over the walls array I think
        //const wallX = walls.position.x;
        //const wallY = walls.position.y;
        const rayAngle = player.angle - this.halfFov + 0.0001;

        for(let i = 0; i < this.numRays; i++) {
            const sinA = Math.sin(rayAngle);
            const cosA = Math.cos(rayAngle);

            //Verticals



            rayAngle += this.deltaAngle;
        }
    }
}
export class DrawShape {
    line(ctx, x1, y1, x2, y2, color = "black", lineWidth = 1) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
    }

    rect(ctx, x, y, width, height, color = "black") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}
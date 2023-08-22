const projectTo3d = (vertices, distance) => {
    const projectedVertices = [];
    for (let v of vertices) projectedVertices.push([
        v[0] * (1 / (distance - v[3])),
        v[1] * (1 / (distance - v[3])),
        v[2] * (1 / (distance - v[3]))
    ])
    return projectedVertices;
}

const projectTo2d = (vertices, distance) => {
    const projectedVertices = [];
    for (let v of vertices) projectedVertices.push([v[0] * (1 / (distance - v[2])), v[1] * (1 / (distance - v[2]))]);
    return projectedVertices;
}

const scale = (vertices, scale) => {
    return math.multiply(vertices, scale);
}
const rotationMatrix3d = (angle, axis) => {
    switch (axis) {
        case "x":
            return [
                [1, 0, 0],
                [0, Math.cos(angle), -Math.sin(angle)],
                [0, Math.sin(angle), Math.cos(angle)]
            ];

        case "y":
            return [
                [Math.cos(angle), 0, -Math.sin(angle)],
                [0, 1, 0],
                [Math.sin(angle), 0, Math.cos(angle)]
            ];
        case "z":
            return [
                [Math.cos(angle), -Math.sin(angle)],
                [Math.sin(angle), Math.cos(angle)],
                [0, 0, 1]
            ];

        default:
            console.warn("The axis should be 'x' or 'y' or 'z'");
            return [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];
    }
}

const rotationMatrix4d = (angle, axis) => {
    switch (axis) {
        case "xy":
            return [
                [Math.cos(angle), Math.sin(angle), 0, 0],
                [-Math.sin(angle), Math.cos(angle), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];

        case "xz":
            return [
                [Math.cos(angle), 0, Math.sin(angle), 0],
                [0, 1, 0, 0],
                [-Math.sin(angle), 0, Math.cos(angle), 0],
                [0, 0, 0, 1],
            ];

        case "xw":
            return [
                [Math.cos(angle), 0, 0, -Math.sin(angle)],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [Math.sin(angle), 0, 0, Math.cos(angle)],
            ];

        case "yz":
            return [
                [1, 0, 0, 0],
                [0, Math.cos(angle), -Math.sin(angle), 0],
                [0, Math.sin(angle), Math.cos(angle), 0],
                [0, 0, 0, 1],
            ];

        case "yw":
            return [
                [1, 0, 0, 0],
                [0, Math.cos(angle), 0, -Math.sin(angle)],
                [0, 0, 1, 0],
                [0, Math.sin(angle), 0, Math.cos(angle)],
            ];

        case "zw":
            return [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, Math.cos(angle), -Math.sin(angle)],
                [0, 0, Math.sin(angle), Math.cos(angle)],
            ];

        default:
            console.warn("The axis should be 'x' or 'y' or 'z'");
            return [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
            ];
    }
}

const clearCanvas = (ctx, x1, y1, x2, y2, color = "white") => {
    ctx.lineWidth = 1.5;
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2, y2);
    ctx.fill();
}
const line = (x, y, a, b) => {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x + a[0], y - a[1]);
    ctx.lineTo(x + b[0], y - b[1]);
    ctx.stroke();
}

const drawTesseract = (x, y, vertices) => {
    line(x, y, vertices[0], vertices[1]);
    line(x, y, vertices[1], vertices[2]);
    line(x, y, vertices[2], vertices[3]);
    line(x, y, vertices[3], vertices[0]);

    line(x, y, vertices[4], vertices[5]);
    line(x, y, vertices[5], vertices[6]);
    line(x, y, vertices[6], vertices[7]);
    line(x, y, vertices[7], vertices[4]);

    line(x, y, vertices[0], vertices[4]);
    line(x, y, vertices[1], vertices[5]);
    line(x, y, vertices[2], vertices[6]);
    line(x, y, vertices[3], vertices[7]);

    line(x, y, vertices[0 + 8], vertices[1 + 8]);
    line(x, y, vertices[1 + 8], vertices[2 + 8]);
    line(x, y, vertices[2 + 8], vertices[3 + 8]);
    line(x, y, vertices[3 + 8], vertices[0 + 8]);

    line(x, y, vertices[4 + 8], vertices[5 + 8]);
    line(x, y, vertices[5 + 8], vertices[6 + 8]);
    line(x, y, vertices[6 + 8], vertices[7 + 8]);
    line(x, y, vertices[7 + 8], vertices[4 + 8]);

    line(x, y, vertices[0 + 8], vertices[4 + 8]);
    line(x, y, vertices[1 + 8], vertices[5 + 8]);
    line(x, y, vertices[2 + 8], vertices[6 + 8]);
    line(x, y, vertices[3 + 8], vertices[7 + 8]);

    line(x, y, vertices[0], vertices[8]);
    line(x, y, vertices[1], vertices[9]);
    line(x, y, vertices[2], vertices[10]);
    line(x, y, vertices[3], vertices[11]);

    line(x, y, vertices[4], vertices[12]);
    line(x, y, vertices[5], vertices[13]);
    line(x, y, vertices[6], vertices[14]);
    line(x, y, vertices[7], vertices[15]);
}
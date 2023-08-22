const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Tess = [
    [-100, 100, 100, 100],
    [100, 100, 100, 100],
    [100, -100, 100, 100],
    [-100, -100, 100, 100],

    [-100, 100, -100, 100],
    [100, 100, -100, 100],
    [100, -100, -100, 100],
    [-100, -100, -100, 100],

    [-100, 100, 100, -100],
    [100, 100, 100, -100],
    [100, -100, 100, -100],
    [-100, -100, 100, -100],

    [-100, 100, -100, -100],
    [100, 100, -100, -100],
    [100, -100, -100, -100],
    [-100, -100, -100, -100]
];

let angle = 0.0;

const loop = () => {
    clearCanvas(ctx, 0, 0, canvas.width, canvas.height, "black");

    let Tesseract3dRotated = math.multiply(Tess, rotationMatrix4d(angle, "zw"));
    Tesseract3dRotated = math.multiply(Tesseract3dRotated, rotationMatrix4d(angle, "xy"));

    let Tesseract3d = projectTo3d(Tesseract3dRotated, 230);
    Tesseract3d = scale(Tesseract3d, 100);
    Tesseract3d = math.multiply(Tesseract3d, rotationMatrix3d(Math.PI / 2, "x"));

    let Tesseract2d = projectTo2d(Tesseract3d, 230);
    Tesseract2d = scale(Tesseract2d, 100);

    drawTesseract(canvas.width / 2, canvas.height / 2, Tesseract2d);

    angle += 0.03;
    window.requestAnimationFrame(loop);
}

loop();
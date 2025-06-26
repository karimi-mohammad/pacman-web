const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');
const blockSize = 25;
const wallColor = "#331771";
const FPS = 30;
const FRAME_DURATION = 1000 / FPS; // مدت زمان هر فریم به میلی‌ثانیه
let lastRender = 0;




const drawRect = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.fillRect(x, y, width, height);
    // ctx.strokeRect(x, y, width, height);
}
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]


const pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize * 2.8, blockSize,map);
let direction = { x: 1, y: 0 }; // جهت فعلی
let pendingDirection = { x: 1, y: 0 }; // جهت درخواستی

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            pendingDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            pendingDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            pendingDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            pendingDirection = { x: 1, y: 0 };
            break;
    }
});

async function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    if (currentTime - lastRender < FRAME_DURATION) return;

    const deltaTime = Math.min((currentTime - lastRender) / 1000, 0.05);
    lastRender = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 1) {
                drawRect(j * blockSize, i * blockSize, blockSize, blockSize, wallColor);
            }
        }
    }

    // اگر پک‌من در مرکز بلاک بود و حرکت به جهت درخواستی ممکن بود، جهت را تغییر بده
    const { centerX, centerY } = pacman.isCentered();
    if (
        ((pendingDirection.x !== 0 && centerY) || (pendingDirection.y !== 0 && centerX)) &&
        pacman.checkIfCanMove(pendingDirection.x, pendingDirection.y)
    ) {
        direction = pendingDirection;
    }

    pacman.draw(ctx);
    pacman.move(deltaTime, direction);
}
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(gameLoop);
});

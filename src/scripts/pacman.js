class Pacman {
    constructor(x, y, width, height, movePX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.movePX = movePX;

        this.image = new Image();
        this.image.src = "./src/images/Pacman-sprite.png";

        this.totalFrames = 4; // تعداد فریم‌ها
        this.currentFrame = 0;
        this.frameDuration = 100; // هر فریم چند میلی‌ثانیه نمایش داده شود
        this.lastFrameChange = Date.now();
    }

    updateFrame() {
        const now = Date.now();
        if (now - this.lastFrameChange > this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
            this.lastFrameChange = now;
        }
    }

    draw(ctx) {
        this.updateFrame();

        const spriteWidth = this.image.width / this.totalFrames;
        const spriteHeight = this.image.height;

        ctx.drawImage(
            this.image,
            this.currentFrame * spriteWidth, // sx
            0, // sy
            spriteWidth, // sw
            spriteHeight, // sh
            this.x, // dx
            this.y, // dy
            this.width, // dw
            this.height // dh
        );
    }

    move() {
        this.x += this.movePX;
    }
}



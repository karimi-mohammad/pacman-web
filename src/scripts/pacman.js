class Pacman {
    constructor(x, y, width, height, movePX, blockSize, map) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.movePX = movePX;
        this.blockSize = blockSize
        this.map = map
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



    move(deltaTime) {
        const speed = this.movePX;
        const moving = speed * deltaTime;

        const moveX = moving;
        const moveY = 0; 

        if (this.checkIfCanMove(moveX, moveY)) {
            this.x += moveX;
        } else {
            console.log("برخورد با دیوار");
        }
    }
    

    checkIfCanMove(moveX, moveY) {
        const nextX = this.x + moveX;
        const nextY = this.y + moveY;

        const left = nextX;
        const right = nextX + this.width - 1;
        const top = nextY;
        const bottom = nextY + this.height - 1;

        const topLeft = this.map[Math.floor(top / this.blockSize)]?.[Math.floor(left / this.blockSize)];
        const topRight = this.map[Math.floor(top / this.blockSize)]?.[Math.floor(right / this.blockSize)];
        const bottomLeft = this.map[Math.floor(bottom / this.blockSize)]?.[Math.floor(left / this.blockSize)];
        const bottomRight = this.map[Math.floor(bottom / this.blockSize)]?.[Math.floor(right / this.blockSize)];

        return (
            topLeft !== 1 &&
            topRight !== 1 &&
            bottomLeft !== 1 &&
            bottomRight !== 1
        );
    }
    
    


}



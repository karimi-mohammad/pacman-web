class Pacman {
    constructor(x, y, width, height, movePX) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.movePX = movePX
    }
    draw() {
        // TODO : animate gif in canvas and change size img in canvas
        // gifler Lib
        
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, this.x, this.y); // رسم تصویر از نقطه (0,0)
        };
        img.src = "./src/images/Pacman.gif";
        // img.height = this.height + "px !important"
        img.style.width = "10px"
        img.height = "20"
        console.log("ok");
        console.log(img);

    }
    move() {

    }
    changeDir() {

    }
}

// create new
const pacman = new Pacman(100, 100, blockSize, blockSize, blockSize / 2)
pacman.draw()
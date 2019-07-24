class Camera {
    
    constructor() {
        this.position = new Vector(0, 0);
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.xOffset = 0;
    }
    
    setup(map) {
        this.minX = map.canvasWidth * 0.5;
        this.minY = map.canvasHeight * 0.5;
        this.maxX = map.getWidth() - map.canvasWidth * 0.5;
        this.maxY = map.getHeight() - map.canvasHeight * 0.5;
    }
    
    update(player) {
        if (player.position.x >= this.maxX) {
            this.position.x = this.xOffset + (this.maxX - this.minX);
        } else if (player.position.x >= this.minX) {
            this.position.x = this.xOffset + (player.position.x - this.minX);
        } else {
            this.position.x = this.xOffset;
        }

        if (player.position.y >= this.maxY) {
            this.position.y = this.maxY - this.minY;
        } else if (player.position.y >= this.minY) {
            this.position.y = player.position.y - this.minY;
        } else {
            this.position.y = 0;
        }
    }
    
    resetState() {
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.xOffset = 0;
    }
}



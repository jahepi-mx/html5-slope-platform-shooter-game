class Camera {
    
    constructor() {
        this.position = new Vector(0, 0);
    }
    
    update(player) {
        
        var map = player.map;
        
        var minX = map.canvasWidth * 0.5;
        var minY = map.canvasHeight * 0.5;
        var maxX = map.getWidth() - map.canvasWidth * 0.5;
        var maxY = map.getHeight() - map.canvasHeight * 0.5;

        if (player.position.x >= maxX) {
            this.position.x = maxX - minX;
        } else if (player.position.x >= minX) {
            this.position.x = player.position.x - minX;
        } else {
            this.position.x = 0;
        }

        if (player.position.y >= maxY) {
            this.position.y = maxY - minY;
        } else if (player.position.y >= minY) {
            this.position.y = player.position.y - minY;
        } else {
            this.position.y = 0;
        }
    }
}



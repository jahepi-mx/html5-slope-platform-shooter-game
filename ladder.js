class Ladder extends Tile {
    
    constructor(x, y, camera, type, map) {
        super(map.tileWidth, map.tileHeight, x, y, camera, type);
        this.map = map;
        
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        context.fillStyle = "#f4f4f4";
        context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
    }
    
}



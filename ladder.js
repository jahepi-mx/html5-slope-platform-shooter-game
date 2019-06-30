class Ladder extends Tile {
    
    constructor(width, height, x, y, camera, type) {
        super(width, height, x, y, camera, type);
        this.walkable = true;
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



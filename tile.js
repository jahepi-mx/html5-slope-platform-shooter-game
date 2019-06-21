class Tile extends Entity {
    
    constructor(width, height, x, y, camera, type) {
        super();
        this.size.x = width;
        this.size.y = height;
        this.position.x = x * width + width * 0.5;
        this.position.y = y * height + height * 0.5;
        this.camera = camera;
        this.type = type;
        this.walkable = type === 0 || type === 2;
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        context.fillStyle = this.walkable ? "#fff" : "#f4f4f4";
        context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
        
    }
}


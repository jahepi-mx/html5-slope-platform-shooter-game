class Tile extends Entity {
    
    constructor(width, height, x, y, camera, type) {
        super();
        this.size.x = width;
        this.size.y = height;
        this.position.x = x * width + width * 0.5;
        this.position.y = y * height + height * 0.5;
        this.camera = camera;
        this.type = type;
        this.walkable = type === 0;
        this.tmpType = type;
        if (this.type > 0) {
            this.type = WALL_TILE;
        }
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        if (!this.walkable) {
            var atlas = Atlas.getInstance();
            var assets = Assets.getInstance(); 
            //context.fillStyle = this.walkable ? "#fff" : "#f4f4f4";
            //context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
            var image = "tile" + this.tmpType;
            context.drawImage(assets.spritesAtlas, atlas.sprites[image].x, atlas.sprites[image].y, atlas.sprites[image].width, atlas.sprites[image].height, newX, offsetY - newY, this.size.x, this.size.y);
        }
    }
}


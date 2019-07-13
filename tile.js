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
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
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
            var image = "tile" + this.tmpType;
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, offsetY - newY, this.size.x + 1, this.size.y + 1);
        }
        if (this.walkable && this.tmpType > 0) {
            var image = "walkable" + this.tmpType;
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, offsetY - newY, this.size.x + 1, this.size.y + 1);
        }
    }
}


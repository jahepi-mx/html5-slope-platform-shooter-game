class TopLadder extends Ladder {
    constructor(width, height, x, y, camera, type) {
        super(width, height, x, y, camera, type);
        this.walkable = false;
        this.type = TOP_LADDER_TILE;
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        //context.fillStyle = "#f4f4f4";
        //context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
        
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance(); 
        var image = "tile" + TOP_LADDER_TILE;
        context.drawImage(assets.spritesAtlas, atlas.sprites[image].x, atlas.sprites[image].y, atlas.sprites[image].width, atlas.sprites[image].height, newX, offsetY - newY, this.size.x + 1, this.size.y + 1);
    }
}


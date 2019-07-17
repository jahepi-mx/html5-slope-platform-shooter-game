class SlopeTile extends Tile {
    
    constructor(width, height, x, y, camera, type, low, high) {
        super(width, height, x, y, camera, type);
        this.walkable = true;
        this.low = low;
        this.high = high;
        this.type = SLOPE_TILE;
    }
    
    collide(entity) {
        var width = this.size.x * 0.5;
        var entityBottom = entity.position.y - entity.size.y * 0.5;
        var height = this.size.y;
        var xDiff = Math.abs(entity.position.x - this.position.x);
        var yDiff = Math.abs(entityBottom - this.position.y);
        return xDiff <= width && yDiff <= height;
    }
    
    getNewY(entity) {
        var offset = this.low;
        var x = this.size.x;
        var y = this.high - this.low;
        var slope = x === 0 ? 0 : y / x;
        
        var yOffset = 0.1;
        var diff = (entity.position.x - this.left()) * slope;
        var final = offset + this.bottom() + diff + entity.size.y * 0.5;
        return final + yOffset;
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        /*
        context.fillStyle = "#f4f4f4";
        context.strokeStyle = "#f4f4f4";
        context.beginPath();
        context.moveTo(newX, offsetY - newY);
        context.lineTo(newX + this.size.x, offsetY - newY);
        context.lineTo(newX + this.size.x, offsetY - (newY + this.high));
        context.lineTo(newX, offsetY - (newY + this.low));
        context.lineTo(newX, offsetY - newY);
        context.fill();
        */
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance(); 
        var image = "slope" + this.tmpType;
        context.drawImage(assets.spritesAtlas, atlas.sprites[image].x, atlas.sprites[image].y, atlas.sprites[image].width, atlas.sprites[image].height, newX, offsetY - newY, this.size.x, this.size.y);
    } 
}



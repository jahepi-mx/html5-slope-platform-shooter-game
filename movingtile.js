class MovingTile extends Entity {
    
    constructor(camera, map) {
        super();
        this.start = new Vector(1 * map.tileWidth + map.tileWidth * 0.5, 1 * map.tileHeight + map.tileHeight * 0.5);
        this.end = new Vector(1 * map.tileWidth + map.tileWidth * 0.5, 4 * map.tileHeight + map.tileHeight * 0.5);
        this.size.x = map.tileWidth * 1.5;
        this.size.y = map.tileHeight * 0.5;
        this.map = map;
        this.position.x = this.start.x;
        this.position.y = this.start.y;
        this.to = this.end.clone();
        this.turn = 0;
        this.translation = new Vector(0, 0);
        this.prevPosition = new Vector(0, 0);
        this.velocity = new Vector(80, 0);
        this.velocityLength = this.velocity.length();
        this.camera = camera;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
    }
    
    update(dt) {
        
        var translation = this.position.sub(this.to);
        var length = translation.length();
        // Normalize vector
        translation.x /= length;
        translation.y /= length;
        this.translation = translation.mulByScalar(this.velocityLength);
        translation = this.translation.mulByScalar(dt);
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        this.position.addThis(translation);
        
        if (length < 5) {
            this.to = this.turn++ % 2 > 0 ? this.start.clone() : this.end.clone();
        }
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        var image = "platform";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, offsetY - newY, this.size.x + 1, this.size.y + 1);
    }
    
    collideFromFalling(entity) {
        if (entity.velocity.y < 0) {
            var entityBottom = entity.position.y - entity.size.y * 0.5;
            var tileTop = this.position.y + this.size.y * 0.4;
            var tileTopMid = this.position.y;
            
            var width = this.size.x * 0.5;
            var otherWidth = entity.size.x * 0.5;
            var xDistant = Math.abs(this.position.x - entity.position.x);
            return xDistant <= width + otherWidth && entityBottom < tileTop && entityBottom > tileTopMid;
        }
        return false;
    }
    
    collide(entity) {
        
        /*
         Previous position of the moving tile is compared for collision detection because the moving tile
         position is updated before the player position or any entity position.
         */
        
        var entityBottom = entity.position.y - entity.size.y * 0.5;
        var tileTop = this.prevPosition.y + this.size.y * 0.5;
        var tileTopMid = this.prevPosition.y;

        var width = this.size.x * 0.5;
        var otherWidth = entity.size.x * 0.5;
        var xDistant = Math.abs(this.prevPosition.x - entity.position.x);
        return xDistant <= width + otherWidth && entityBottom < tileTop && entityBottom > tileTopMid;
    }
}



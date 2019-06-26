class MovingTile extends Entity {
    
    constructor(camera, map) {
        super();
        this.start = new Vector(2 * map.tileWidth + map.tileWidth * 0.5, 1 * map.tileHeight + map.tileHeight * 0.5);
        this.end = new Vector(5 * map.tileWidth + map.tileWidth * 0.5, 1 * map.tileHeight + map.tileHeight * 0.5);
        this.size.x = 75;
        this.size.y = 25;
        this.map = map;
        this.position.x = this.start.x;
        this.position.y = this.start.y;
        this.to = this.end.clone();
        this.turn = 0;
        this.translation = new Vector(0, 0);
        this.velocity = new Vector(80, 0);
        this.velocityLength = this.velocity.length();
        this.camera = camera;
    }
    
    update(dt) {
        var diff = this.position.sub(this.to).length();
        
        if (diff < 5) {
            this.to = this.turn % 2 > 0 ? this.start.clone() : this.end.clone();
            this.turn++;
        }
        
        var translation = this.position.sub(this.to);
        translation = translation.normalize();
        this.translation = translation.mulByScalar(this.velocityLength);
        translation = this.translation.mulByScalar(dt);
        this.position.addThis(translation);
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        context.fillStyle = "#f4f4f4";
        context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
    }
    
    collideFromFalling(entity) {
        if (entity.velocity.y < 0) {
            var width = this.size.x * 0.5;
            var height = this.size.y * 0.5;
            var otherWidth = entity.size.x * 0.5;
            var otherHeight = entity.size.x * 0.5 * 0.5;
            var xDistant = Math.abs(this.position.x - entity.position.x);
            // The vector obtained from the entity position to the moving tile position must be positive.
            var yDistant = entity.position.y - this.position.y;
            return xDistant <= width + otherWidth && yDistant <= height + otherHeight && yDistant >= 0;
        }
        return false;
    }
    
    collide(entity) {
        var width = this.size.x * 0.5;
        var height = this.size.y * 0.5;
        var otherWidth = entity.size.x * 0.5;
        var otherHeight = entity.size.y * 0.5;
        var xDistant = Math.abs(this.position.x - entity.position.x);
        // The vector obtained from the entity position to the moving tile position must be positive.
        var yDistant = entity.position.y - this.position.y;
        return xDistant <= width + otherWidth && yDistant <= height + otherHeight && yDistant >= 0;
    }
}



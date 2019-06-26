class CeilingTile extends Tile {
    
    constructor(width, height, x, y, camera, type) {
        super(width, height, x, y, camera, type);
        this.walkable = true;
        this.translation = new Vector(0, 0);
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
            var entityBottom = entity.position.y - entity.size.y * 0.5;
            var tileTop = this.position.y + this.size.y * 0.4;
            var tileTopMid = this.position.y + this.size.y * 0.5 * 0.5;
            
            var width = this.size.x * 0.5;
            var otherWidth = entity.size.x * 0.5;
            var xDistant = Math.abs(this.position.x - entity.position.x);
            return xDistant <= width + otherWidth && entityBottom < tileTop && entityBottom > tileTopMid;
        }
        return false;
    }
    
    collide(entity) {
        var entityBottom = entity.position.y - entity.size.y * 0.5;
        var tileTop = this.position.y + this.size.y * 0.5;
        var tileTopMid = this.position.y + this.size.y * 0.5 * 0.5;

        var width = this.size.x * 0.5;
        var otherWidth = entity.size.x * 0.5;
        var xDistant = Math.abs(this.position.x - entity.position.x);
        return xDistant <= width + otherWidth && entityBottom < tileTop && entityBottom > tileTopMid;
    }
    
}


class SlopeTile extends Tile {
    
    constructor(width, height, x, y, camera, type) {
        super(width, height, x, y, camera, type);
        this.walkable = true;
        this.low = 0;
        this.high = height;
    }
    
    collide(entity) {
        var width = this.size.x * 0.5;
        var entityBottom = entity.position.y - entity.size.y * 0.5;
        var height = this.size.y * 0.5;
        var xDiff = Math.abs(entity.position.x - this.position.x);
        var yDiff = Math.abs(entityBottom - this.position.y);
        return xDiff <= width && yDiff <= height;
    }
    
    getNewY(entity) {
        var offset = this.low;
        var x = this.size.x;
        var y = this.high - this.low;
        var slope = x === 0 ? 0 : y / x;
        
        var yOffset = 1;
        var diff = (entity.position.x - this.left()) * slope;
        var final = offset + this.bottom() + diff + entity.size.y * 0.5;
        return final + yOffset;
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        
        newX -= this.size.x * 0.5;
        newY -= this.size.y * 0.5;
        context.fillStyle = "#f4f4f4";
        context.strokeStyle = "#f4f4f4";
        context.beginPath();
        context.moveTo(newX, offsetY - newY);
        context.lineTo(newX + this.size.x, offsetY - newY);
        context.lineTo(newX + this.size.x, offsetY - (newY + this.high));
        context.lineTo(newX, offsetY - (newY + this.low));
        context.lineTo(newX, offsetY - newY);
        context.fill();   
    } 
}



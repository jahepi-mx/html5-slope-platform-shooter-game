class RotatingTile extends MovingTile {
    
    constructor(camera, map, x, y) {
        super(camera, map);
        this.velocityLength = map.tileWidth;
        this.start = new Vector(x * map.tileWidth + map.tileWidth * 0.5, y * map.tileHeight + map.tileHeight * 0.5);
        // Start vector is the origin and velocityLenght is the radius of the rotation
        this.position.x = this.start.x + this.velocityLength;
        this.position.y = this.start.y;
        this.degrees = 45;
        this.speed = 4;
    }
    
    update(dt) {
        
        var diff = this.start.sub(this.position);
        
        var normalized = diff.normalize().mulByScalar(this.velocityLength);
        
        var rotated = normalized.ccwTransform(this.degrees);
        
        this.translation = diff.sub(rotated).mulByScalar(this.speed);
        var translation = this.translation.mulByScalar(dt);
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        this.position.addThis(translation);
        
    }
    
}



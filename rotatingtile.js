class RotatingTile extends MovingTile {
    
    constructor(camera, map, x, y) {
        super(camera, map);
        this.length = 50;
        this.origin = new Vector(x * map.tileWidth + map.tileWidth * 0.5, y * map.tileHeight + map.tileHeight * 0.5);
        
        this.position.x = this.origin.x + this.length;
        this.position.y = this.origin.y;
        this.degrees = 45;
    }
    
    update(dt) {
        
        var diff = this.origin.sub(this.position);
        
        var normalized = diff.normalize().mulByScalar(this.length);
        
        var rotated = normalized.ccwTransform(this.degrees);
        
        this.translation = diff.sub(rotated).mulByScalar(1);
        var translation = this.translation.mulByScalar(dt);
        this.prevPosition = this.position.clone();
        this.position.addThis(translation);
        
    }
    
}



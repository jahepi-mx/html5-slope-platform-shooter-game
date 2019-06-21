class Entity {
    
    constructor() {
        this.size = new Vector(0, 0);
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.friction = new Vector(0, 0);
    }
    
    update(dt) {
        
    }
    
    render(context) {
        
    }
    
    collide(entity) {
        var width = this.size.x * 0.5;
        var height = this.size.y * 0.5;
        var otherWidth = entity.size.x * 0.5;
        var otherHeight = entity.size.y * 0.5;
        var xDistant = Math.abs(this.position.x - entity.position.x);
        var yDistant = Math.abs(this.position.y - entity.position.y);
        return xDistant <= width + otherWidth && yDistant <= height + otherHeight;
    }
}



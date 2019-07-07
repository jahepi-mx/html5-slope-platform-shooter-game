class Particle extends Entity {
    constructor(x, y, map, cos, sin) {
        super();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        var size = Math.random() * 10 + 5;
        this.size.x = size;
        this.size.y = size; 
        this.map = map;
        this.position.x = x;
        this.position.y = y;
        this.camera = map.camera;
        var velocity = Math.random() * 500 + 100;
        this.velocity.x = velocity * (Math.random() < 0.5 ? 1 : -1);
        this.velocity.y = velocity * (Math.random() < 0.5 ? 1 : -1);
        this.acceleration.y = -(Math.random() * 100 + 400);
        var friction = 0.9 + Math.random() * 0.1;
        this.friction.y = friction;
        this.friction.x = friction;
        this.dispose = false;
        this.time = 0;
    }
    
    update(dt) {
        this.time += dt;
        if (this.time > 1) {
            this.dispose = true;
        }
        
        this.position.addThis(this.velocity.mulByScalar(dt));
        this.velocity.addThis(this.acceleration.mulByScalar(dt));
        this.velocity.mulThis(this.friction);
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        context.fillStyle = "#ff0000";
        context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
    }
}



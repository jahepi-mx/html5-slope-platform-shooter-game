class Bullet extends Entity {
    
    constructor(x, y, map, radians) {
        super();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.size.x = 20;
        this.size.y = 20; 
        this.map = map;
        this.position.x = x;
        this.position.y = y;
        this.camera = map.camera;
        this.cursor = Cursor.getInstance();
        this.velocity.x = 600;
        this.velocity.y = 0;
        this.xDisplacement = Math.cos(radians); 
        this.yDisplacement = Math.sin(radians);
        this.position.x += this.velocity.x * 0.12 * this.xDisplacement;
        this.position.y += this.velocity.x * 0.12 * this.yDisplacement;
        this.dispose = false;
        this.time = 0;
    }
    
    update(dt) {
        this.time += dt;
        this.position.x += this.velocity.x * this.xDisplacement * dt;
        this.position.y += this.velocity.x * this.yDisplacement * dt;
        if (this.time > 3) {
            this.dispose = true;
        }
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



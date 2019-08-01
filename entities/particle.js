class Particle extends Entity {
    constructor(x, y, level) {
        super();
        this.map = level.map;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.camera = this.map.camera;
        this.resetState(x, y);
        
    }
    
    update(dt) {
        this.time += dt;
        if (this.time > this.timeLimit) {
            this.dispose = true;
        }
        this.alpha -= dt * this.alphaSpeed;
        if (this.alpha < 0) {
            this.alpha = 0;
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
        context.fillStyle = 'rgb(' + this.r + ', ' + this.g + ',' + this.b + ',' + this.alpha + ')';
        context.fillRect(newX, this.config.offsetY - newY, this.size.x, this.size.y);
    }
    
    resetState(x, y) {
        var minSize = this.map.tileWidth * 0.02;
        var maxSize = this.map.tileWidth * 0.06;
        var size = Math.random() * (maxSize - minSize) + minSize;
        this.size.x = size;
        this.size.y = size; 
        this.position.x = x;
        this.position.y = y;
        var maxVelocity = this.map.tileWidth * 4;
        var minVelocity = this.map.tileHeight * 2;
        var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        this.velocity.x = velocity * (Math.random() < 0.5 ? 1 : -1);
        this.velocity.y = velocity * (Math.random() < 0.5 ? 1 : -1);
        var maxAcceleration = this.map.tileHeight * 10;
        var minAcceleration = this.map.tileHeight * 7;
        this.acceleration.y = -(Math.random() * (maxAcceleration - minAcceleration) + minAcceleration);
        var friction = 0.9 + Math.random() * 0.1;
        this.friction.y = friction;
        this.friction.x = friction;
        this.dispose = false;
        this.time = 0;
        this.r = 255;
        this.g = parseInt(Math.random() * 255);
        this.b = 0;
        this.alpha = 1;
        this.alphaSpeed = Math.random() * 3 + 1;
        this.timeLimit = 1;
    }
}



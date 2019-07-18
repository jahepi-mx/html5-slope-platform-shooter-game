class InteractiveParticle extends Particle {
    
    constructor(x, y, level) {
        super(x, y, level);
        this.moves = [[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
        this.timeLimit = 5;
    }
    
    update(dt) {
        
        this.time += dt;
        if (this.time > this.timeLimit) {
            this.dispose = true;
        }
        
        var tmpVelocity = this.velocity.mulByScalar(dt);
        
        var tmpX = this.position.x;
        this.position.x += tmpVelocity.x;
        
        var currentX = parseInt(this.position.x / this.map.tileWidth);
        var currentY = parseInt(this.position.y / this.map.tileHeight);
        var collided = false;
        for (let move of this.moves) {
            var newX = currentX + move[0];
            var newY = currentY + move[1];
            if (newX >= 0 && newX < this.map.mapWidth && newY >= 0 && newY < this.map.mapHeight) {
                var tile = this.map.tiles[newY * this.map.mapWidth + newX];
                if (!tile.walkable && this.collide(tile)) {   
                    collided = true;
                }
            }
        }
        
        if (collided) {
            this.position.x = tmpX;
            this.velocity.x *= -1;
        }

        var tmpY = this.position.y;
        
        currentX = parseInt(this.position.x / this.map.tileWidth);
        currentY = parseInt(this.position.y / this.map.tileHeight);
        collided = false;
        
        var slopeTile = null;
        
        this.position.y += tmpVelocity.y;

        for (let move of this.moves) {
            var newX = currentX + move[0];
            var newY = currentY + move[1];
            if (newX >= 0 && newX < this.map.mapWidth && newY >= 0 && newY < this.map.mapHeight) {
                var tile = this.map.tiles[newY * this.map.mapWidth + newX];
                if (!tile.walkable && this.collide(tile)) {
                    collided = true;
                }

                if (tile.type === SLOPE_TILE && tile.collide(this)) {
                    var thisBottom = this.position.y;
                    var correctBottom = tile.getNewY(this);
                    if (thisBottom < correctBottom) {
                        slopeTile = tile;
                    }
                }

            }
        }
        
        if (collided && slopeTile === null) {
            this.position.y = tmpY;
            this.velocity.y *= -1;
        }
        
        if (slopeTile !== null) {
            this.position.y = slopeTile.getNewY(this);
            this.velocity.y *= -1;
        }
        
        this.velocity.addThis(this.acceleration.mulByScalar(dt));
        this.velocity.mulThis(this.friction);
    }
    
}



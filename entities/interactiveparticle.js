class InteractiveParticle extends Entity {
    
    constructor(x, y, level, image) {
        super();
        this.map = level.map;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.camera = this.map.camera;
        this.moves = [[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
        this.resetState(x, y, image);
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
                if (tile === null) {
                    continue;
                }
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
                if (tile === null) {
                    continue;
                }
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
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        if (this.image !== "") {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, newX, this.config.offsetY - newY, this.size.x, this.size.y);
        } else {
            context.fillStyle = 'rgb(' + this.r + ', ' + this.g + ',' + this.b + ',' + this.alpha + ')';
            context.fillRect(newX, this.config.offsetY - newY, this.size.x, this.size.y);
        }
    }
    
    resetState(x, y, image) {
        this.image = image;  
        if (this.image !== "") {
            var ratio = this.atlas.sprites[this.image].width / this.atlas.sprites[this.image].height;
            this.size.x = this.map.tileWidth * 0.25;
            this.size.y = this.size.x / ratio;
        } else {
            var minSize = this.map.tileWidth * 0.03;
            var maxSize = this.map.tileWidth * 0.10;
            var size = Math.random() * (maxSize - minSize) + minSize;
            this.size.x = size;
            this.size.y = size; 
        }
        this.position.x = x;
        this.position.y = y;
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.friction.x = 0.95;
        this.friction.y = 0.95;
        var maxVelocity = this.map.tileWidth * 2;
        var minVelocity = this.map.tileHeight * 1;
        var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        this.velocity.x = velocity * (Math.random() < 0.5 ? 1 : -1);
        this.velocity.y = velocity * (Math.random() < 0.5 ? 1 : -1);
        var maxAcceleration = this.map.tileHeight * 4;
        var minAcceleration = this.map.tileHeight * 2;
        this.acceleration.y = -(Math.random() * (maxAcceleration - minAcceleration) + minAcceleration);
        this.dispose = false;
        this.time = 0;
        this.alpha = 1;
        this.alphaSpeed = Math.random() * 3 + 1;
        this.timeLimit = 5;
    }
    
}



class Player extends Entity {
    
    constructor(width, height, x, y, map) {
        super();
        this.size.x = width;
        this.size.y = height; 
        this.map = map;
        this.position.x = x * map.tileWidth + map.tileWidth * 0.5;
        this.position.y = y * map.tileHeight + map.tileHeight * 0.5;
        this.friction.x = 0.9;
        this.friction.y = 1;
        this.camera = map.camera;
        this.scalarVelocity = 50;
        this.moves = [[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
        this.acceleration.y = -300;
        this.isJumping = false;
        this.left = this.right = this.up = false, this.down = false, this.jump = false;
        this.inOnMovingTile = false;
        this.movingTile = null;
        this.movingTiles = [];
        this.isOnLadder = false;
        this.targetFriction = new Vector(Math.pow(this.friction.x, 60), Math.pow(this.friction.y, 60));
    }
    
    update(dt) {
        
        if (this.isOnLadder) {
            this.velocity.y = 0;
        }
        
        if (!this.inOnMovingTile) {
            for (let movingTile of this.movingTiles) {
                if (movingTile.collideFromFalling(this)) {
                    this.inOnMovingTile = true;
                    this.movingTile = movingTile;
                    this.isJumping = false;
                }
            }
        }
        if (this.inOnMovingTile) {
            if (this.movingTile.collide(this) && !this.isJumping) {
                this.velocity.x = this.movingTile.translation.x;
                this.velocity.y = this.movingTile.translation.y;
            } else {
                this.inOnMovingTile = false;
                if (!this.isJumping) {
                    this.velocity.y = 0;
                }
            }
        }
        
        
        if (this.left) {
            if (this.inOnMovingTile) {
                this.velocity.x += -this.scalarVelocity;
            } else {
                this.velocity.x = -this.scalarVelocity;
            }
        }
        
        if (this.right) {
            if (this.inOnMovingTile) {
                this.velocity.x += this.scalarVelocity;
            } else {
                this.velocity.x = this.scalarVelocity;
            }
        }
        
        if (this.jump && !this.isOnLadder) {
            if (!this.isJumping) {
                this.velocity.y += this.scalarVelocity * 4;
                this.isJumping = true;
            }
        }
        
        if (this.up && this.isOnLadder) {
            this.velocity.y = this.scalarVelocity;
        }
        
        if (this.down && this.isOnLadder) {
            this.velocity.y = -this.scalarVelocity;
        }
        
        this.isOnLadder = false;

        var tmpVelocity = this.velocity.mulByScalar(dt);
        
        var tmpX = this.position.x;
        this.position.x += tmpVelocity.x;
        
        var currentX = parseInt(this.position.x / this.map.tileWidth);
        var currentY = parseInt(this.position.y / this.map.tileHeight);
        var collided = false;
        var collidedWall = false;
        var collidedTopLadder = false;
        for (let move of this.moves) {
            var newX = currentX + move[0];
            var newY = currentY + move[1];
            if (newX >= 0 && newX < this.map.mapWidth && newY >= 0 && newY < this.map.mapHeight) {
                var tile = this.map.tiles[newY * this.map.mapWidth + newX];
                if (!tile.walkable && this.collide(tile)) {
                    collided = true;
                    if (tile.type === 1) {
                        collidedWall = true;
                    }
                    if (tile.type === 3) {
                        collidedTopLadder = true;
                    }
                }
                
                if (tile instanceof Ladder && this.collide(tile) && !this.isJumping) {
                    this.isOnLadder = true;
                }
            }
        }
        if (!collidedWall && collidedTopLadder && (this.left || this.right)) {
            collided = false;
            this.isOnLadder = true;
        }
        
        if (collided) {
            this.position.x = tmpX;
        }

        var tmpY = this.position.y;
        this.position.y += tmpVelocity.y;
        
        currentX = parseInt(this.position.x / this.map.tileWidth);
        currentY = parseInt(this.position.y / this.map.tileHeight);
        collided = false;
        collidedWall = false;
        collidedTopLadder = false;
        for (let move of this.moves) {
            var newX = currentX + move[0];
            var newY = currentY + move[1];
            if (newX >= 0 && newX < this.map.mapWidth && newY >= 0 && newY < this.map.mapHeight) {
                var tile = this.map.tiles[newY * this.map.mapWidth + newX];
                if (!tile.walkable && this.collide(tile)) {
                    collided = true;
                    this.velocity.y = 0;
                    // If the player hits the floor and not the ceiling
                    if (this.position.y - tmpY < 0) {
                        this.isJumping = false;
                    }
                    if (tile.type === 1) {
                        collidedWall = true;
                    }
                    if (tile.type === 3) {
                        collidedTopLadder = true;
                    }
                }
                if (tile instanceof Ladder && this.collide(tile) && !this.isJumping) {
                    this.isOnLadder = true;
                }
            }
        }
        
        if (!collidedWall && collidedTopLadder && (this.up || this.down)) {
            collided = false;
            this.isOnLadder = true;
        }
        
        if (collided) {
            this.position.y = tmpY;
        }
        
        this.velocity.addThis(this.acceleration.mulByScalar(dt));
        var fps = 1 / dt;
        this.friction.x = Math.pow(this.targetFriction.x, 1 / fps);
        this.friction.y = Math.pow(this.targetFriction.y, 1 / fps);
        this.velocity.mulThis(this.friction);
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        context.fillStyle = "#ccc";
        context.fillRect(newX, offsetY - newY, this.size.x, this.size.y);
    }
    
    moveLeft(bool) {
        this.left = bool;
    }
    
    moveRight(bool) {
        this.right = bool;
    }
    
    moveUp(bool) {
        this.up = bool; 
    }
    
    moveDown(bool) {
        this.down = bool; 
    }
    
    makeJump(bool) {
        this.jump = bool;
    }
    
}


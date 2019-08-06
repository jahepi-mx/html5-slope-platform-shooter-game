class Monster extends Entity {
    constructor(width, height, x, y, level, speed, life) {
        super();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.size.x = this.atlas.sprites["stand"].width / this.atlas.sprites["stand"].height * height;
        this.size.y = height; 
        this.map = level.map;
        this.level = level;
        this.position.x = x * this.map.tileWidth + this.map.tileWidth * 0.5;
        this.position.y = y * this.map.tileHeight + this.map.tileHeight * 0.5;
        this.friction.x = 0.8;
        this.friction.y = 1;
        this.camera = this.map.camera;
        this.jumpScalarVelocity = this.map.tileHeight * 0.8;
        this.walkScalarVelocity = speed;
        this.moves = [[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]];
        this.acceleration.y = -this.map.tileHeight * 4;
        this.isJumping = false;
        this.left = this.right = this.up = false, this.down = false, this.jump = false;
        this.isOnMovingTile = false;
        this.movingTile = null;
        this.targetFriction = new Vector(Math.pow(this.friction.x, 60), Math.pow(this.friction.y, 60));
        this.direction = new Vector(1, 0);
        this.runAnimation = new Animation(6, 2);
        this.attackAnimation = new Animation(5, 3);
        this.standingAnimation = new Animation(2, 2);
        this.player = level.player;
        this.isAttacking = false;
        this.attackingTime = 0;
        this.attackingTimeLimit = 0.5;
        this.attackingBloodTime = 0;
        this.attackingBloodTimeLimit = 0.5;
        this.isStanding = false;
        this.dispose = false;
        this.life = life;
        this.bodyParts = ["enemy_head", "enemy_legs", "enemy_torso", "enemy_arm", "enemy_arm"];
        this.walkedDistant = 0;
        this.walkedDistantTime = 0;
        this.walkedDistantTimeLimit = 1;
    }
    
    update(dt) {
        
        this.walkedDistantTime += dt;
        if (this.walkedDistantTime >= this.walkedDistantTimeLimit) {
            if (Math.abs(this.walkedDistant) < this.walkScalarVelocity * 0.7 && !this.isAttacking) {
                this.makeJump(true);
            }
            this.walkedDistantTime = 0;
            this.walkedDistant = 0;
        }
        
        for (let bullet of this.level.bullets) {
            if (this.collide(bullet)) {
                bullet.isReadyToDispose = true;
                this.life--;
                break;
            }
        }
        
        if (this.life <= 0) {
            this.dispose = true;
            for (var a = 0; a < 10; a++) {
                var particle = null;
                if (this.level.interactiveParticlesPooling.hasObjects()) {
                    particle = this.level.interactiveParticlesPooling.get();
                    particle.resetState(this.position.x, this.position.y, "");
                } else {
                    particle = new InteractiveParticle(this.position.x, this.position.y, this.level, "");
                }
                particle.g = 0;
                var minSize = this.size.x * 0.1;
                var maxSize = this.size.x * 0.2;
                var size = Math.random() * (maxSize - minSize) + minSize;
                particle.size.x = size;
                particle.size.y = size;
                particle.friction.x = 0.97;
                particle.friction.y = 0.97;
                this.level.particles.push(particle);
            }
            for (let bodyPart of this.bodyParts) {
                if (this.level.interactiveParticlesPooling.hasObjects()) {
                    particle = this.level.interactiveParticlesPooling.get();
                    particle.resetState(this.position.x, this.position.y, bodyPart);
                } else {
                    particle = new InteractiveParticle(this.position.x, this.position.y, this.level, bodyPart);
                }
                var ratio = this.atlas.sprites[bodyPart].width / this.atlas.sprites[bodyPart].height;
                particle.size.x = this.size.x * 0.5;
                particle.size.y = particle.size.x / ratio;
                this.level.particles.push(particle);
            }
        }
        
        var diffVector = this.position.sub(this.player.position);
        if (Math.abs(diffVector.x) <= this.size.x * 0.5 && !this.collide(this.player)) {
            this.isStanding = true;
        } else {
            this.isStanding = false;
        }
        
        if (Math.abs(diffVector.x) <= this.size.x * 0.5  && this.collide(this.player)) {
            this.isAttacking = true;
            this.attackingTime = 0;
        } else {
            this.attackingTime += dt;
            if (this.attackingTime >= this.attackingTimeLimit) {
                this.isAttacking = false; 
            }
        }
        if (this.isAttacking) {
            this.attackingBloodTime += dt;
            if (this.attackingBloodTime > this.attackingBloodTimeLimit) {
                this.attackingBloodTime = 0;
                this.player.damage(1);
                for (var a = 0; a < 3; a++) {
                    var particle = null;
                    if (this.level.particlesPooling.hasObjects()) {
                        particle = this.level.particlesPooling.get();
                        particle.resetState(this.position.x + (this.direction.x < 0 ? -this.size.x * 0.5 : this.size.x * 0.5), this.position.y + this.size.y * 0.5);
                    } else {
                        particle = new Particle(this.position.x + (this.direction.x < 0 ? -this.size.x * 0.5 : this.size.x * 0.5), this.position.y + this.size.y * 0.5, this.level);
                    }
                    particle.g = 0;
                    var minSize = this.map.tileWidth * 0.07;
                    var maxSize = this.map.tileWidth * 0.1;
                    var size = Math.random() * (maxSize - minSize) + minSize;
                    particle.size.x = size;
                    particle.size.y = size; 
                    this.level.particles.push(particle);
                }
            }
        }
        
        if (!this.isAttacking && !this.isStanding) {
            if (diffVector.x < 0) {
                this.moveLeft(true);
                this.moveRight(false);
            } else {
                this.moveLeft(false);
                this.moveRight(true);
            }
        } else {
            this.moveLeft(false);
            this.moveRight(false);
        }
        
        this.attackAnimation.update(dt);
        this.runAnimation.update(dt);
        this.standingAnimation.update(dt);
        if (this.isOnMovingTile) {
            if (this.movingTile.collide(this) && !this.isJumping) {
                this.velocity.x = this.movingTile.translation.x;
                this.velocity.y = this.movingTile.translation.y;
            } else {
                this.isOnMovingTile = false;
            }
        }  
        
        if (this.left) {
            this.direction.x = -1;
            this.velocity.x = this.isOnMovingTile ? this.velocity.x - this.walkScalarVelocity : -this.walkScalarVelocity;
        }
        
        if (this.right) {
            this.direction.x = 1;
            this.velocity.x = this.isOnMovingTile ? this.velocity.x + this.walkScalarVelocity : this.walkScalarVelocity;
        }
        
        if (this.jump && this.isOnMovingTile) {
            if (!this.isJumping) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
                this.velocity.y += this.jumpScalarVelocity * 4;
                this.isJumping = true;
            }
        }
        
        if (this.jump && !this.isOnMovingTile /*&& this.velocity.y >= 0*/) {
            if (!this.isJumping) {
                this.velocity.y += this.jumpScalarVelocity * 4;
                this.isJumping = true;
            }
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
                if (tile.type === POISON_WATER && tile.collide(this)) {
                    this.life = 0; // Instant kill
                }
                if (!tile.walkable && this.collide(tile)) {   
                    collided = true;
                }
            }
        }
        
        if (collided) {
            this.position.x = tmpX;
        } else {
            this.walkedDistant += tmpVelocity.x;
        }

        var tmpY = this.position.y;
        
        currentX = parseInt(this.position.x / this.map.tileWidth);
        currentY = parseInt(this.position.y / this.map.tileHeight);
        collided = false;
        
        var hitFloor = false;
        var precision = 10;
        var step = tmpVelocity.y / precision; 
        var collidedMovingTile = false;
        var tmpPosY = 0;
        var slopeTile = null;
        // This precision steps are for detecing collision on low framerate instances.
        for (var a = 0; a < precision; a++) {            
            this.position.y += step;
            if (!this.isOnMovingTile) {
                for (let movingTile of this.level.movingTiles) {
                    if (movingTile.collideFromFalling(this)) {
                        if (!collidedMovingTile) {
                            collidedMovingTile = true;
                            tmpPosY = this.position.y;
                            this.movingTile = movingTile;
                        }
                    }
                }
            }
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
                        this.velocity.y = 0;
                        // If the player hits the floor and not the ceiling
                        if (this.position.y - tmpY < 0) {
                            this.isJumping = this.jump = false;
                            hitFloor = true;
                        }
                    }
                    
                    if (tile.type === SLOPE_TILE && tile.collide(this) && !this.isJumping && this.velocity.y >= 0) {
                        slopeTile = tile;
                        this.velocity.y = 0;
                        hitFloor = true;
                    }
                    
                    if (tile.type === SLOPE_TILE && tile.collide(this) && this.velocity.y < 0) {
                        var thisBottom = this.position.y;
                        var correctBottom = tile.getNewY(this);
                        if (thisBottom < correctBottom) {
                            slopeTile = tile;
                            this.velocity.y = 0;
                            this.isJumping = this.jump = false;
                            hitFloor = true;
                        }
                    }
                    if (!this.isOnMovingTile) {
                        if (tile.type === CEILING_TILE && tile.collideFromFalling(this)) {
                            if (!collidedMovingTile) {
                                collidedMovingTile = true;
                                tmpPosY = this.position.y;
                                this.movingTile = tile;
                            }
                        }
                    }
                }
            }
        }
        
        if (!collided && collidedMovingTile) {
            this.isOnMovingTile = true;
            this.isJumping = this.jump = false;
            this.position.y = tmpPosY;
        }
        
        if (collided && slopeTile === null) {
            this.position.y = tmpY;
        }
        
        if (slopeTile !== null) {
            this.position.y = slopeTile.getNewY(this);
        }
        
        if (!hitFloor) {
            this.velocity.addThis(this.acceleration.mulByScalar(dt));
        }
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
        var image = "enemy_" + (this.direction.x > 0 ? "" : "left_") + (this.standingAnimation.getFrame() + 1);
        if (this.isStanding) {
            image = "enemy_" + (this.direction.x > 0 ? "" : "left_") + (this.standingAnimation.getFrame() + 1);
        } else if ((this.left || this.right) && !this.isJumping && !this.isAttacking) {
             image = "monster_run_" + (this.direction.x > 0 ? "" : "left_") + (this.runAnimation.getFrame() + 1);
        } else if (this.isAttacking) {
            image = "enemy_attack_" + (this.direction.x > 0 ? "" : "left_") + (this.attackAnimation.getFrame() + 1);
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, this.config.offsetY - newY, this.size.x, this.size.y);
    }
    
    moveLeft(bool) {
        this.left = bool;
    }
    
    moveRight(bool) {
        this.right = bool;
    }
    
    makeJump(bool) {
        this.jump = bool;
    }
}


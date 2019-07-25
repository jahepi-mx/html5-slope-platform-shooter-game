class Boss extends Entity {
    
    constructor(x, y, level) {
        super();
        var width = 64;
        var height = 123;
        var ratio = height / width;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
        this.level = level;
        this.map = level.map;
        this.player = level.player;
        this.camera = this.level.camera;
        this.size.x = this.map.tileWidth * 1.5;
        this.size.y = this.size.x * ratio;
        var x = this.map.tileWidth * x + this.map.tileWidth;
        this.position.x = x - this.size.x * 0.5;
        var y = this.map.tileHeight * y;
        this.position.y = y + this.size.y * 0.5;
        this.image = "boss_laser_1";
        this.openMouthAnimation = new Animation(3, 2);
        this.openMouthAnimation.stopAtSequenceCallback = this.onOpenMouth.bind(this);
        this.openMouthAnimation.stopAtSequence = 1;
        this.closeMouthAnimation = new Animation(3, 2);
        this.closeMouthAnimation.stopAtSequenceCallback = this.onCloseMouth.bind(this);
        this.closeMouthAnimation.stopAtSequence = 1;
        this.openAnimation = true;
        this.life = 10;
        this.dispose = false;
        this.thowUp = false;
        this.throwUpTime = 0;
        this.throwUpTimeLimit = Math.random() * 3 + 2;
        this.throwUpsLimit = 3;
        this.throwUpsCount = 0;
        this.laserAnimation = new Animation(2, 6);
        this.laserAnimation.stopAtSequenceCallback = this.onLaserAnimation.bind(this);
        this.laserAnimation.stopAtSequence = 6;
        this.laserAnimationOn = false;
        this.laserTime = 0;
        this.laserTimeLimit = Math.random() * 3 + 2;
    }
    
    onOpenMouth() {
        this.openAnimation = false;
        this.closeMouthAnimation.reset();
        var monster = new Monster(this.map.tileWidth * 0.9, this.map.tileHeight * 0.9, 45.5, 1, this.level);
        monster.velocity.y = this.map.tileHeight * 3;
        monster.velocity.x = this.map.tileWidth;
        this.level.monsters.push(monster);
    }
    
    onCloseMouth() {
        this.openAnimation = true;
        this.openMouthAnimation.reset();
        this.throwUpsCount++;
    }
    
    onLaserAnimation() {
        this.throwUpTimeLimit = Math.random() * 3 + 2;
        this.throwUpTime = 0;
        this.laserAnimationOn = false;
        this.laserAnimation.reset();
        var diffVector = this.position.sub(this.player.position);
        var radians = Math.atan2(diffVector.y, diffVector.x);
        var bullet = null;
        if (this.level.bulletsPooling.hasObjects()) {
            bullet = this.level.bulletsPooling.get();
            bullet.resetState(this.position.x, this.position.y, radians);
        } else {
            bullet = new Bullet(this.position.x, this.position.y, this.level, radians);
        }
        bullet.velocity.x = this.map.tileWidth * 2;
        bullet.disposeTime = 1.5;
        bullet.setImage("bullet");
        bullet.size.x = this.map.tileWidth * 0.5;
        bullet.size.y = this.map.tileWidth * 0.5; 
        this.level.enemyBullets.push(bullet);
    }
    
    update(dt) {
        if (this.throwUpsCount === this.throwUpsLimit) {
            this.throwUp = false;
            this.closeMouthAnimation.reset();
            this.openMouthAnimation.reset();
            this.laserAnimationOn = true;
            this.laserTimeLimit = Math.random() * 3 + 2;
            this.laserTime = 0;
            this.throwUpsCount = 0;
        }
        
        if (!this.laserAnimationOn) {
            this.throwUpTime += dt;
            if (this.throwUpTime >= this.throwUpTimeLimit) {
                this.throwUp = true;
            }
            if (this.throwUp) {
                this.openMouthAnimation.update(dt);
                this.closeMouthAnimation.update(dt);
            }
        }
        
        if (this.laserAnimationOn) {
            this.laserTime += dt;
            if (this.laserTime >= this.laserTimeLimit) {
                this.laserAnimation.update(dt);
            }
        }
        
        for (let bullet of this.level.bullets) {
            if (this.collide(bullet)) {
                bullet.isReadyToDispose = true;
                this.acceleration.x += bullet.xDisplacement * this.length;
                this.acceleration.y += bullet.yDisplacement * this.length;
                this.life--;
                break;
            }
        }
        
        if (this.life <= 0) {
            this.dispose = true;
            for (var a = 0; a < 20; a++) {
                var particle = null;
                if (this.level.interactiveParticlesPooling.hasObjects()) {
                    particle = this.level.interactiveParticlesPooling.get();
                    particle.resetState(this.position.x, this.position.y, "boss_texture");
                } else {
                    particle = new InteractiveParticle(this.position.x, this.position.y, this.level, "boss_texture");
                }
                var minSize = this.map.tileWidth * 0.2;
                var maxSize = this.map.tileWidth * 0.4;
                var size = Math.random() * (maxSize - minSize) + minSize;
                particle.size.x = size;
                particle.size.y = size;
                particle.r = 117;
                particle.g = 119;
                particle.b = 122;
                var maxVelocity = this.map.tileWidth * 4;
                var minVelocity = this.map.tileHeight * 2;
                var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
                particle.velocity.x = velocity * (Math.random() < 0.5 ? 1 : -1);
                particle.velocity.y = velocity * (Math.random() < 0.5 ? 1 : -1);
                var maxAcceleration = this.map.tileHeight * 5;
                var minAcceleration = this.map.tileHeight * 3;
                particle.acceleration.y = -(Math.random() * (maxAcceleration - minAcceleration) + minAcceleration);
                this.level.particles.push(particle);
            }
        }
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        if (this.laserAnimationOn) {
            this.image = "boss_laser_" + (this.laserAnimation.getFrame() + 1);
        } else {
            if (this.openAnimation) {
                this.image = "boss_open_" + (this.openMouthAnimation.getFrame() + 1);
            } else {
                this.image = "boss_close_" + (this.closeMouthAnimation.getFrame() + 1);
            } 
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, newX, offsetY - newY, this.size.x, this.size.y);
    }
}

class Boss extends Entity {
    
    constructor(x, y, level, width, life, player, isFinal, enemiesThrowwupNumber) {
        super();
        this.origVector = new Vector(x, y);
        this.image = "boss_laser_1";
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        var ratio = this.atlas.sprites[this.image].height / this.atlas.sprites[this.image].width; 
        this.level = level;
        this.map = level.map;
        this.player = level.player;
        this.camera = this.level.camera;
        this.size.x = width;
        this.size.y = this.size.x * ratio;
        var x = this.map.tileWidth * x + this.map.tileWidth;
        this.position.x = x - this.size.x * 0.5;
        var y = this.map.tileHeight * y;
        this.position.y = y + this.size.y * 0.5;
        this.openMouthAnimation = new Animation(3, 2);
        this.openMouthAnimation.stopAtSequenceCallback = this.onOpenMouth.bind(this);
        this.openMouthAnimation.stopAtSequence = 1;
        this.closeMouthAnimation = new Animation(3, 2);
        this.closeMouthAnimation.stopAtSequenceCallback = this.onCloseMouth.bind(this);
        this.closeMouthAnimation.stopAtSequence = 1;
        this.openAnimation = true;
        this.life = life;
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
        this.player = player;
        this.isGettingHit = false;
        this.isGettingHitTimeLimit = 0.1;
        this.isGettingHitTime = this.isGettingHitTimeLimit;
        this.isFinal = isFinal;
        this.enemiesThorwupNumber = enemiesThrowwupNumber;
    }
    
    onOpenMouth() {
        this.openAnimation = false;
        this.closeMouthAnimation.reset();
        for (var a = 0; a < this.enemiesThorwupNumber; a++) {
            var speedRatio = 0.5 + Math.random();
            var monster = new Monster(this.size.x * 0.4, this.size.x * 0.4, this.origVector.x, this.origVector.y, this.level, this.map.tileWidth * speedRatio, 5);
            monster.velocity.y = this.size.y * 0.5;
            monster.velocity.x = this.size.x;
            this.level.monsters.unshift(monster);
        }
    }
    
    onCloseMouth() {
        this.openAnimation = true;
        this.openMouthAnimation.reset();
        this.throwUpsCount++;
    }
    
    onLaserAnimation() {
        this.assets.playAudio(this.assets.boss_gun, false, 0.1);
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
        bullet.disposeTime = 3;
        bullet.setImage("bullet");
        bullet.size.x = this.size.x * 0.4;
        bullet.size.y = this.size.x * 0.4; 
        this.level.enemyBullets.push(bullet);
    }
    
    update(dt) {
        this.isGettingHitTime += dt;
        if (this.isGettingHitTime >= this.isGettingHitTimeLimit) {
            this.isGettingHit = false;
        }
        
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
                this.isGettingHit = true;
                this.isGettingHitTime = 0;
                break;
            }
        }
        
        if (this.collide(this.player)) {
            this.player.damage(1000);
        }
        
        if (this.life <= 0) {
            this.assets.playAudio(this.assets["monster_die" + parseInt(Math.random() * 4)], false, 0.1);
            this.dispose = true;
            for (var a = 0; a < 20; a++) {
                var particle = null;
                if (this.level.interactiveParticlesPooling.hasObjects()) {
                    particle = this.level.interactiveParticlesPooling.get();
                    particle.resetState(this.position.x, this.position.y, "boss_texture");
                } else {
                    particle = new InteractiveParticle(this.position.x, this.position.y, this.level, "boss_texture");
                }
                var minSize = this.size.x * 0.2;
                var maxSize = this.size.x * 0.4;
                var size = Math.random() * (maxSize - minSize) + minSize;
                particle.size.x = size;
                particle.size.y = size;
                var maxVelocity = this.map.tileWidth * 3;
                var minVelocity = this.map.tileHeight * 1;
                var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
                particle.velocity.x = velocity * (Math.random() < 0.5 ? 1 : -1);
                particle.velocity.y = velocity * (Math.random() < 0.5 ? 1 : -1);
                particle.friction.x = 0.97;
                particle.friction.y = 0.97;
                var maxAcceleration = this.size.x * 4;
                var minAcceleration = this.size.x * 2;
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
            if (this.isGettingHit) {
                this.image = "boss_laser_red_" + (this.laserAnimation.getFrame() + 1);
            } else {
                this.image = "boss_laser_" + (this.laserAnimation.getFrame() + 1);
            }
        } else {
            if (this.openAnimation) {
                 if (this.isGettingHit) {
                    this.image = "boss_open_red_" + (this.openMouthAnimation.getFrame() + 1);
                } else {
                    this.image = "boss_open_" + (this.openMouthAnimation.getFrame() + 1);
                }
            } else {
                if (this.isGettingHit) {
                    this.image = "boss_close_red_" + (this.closeMouthAnimation.getFrame() + 1);
                } else {
                    this.image = "boss_close_" + (this.closeMouthAnimation.getFrame() + 1);
                }
            } 
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, newX, this.config.offsetY - newY, this.size.x, this.size.y);
    }
}

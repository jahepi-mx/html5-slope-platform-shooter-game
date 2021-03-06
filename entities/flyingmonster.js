class FlyingMonster extends Entity {
    
    constructor(x, y, level, width, height, life, speed) {
        super();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.level = level;
        this.map = level.map;
        this.camera = level.camera;
        this.player = level.player;
        this.friction.x = 0.9;
        this.friction.y = 0.9;
        this.changeTimeLimit = 1;
        this.shootTimeLimit = 1;
        this.animation = new Animation(2, 4);
        this.resetState(x, y, width, height, life, speed);
    }
    
    resetState(x, y, width, height, life, speed) {
        this.size.x = width;
        this.size.y = height;
        this.length = speed;
        this.life = life;
        this.dispose = false;
        this.position.x = this.map.tileWidth * x + this.size.x * 0.5;
        this.position.y = this.map.tileHeight * y + this.size.y * 0.5;
        this.changeTime = 0;
        this.shootTime = 0;
    }
    
    update(dt) {
        this.changeTime += dt;
        this.shootTime += dt;
        this.animation.update(dt);
        
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
            this.assets.playAudio(this.assets["robot_die" + parseInt(Math.random() * 2)], false, 0.2);
            this.dispose = true;
            for (var a = 0; a < 5; a++) {
                var particle = null;
                if (this.level.interactiveParticlesPooling.hasObjects()) {
                    particle = this.level.interactiveParticlesPooling.get();
                    particle.resetState(this.position.x, this.position.y, "");
                } else {
                    particle = new InteractiveParticle(this.position.x, this.position.y, this.level, "");
                }
                particle.r = 239;
                particle.g = 239;
                particle.b = 239;
                var minSize = this.size.x * 0.1;
                var maxSize = this.size.x * 0.2;
                var size = Math.random() * (maxSize - minSize) + minSize;
                particle.size.x = size;
                particle.size.y = size;
                particle.friction.x = 0.99;
                particle.friction.y = 0.99;
                this.level.particles.push(particle);
            }
        }
        if (this.shootTime >= this.shootTimeLimit) {
            var diffVector = this.position.sub(this.player.position);
            if (diffVector.lengthWithOutSqrt() <= this.map.tileWidth * this.map.tileWidth) {
                this.assets.playAudio(this.assets.boss_gun, false, 0.1);
                var radians = Math.atan2(diffVector.y, diffVector.x);
                var bullet = null;
                if (this.level.bulletsPooling.hasObjects()) {
                    bullet = this.level.bulletsPooling.get();
                    bullet.resetState(this.position.x, this.position.y, radians);
                } else {
                    bullet = new Bullet(this.position.x, this.position.y, this.level, radians);
                }
                bullet.velocity.x = this.map.tileWidth * 2;
                bullet.disposeTime = 2;
                bullet.setImage("bullet");
                bullet.size.x = this.size.x * 0.35;
                bullet.size.y = this.size.x * 0.35; 
                this.level.enemyBullets.push(bullet);
            }
            this.shootTime = 0;
        }
        if (this.changeTime >= this.changeTimeLimit) {
            var diffVector = this.position.sub(this.player.position).normalize().mulByScalar(this.length);
            this.velocity.x = diffVector.x;
            this.velocity.y = diffVector.y;
            this.changeTime = 0;
        }
        
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        this.acceleration.x *= this.friction.x;
        this.acceleration.y *= this.friction.y;
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        var image = "flyingmonster_" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, this.config.offsetY - newY, this.size.x, this.size.y);
    }
}



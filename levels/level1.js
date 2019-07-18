class Level1 {
    
    constructor(pixelData, tileWidth, tileHeight, canvasWidth, canvasHeight) {
        
        this.camera = new Camera();
        var mapWidth = 42;
        var mapHeight = 10;
        var matrix = [
            2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,0,0,0,0,4,12,4,4,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,0,0,1,1,1,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,20,41,42,21,0,0,0,0,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,20,41,1,1,42,21,0,0,0,0,0,0,0,0,0,0,3,
            2,0,0,0,0,0,0,0,26,28,30,32,14,4,14,39,37,27,0,0,0,0,0,0,20,41,1,1,1,1,42,21,0,0,0,0,0,0,0,0,0,3,
            2,0,0,0,22,24,14,4,5,1,1,1,1,1,1,1,1,6,4,4,4,4,4,4,5,1,1,1,1,1,1,42,21,0,0,22,24,25,23,0,0,3,
            2,0,0,20,41,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,4,4,5,1,1,42,21,0,3,
            1,4,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,4,1];

        this.bullets = [];
        this.particles = [];
        this.parallaxBgs = [];
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background3", 1, -canvasHeight * 1.1, true));
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background2", 1.0, -canvasHeight * 0.7, false));
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background", 1.2, -canvasHeight * 0.05, false));
        
        this.map = new Map(matrix, mapWidth, mapHeight, tileWidth, tileHeight, canvasWidth, canvasHeight, this.camera, pixelData);
        this.camera.setup(this.map);
        
        this.player = new Player(tileWidth * 0.9, tileHeight * 0.9, 1, 1, this);
        
        this.monsters = [];
        this.monsters.push(new Monster(tileWidth * 0.9, tileHeight * 0.9, 34, 2, this));
        
        this.movingTiles = [];
        this.movingTiles.push(new RotatingTile(this.camera, this, 2, 2));
        this.movingTiles.push(new MovingTile(this.camera, this));
        
        for (let movingTile of this.movingTiles) {
            this.player.movingTiles.push(movingTile);
        }
        
        this.bulletsPooling = new ObjectPooling(30);
        this.particlesPooling = new ObjectPooling(100);
    }
    
    update(dt) {
        // Example for offsetting the camera on the X axis. 
        /*
        var tile = this.map.tiles[4 * this.map.mapWidth + 13];
        if (this.player.collide(tile)) {
            this.camera.xOffset = this.map.tileWidth * 13;
            this.camera.minX = this.camera.xOffset + this.map.canvasWidth * 0.5;
        }
        */
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(dt);
            if (this.bullets[a].dispose) {
                this.bulletsPooling.add(this.bullets[a]);
                this.bullets.splice(a--, 1);
            }
        }
        for (var a = 0; a < this.particles.length; a++) {
            this.particles[a].update(dt);
            if (this.particles[a].dispose) {
                this.particlesPooling.add(this.particles[a]);
                this.particles.splice(a--, 1);
            }
        }
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.update(dt);
        }       
        this.map.update(dt);
        this.camera.update(this.player);
        for (let movingTile of this.movingTiles) {
            movingTile.update(dt);
        }
        for (var a = 0; a < this.monsters.length; a++) {
            this.monsters[a].update(dt);
            if (this.monsters[a].dispose) {
                this.monsters.splice(a--, 1);
            }
        }
        this.player.update(dt);
    }
    
    render(context) {
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.render(context);
        } 
        this.map.render(context, this.player);
        for (let movingTile of this.movingTiles) {
            movingTile.render(context);
        }
        this.player.render(context);
        for (let monster of this.monsters) {
            monster.render(context);
        }
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
        for (let particle of this.particles) {
            particle.render(context);
        }
    }
}


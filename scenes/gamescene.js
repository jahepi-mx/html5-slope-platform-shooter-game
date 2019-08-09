class GameScene extends Scene {
    
    constructor(canvas) {
        super(canvas);
        var canvasWidth = window.screen.availHeight * this.config.screenRatio;
        var canvasHeight = window.screen.availHeight;
        var tileWidth = canvasWidth / 5;
        var tileHeight = canvasHeight / 4;
        this.config.offsetY = canvasHeight;
        var assets = Assets.getInstance();
        canvas.width = assets.spritesAtlas.width;
        canvas.height = assets.spritesAtlas.height;
        this.context.drawImage(assets.spritesAtlas, 0, 0);
        var pixelData = this.context.getImageData(0, 0, assets.spritesAtlas.width, assets.spritesAtlas.height).data;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        this.currentLevel = new Level1(pixelData, tileWidth, tileHeight, canvasWidth, canvasHeight);
        this.fps = 0;
        this.dispose = false;
        this.time = 0;
        this.timeLimit = 2;
        this.sceneManager = SceneManager.getInstance();
        this.map = this.currentLevel.map;
    }
    
    update(dt) {
        this.fps = 1 / dt;
        this.currentLevel.update(dt);  
        if (this.currentLevel.dispose) {
            this.time += dt;
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
                
        this.currentLevel.render(this.context);
        
        this.context.fillStyle = "#00ff00";
        this.context.font = parseInt(this.currentLevel.map.tileHeight * 0.15) + "px Arial";
        this.context.fillText(parseInt(this.fps) + "  " + this.currentLevel.monsters.length + " " + this.currentLevel.interactiveParticlesPooling.size(), this.map.tileWidth * 0.15, this.map.tileHeight * 0.15);
        if (this.time >= this.timeLimit && !this.dispose) {
            this.dispose = true;
            var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var scene = this.sceneManager.setScene("end");
            scene.setImageData(imageData);
        }
        
        // Player Life
        this.context.fillStyle = "#fff";
        this.context.fillText("Life", this.map.tileWidth * 0.15, this.map.tileHeight * 0.4);
        this.context.fillStyle = "#ff0000";
        var lifeWidth = this.map.canvasWidth * 0.15;
        var lifeHeight = this.map.canvasHeight * 0.02;
        this.context.fillRect(this.map.tileWidth * 0.15, this.map.tileHeight * 0.45, lifeWidth * this.currentLevel.player.life / this.currentLevel.player.maxLife, lifeHeight);
    }
    
    input(key, pressed) {
        if (key === 87) {
            this.currentLevel.player.moveUp(pressed);
        }
        if (key === 65) {
            this.currentLevel.player.moveLeft(pressed);
        }
        if (key === 68) {
            this.currentLevel.player.moveRight(pressed);
        }
        if (key === 83) {
            this.currentLevel.player.moveDown(pressed);
        }
        if (key === 32) {
            this.currentLevel.player.makeJump(pressed);
        }
    }
}
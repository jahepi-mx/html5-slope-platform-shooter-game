class GameScene extends Scene {
    
    constructor(canvas) {
        super(canvas);
        var canvasWidth = window.innerWidth;
        var canvasHeight = window.innerHeight;
        var tileWidth = canvasWidth / 5;
        var tileHeight = canvasHeight / 4;
        offsetY = canvasHeight; 
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
    }
    
    update(dt) {
        this.time += dt;
        this.fps = 1 / dt;
        this.currentLevel.update(dt);  
    }
    
    render() {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
                
        this.currentLevel.render(this.context);
        
        this.context.fillStyle = "#00ff00";
        this.context.font = parseInt(this.currentLevel.map.tileHeight * 0.15) + "px Arial";
        this.context.fillText(parseInt(this.fps) + "  " + this.currentLevel.monsters.length, this.currentLevel.map.tileWidth * 0.15, this.currentLevel.map.tileHeight * 0.15);
        if (this.time >= this.timeLimit && !this.dispose) {
            this.dispose = true;
            var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var scene = this.sceneManager.setScene("end");
            scene.setImageData(imageData);
        } 
    }
    
    left(bool) {
        this.currentLevel.player.moveLeft(bool);
    }
    
    right(bool) {
        this.currentLevel.player.moveRight(bool);
    }
    
    up(bool) {
        this.currentLevel.player.moveUp(bool);
    }
    
    down(bool) {
        this.currentLevel.player.moveDown(bool);
    }
    
    jump(bool) {
        this.currentLevel.player.makeJump(bool);
    }
}
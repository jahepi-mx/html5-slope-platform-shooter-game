class ParallaxBg {
    constructor(camera, mapWidth, mapHeight, image, factor) {
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.img = new Image();
        this.img.src = "assets/" + image;
        this.leftImg = new Image();
        this.leftImg.src = "assets/" + image;
        this.yOffset = -50;
        this.factor = factor;
    }
    
    render(context) {
        var xOffset = this.camera.position.x * this.factor;
        xOffset %= this.mapWidth;
        
        var x = 0;
        var y = this.yOffset + this.camera.position.y;
        context.drawImage(this.img, x - xOffset, y, this.mapWidth, this.mapHeight);
        context.drawImage(this.leftImg, x - xOffset + this.mapWidth, y, this.mapWidth, this.mapHeight);
    }
}


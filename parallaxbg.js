class ParallaxBg {
    constructor(camera, mapWidth, mapHeight) {
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.img = new Image();
        this.img.src = "assets/background.jpg";
    }
    
    render(context) {
        var factor = 2;
        var xOffset = this.camera.position.x * factor;
        xOffset %= this.mapWidth;
        
        var x = 0;
        var y = 0;
        context.drawImage(this.img, x - xOffset, y);
    }
}


class ParallaxBg {
    constructor(camera, mapWidth, mapHeight, image, factor) {
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.image = image;
        this.yOffset = -mapHeight * 0.3;
        this.factor = factor;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    render(context) {
        var xOffset = this.camera.position.x * this.factor;
        xOffset %= this.mapWidth;
        
        var x = 0;
        var y = this.yOffset + this.camera.position.y;

        context.drawImage(
            this.assets.spritesAtlas, 
            this.atlas.sprites[this.image].x,
            this.atlas.sprites[this.image].y,
            this.atlas.sprites[this.image].width,
            this.atlas.sprites[this.image].height,
            x - xOffset,
            y,
            this.mapWidth,
            this.mapHeight);
            
        context.drawImage(
            this.assets.spritesAtlas, 
            this.atlas.sprites[this.image].x,
            this.atlas.sprites[this.image].y,
            this.atlas.sprites[this.image].width,
            this.atlas.sprites[this.image].height,
            x - xOffset + this.mapWidth,
            y,
            this.mapWidth,
            this.mapHeight);
    }
}


class ParallaxBg {
    constructor(camera, mapWidth, mapHeight, image, factor, yOffset, keepScrolling) {
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.image = image;
        this.yOffset = yOffset;
        this.xOffset = 0;
        this.factor = factor;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.keepScrolling = keepScrolling;
        this.position = new Vector(0, 0);
        this.scalarVelocity = mapWidth * 0.03;
    }
    
    update(dt) {
        if (this.keepScrolling) {
            this.position.x += this.scalarVelocity * dt;
        }
        this.xOffset = (this.camera.position.x + this.position.x) * this.factor;
        this.xOffset %= this.mapWidth;
    }
    
    render(context) { 
        var y = this.yOffset + this.camera.position.y;
        context.drawImage(
            this.assets.spritesAtlas, 
            this.atlas.sprites[this.image].x,
            this.atlas.sprites[this.image].y,
            this.atlas.sprites[this.image].width,
            this.atlas.sprites[this.image].height,
            -this.xOffset,
            y,
            this.mapWidth + 1,
            this.mapHeight + 1);
            
        context.drawImage(
            this.assets.spritesAtlas, 
            this.atlas.sprites[this.image].x,
            this.atlas.sprites[this.image].y,
            this.atlas.sprites[this.image].width,
            this.atlas.sprites[this.image].height,
            -this.xOffset + this.mapWidth,
            y,
            this.mapWidth + 1,
            this.mapHeight + 1);
    }
}


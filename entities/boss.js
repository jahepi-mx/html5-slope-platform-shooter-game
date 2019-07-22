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
        this.camera = this.level.camera;
        this.size.x = this.map.tileWidth * 1.5;
        this.size.y = this.size.x * ratio;
        var x = this.map.tileWidth * x + this.map.tileWidth;
        this.position.x = x - this.size.x * 0.5;
        var y = this.map.tileHeight * y;
        this.position.y = y + this.size.y * 0.5;
        this.image = "boss_laser_1";
        this.openMouthAnimation = new Animation(3, 1);
        this.openMouthAnimation.stopAtSequenceCallback = this.onOpenMouth.bind(this);
        this.openMouthAnimation.stopAtSequence = 1;
        this.closeMouthAnimation = new Animation(3, 1);
        this.closeMouthAnimation.stopAtSequenceCallback = this.onCloseMouth.bind(this);
        this.closeMouthAnimation.stopAtSequence = 1;
        this.openAnimation = true;
    }
    
    onOpenMouth() {
        this.openAnimation = false;
        this.closeMouthAnimation.reset();
    }
    
    onCloseMouth() {
        this.openAnimation = true;
        this.openMouthAnimation.reset();
    }
    
    update(dt) {
        this.openMouthAnimation.update(dt);
        this.closeMouthAnimation.update(dt);
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        
        if (this.openAnimation) {
            this.image = "boss_open_" + (this.openMouthAnimation.getFrame() + 1);
        } else {
            this.image = "boss_close_" + (this.closeMouthAnimation.getFrame() + 1);
        }  
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, newX, offsetY - newY, this.size.x, this.size.y);
    }
}

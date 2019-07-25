class PosionWater extends Tile {
    
    constructor(width, height, x, y, camera, type) {
        super(width, height, x, y, camera, type);
        this.walkable = true;
        this.type = POISON_WATER;
        this.animation = new Animation(4, 0.5);
    }
    
    update(dt) {
        if (this.tmpType === POISON_WATER) {
            this.animation.update(dt);
        }
    }
    
    render(context) {
        var newX = this.position.x - this.camera.position.x;
        var newY = this.position.y - this.camera.position.y;
        newX -= this.size.x * 0.5;
        newY += this.size.y * 0.5;
        var image = null;
        if (this.tmpType === POISON_WATER_BOTTOM) {
            image = "radioactive_water";
        } else {
            image = "radioactive_water_" + (this.animation.getFrame() + 1);
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, newX, offsetY - newY, this.size.x + 1, this.size.y + 1);
    }
    
    collide(entity) {
        var width = this.size.x * 0.5;
        var height = this.size.y * 0.5;
        var otherWidth = entity.size.x * 0.5;
        var otherHeight = entity.size.y * 0.5;
        var xDistant = Math.abs(this.position.x - entity.position.x);
        var yDistant = Math.abs(this.position.y - entity.position.y);
        return xDistant <= (width + otherWidth) * 0.5 && yDistant <= (height + otherHeight) * 0.5;
    }
}
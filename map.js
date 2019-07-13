let WALL_TILE = 1;
let LADDER_TILE = 11;
let TOP_LADDER_TILE = 12;
let CEILING_TILE = 10;
let SLOPE_TILE = 5;

class Map {
    
    constructor(matrix, mapWidth, mapHeight, tileWidth, tileHeight, canvasWidth, canvasHeight, camera, pixelData) {
        
        this.tiles = [];
        this.bullets = [];
        this.particles = [];
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.pixelData = pixelData;

        var atlas = Atlas.getInstance();
        for (var a = 0; a < mapWidth * mapHeight; a++) {
            var x = a % mapWidth;
            var y = (mapHeight - 1) - parseInt(a / mapWidth);
            var value = matrix[a];
            var tile = new Tile(tileWidth, tileHeight, x, y, camera, value);
            
            if (atlas.sprites["walkable" + value] !== undefined) {
                tile.walkable = true;
                tile.tmpType = value;
            }
            
            if (value === LADDER_TILE) {
                tile = new Ladder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === TOP_LADDER_TILE) {
                tile = new TopLadder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === CEILING_TILE) {
                tile = new CeilingTile(tileWidth, tileHeight, x, y, camera, value);
            }
            if (atlas.sprites["slope" + value] !== undefined) {
                var ratios = this.getSlopeRatio("slope" + value);
                tile = new SlopeTile(tileWidth, tileHeight, x, y, camera, value, tileHeight * ratios.left, tileHeight * ratios.right);
            }
            this.tiles[y * mapWidth + x] = tile;
        }
    }
    
    getSlopeRatio(imgName) {
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        var imgX = parseInt(atlas.sprites[imgName].x);
        var imgY = parseInt(atlas.sprites[imgName].y);
        var imgW = parseInt(atlas.sprites[imgName].width);
        var imgH = parseInt(atlas.sprites[imgName].height);
        var imgXTo = parseInt(atlas.sprites[imgName].x) + parseInt(imgW);
        var imgYTo = parseInt(atlas.sprites[imgName].y) + parseInt(imgH);
        var left = -1, right = -1;
        for (var x = imgX; x < imgXTo; x++) {
            for (var y = imgYTo - 1, yTmp = 0; y >= imgY; y--, yTmp++) {
                if (x === imgX || x === imgXTo - 1) {
                    var index = (y * assets.spritesAtlas.width + x) * 4;
                    var r = this.pixelData[index];
                    var g = this.pixelData[index + 1];
                    var b = this.pixelData[index + 2];
                    var a = this.pixelData[index + 3];
                    if (x === imgX && r === 0 && g === 0 && b === 0 && left < 0) {
                        left = yTmp;
                    }
                    if (x === imgXTo - 1 && r === 0 && g === 0 && b === 0 && right < 0) {
                        right = yTmp;
                    }
                }
            }
        }
        if (left < 0) {
            left = imgH;
        }
        if (right < 0) {
            right = imgH;
        }
        return {"left": left / imgH, "right": right / imgH};
    }
    
    update(dt) {
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(dt);
            if (this.bullets[a].dispose) {
                this.bullets.splice(a--, 1);
            }
        }
        for (var a = 0; a < this.particles.length; a++) {
            this.particles[a].update(dt);
            if (this.particles[a].dispose) {
                this.particles.splice(a--, 1);
            }
        }
    }
    
    render(context, player) {
        var marginOfError = 2;
        var offsetX = parseInt(this.canvasWidth / this.tileWidth * 0.5) + marginOfError;
        var offsetY = parseInt(this.canvasHeight / this.tileHeight * 0.5) + marginOfError;
        var playerX = parseInt(player.position.x / this.tileWidth);
        var playerY = parseInt(player.position.y / this.tileHeight);
        
        for (var y = playerY - offsetY; y < playerY + offsetY; y++) {
            for (var x = playerX - offsetX; x < playerX + offsetX; x++) {
                if (x >= 0 && y >= 0 && x < this.mapWidth && y < this.mapHeight) {
                    this.tiles[y * this.mapWidth + x].render(context);
                }
            }
        }
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
        for (let particle of this.particles) {
            particle.render(context);
        }
    }
    
    getWidth() {
        return this.mapWidth * this.tileWidth;
    }
    
    getHeight() {
        return this.mapHeight * this.tileHeight;
    }
}


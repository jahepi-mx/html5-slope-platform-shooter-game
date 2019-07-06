let WALL_TILE = 1;
let LADDER_TILE = 2;
let TOP_LADDER_TILE = 3;
let CEILING_TILE = 4;
let SLOPE_TILE = 5;

class Map {
    
    constructor(matrix, mapWidth, mapHeight, tileWidth, tileHeight, canvasWidth, canvasHeight, camera) {
        this.tiles = [];
        this.bullets = [];
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        for (var a = 0; a < mapWidth * mapHeight; a++) {
            var x = a % mapWidth;
            var y = (mapHeight - 1) - parseInt(a / mapWidth);
            var value = matrix[a];
            var tile = new Tile(tileWidth, tileHeight, x, y, camera, value);
            if (value === LADDER_TILE) {
                tile = new Ladder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === TOP_LADDER_TILE) {
                tile = new TopLadder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === CEILING_TILE) {
                tile = new CeilingTile(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === SLOPE_TILE) {
                tile = new SlopeTile(tileWidth, tileHeight, x, y, camera, value);
            }
            this.tiles[y * mapWidth + x] = tile;
        }
        
        this.tiles[1 * mapWidth + 3].low = 0;
        this.tiles[1 * mapWidth + 3].high = tileHeight * 0.3;
        this.tiles[1 * mapWidth + 4].low = tileHeight * 0.3;
        this.tiles[1 * mapWidth + 4].high = tileHeight;
        this.tiles[2 * mapWidth + 5].low = 0;
        this.tiles[2 * mapWidth + 5].high = tileHeight * 0.5;
        this.tiles[2 * mapWidth + 6].low = tileHeight * 0.5;
        this.tiles[2 * mapWidth + 6].high = tileHeight;
        this.tiles[0 * mapWidth + 2].low = tileHeight;
        this.tiles[0 * mapWidth + 2].high = tileHeight;
        this.tiles[2 * mapWidth + 7].low = tileHeight;
        this.tiles[2 * mapWidth + 7].high = tileHeight;
        this.tiles[2 * mapWidth + 17].low = tileHeight;
        this.tiles[2 * mapWidth + 17].high = 0;
        this.tiles[1 * mapWidth + 5].low = tileHeight;
        this.tiles[1 * mapWidth + 5].high = tileHeight;
        this.tiles[0 * mapWidth + 3].low = tileHeight;
        this.tiles[0 * mapWidth + 3].high = tileHeight;
        this.tiles[1 * mapWidth + 10].low = tileHeight;
        this.tiles[1 * mapWidth + 10].high = tileHeight;
        this.tiles[2 * mapWidth + 9].low = tileHeight;
        this.tiles[2 * mapWidth + 9].high = tileHeight;
        this.tiles[2 * mapWidth + 10].low = tileHeight;
        this.tiles[2 * mapWidth + 10].high = 0;
        this.tiles[1 * mapWidth + 11].low = tileHeight;
        this.tiles[1 * mapWidth + 11].high = tileHeight * 0.5;
        this.tiles[1 * mapWidth + 12].low = tileHeight * 0.5;
        this.tiles[1 * mapWidth + 12].high = 0;
    }
    
    update(dt) {
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(dt);
            if (this.bullets[a].dispose) {
                this.bullets.splice(a--, 1);
            }
        }
    }
    
    render(context) {
        for (let tile of this.tiles) {
            tile.render(context);
        }
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }
    
    getWidth() {
        return this.mapWidth * this.tileWidth;
    }
    
    getHeight() {
        return this.mapHeight * this.tileHeight;
    }
}


class Map {
    
    constructor(matrix, mapWidth, mapHeight, tileWidth, tileHeight, canvasWidth, canvasHeight, camera) {
        this.tiles = [];
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
            if (value === 2) {
                tile = new Ladder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === 3) {
                tile = new TopLadder(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === 4) {
                tile = new CeilingTile(tileWidth, tileHeight, x, y, camera, value);
            }
            if (value === 5) {
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
        this.tiles[2 * mapWidth + 11].low = tileHeight;
        this.tiles[2 * mapWidth + 11].high = 0;
        this.tiles[1 * mapWidth + 5].low = tileHeight;
        this.tiles[1 * mapWidth + 5].high = tileHeight;
    }
    
    render(context) {
        for (let tile of this.tiles) {
            tile.render(context);
        }
    }
    
    getWidth() {
        return this.mapWidth * this.tileWidth;
    }
    
    getHeight() {
        return this.mapHeight * this.tileHeight;
    }
}


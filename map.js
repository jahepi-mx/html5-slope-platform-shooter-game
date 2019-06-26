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
                tile = new Ladder(x, y, camera, value, this);
            }
            if (value === 3) {
                tile = new TopLadder(x, y, camera, value, this);
            }
            if (value === 4) {
                tile = new CeilingTile(tileWidth, tileHeight, x, y, camera, value);
            }
            this.tiles[y * mapWidth + x] = tile;
        }    
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


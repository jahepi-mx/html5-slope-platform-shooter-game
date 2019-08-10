class Level1 {
    
    constructor(pixelData, tileWidth, tileHeight, canvasWidth, canvasHeight) {
        
        this.camera = new Camera();
        var mapWidth = 275; //48;
        var mapHeight = 15; //10;
        this.dispose = false;
        var matrix = [
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,12,5,0,0,0,4,4,0,0,0,4,4,14,25,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,42,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,42,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,14,4,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,42,35,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0,9,0,0,0,9,0,0,0,0,0,0,0,10,3,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,39,31,29,27,20,41,2,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,14,33,31,29,27,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,1,1,42,19,25,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,3,2,45,45,45,3,45,45,45,3,45,45,45,4,12,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,22,29,27,26,27,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,12,9,19,33,31,29,27,0,0,0,0,20,21,22,23,20,21,26,34,43,1,1,1,44,41,1,2,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,3,1,1,1,1,1,44,33,31,29,27,0,0,0,0,9,0,0,0,0,0,0,0,0,26,36,38,39,37,27,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,1,1,1,1,1,42,39,37,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,3,2,46,46,46,46,46,46,46,46,46,46,46,3,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,41,1,42,9,9,4,12,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
2,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,3,1,1,1,1,44,19,9,9,14,41,42,41,42,41,42,41,1,1,1,1,1,1,1,1,2,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,10,0,0,0,0,0,0,0,0,0,1,0,3,1,1,1,1,1,1,1,1,1,42,14,4,4,9,9,14,21,0,0,0,20,14,4,41,1,1,1,1,42,14,4,12,4,45,45,45,45,45,45,45,45,45,3,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,42,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,10,3,2,46,46,46,46,46,46,46,46,46,46,46,3,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,41,1,1,1,1,1,2,11,0,0,0,0,0,0,0,3,1,1,1,1,1,1,
2,0,0,0,0,0,0,0,0,0,20,41,42,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,11,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,11,0,0,0,0,26,27,0,0,0,0,0,9,0,26,28,29,27,0,0,0,0,10,10,10,10,10,10,0,0,9,0,0,0,0,0,1,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,21,0,20,41,1,1,1,1,1,1,1,1,1,2,11,3,1,1,1,1,1,1,1,1,1,2,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,10,10,3,1,1,1,1,1,1,1,1,1,1,1,1,1,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,41,1,1,1,1,1,1,2,11,0,0,0,0,0,0,0,3,1,1,1,1,1,1,
2,0,0,26,27,22,23,0,26,34,43,1,1,42,21,0,0,0,20,14,4,0,0,4,0,0,0,0,4,4,9,9,9,4,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,4,4,4,4,4,4,9,9,4,4,4,4,4,4,4,9,9,9,9,4,4,4,4,9,9,9,9,9,9,4,0,1,0,0,0,0,0,1,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,14,41,1,1,1,1,1,1,1,1,1,1,2,11,0,0,0,0,0,0,0,0,0,0,0,11,3,0,0,0,3,2,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,21,0,0,0,0,26,27,0,4,0,0,22,23,0,4,0,4,0,26,28,29,27,0,4,0,22,30,31,23,0,0,0,0,10,10,10,10,10,10,3,1,1,1,1,1,1,1,1,1,1,1,1,1,11,0,0,10,10,0,0,10,0,0,10,0,0,10,10,10,0,0,0,10,10,0,0,0,0,26,34,43,1,1,1,1,1,1,1,2,11,0,0,0,0,0,0,0,3,1,1,1,1,1,1,
1,4,4,41,42,5,42,19,41,1,1,1,1,1,42,4,9,4,41,1,2,45,45,1,45,45,4,45,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,45,1,45,45,45,45,45,1,45,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,11,0,26,27,26,27,26,27,26,27,0,0,11,3,45,45,45,3,2,45,45,45,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,14,4,4,4,4,4,4,9,4,4,4,4,4,9,4,9,4,4,4,4,4,4,9,4,4,4,4,4,4,4,4,4,9,9,9,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,19,41,1,1,1,1,1,1,1,1,1,2,11,0,0,0,0,0,0,0,3,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1
];
        var frontMatrix = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,53,53,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,53,53,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,49,0,0,0,55,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,57,57,57,0,57,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,0,47,47,0,0,54,0,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,0,0,0,0,0,47,0,0,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,48,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,48,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,48,0,51,0,0,0,0,0,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,58,0,0,0,0,0,0,0,58,58,58,58,0,0,0,0,0,0,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,54,53,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,48,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,48,0,48,0,0,0,48,0,0,48,0,48,0,0,0,48,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,56,55,0,0,47,56,0,0,0,0,0,54,50,47,50,51,0,0,0,0,0,0,0,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,53,52,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,52,53,0,0,47,0,47,0,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,47,47,47,47,47,47,0,47,47,47,47,47,47,47,47,0,47,47,47,0,47,47,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,52,52,52,52,52,52,52,52,52,52,52,52,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,57,57,57,57,57,57,57,57,57,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ];
        
        this.bullets = [];
        this.enemyBullets = [];
        this.particles = [];
        this.parallaxBgs = [];
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background3", 1, -canvasHeight * 1.1, true));
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background2", 1, -canvasHeight * 0.7, false));
        this.parallaxBgs.push(new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background", 1.1, -canvasHeight * 0.05, false));
        
        this.frontParallax = new ParallaxBg(this.camera, canvasWidth, canvasHeight, "background4", 1.3, 0, false);
        
        this.map = new LevelMap(matrix, frontMatrix, mapWidth, mapHeight, tileWidth, tileHeight, canvasWidth, canvasHeight, this.camera, pixelData);
        this.camera.setup(this.map);
        
        this.player = new Player(tileWidth * 0.9, tileHeight * 0.9, 1, 2, this);
        
        this.monsters = [];
        
        this.movingTiles = [];
        this.movingTiles.push(new RotatingTile(this.camera, this, 95, 4, Math.min(this.map.tileWidth * 2.5, this.map.tileHeight * 2.5)));
        this.movingTiles.push(new MovingTile(this.camera, this, 147, 7, 147, 10, this.map.tileHeight));
        this.movingTiles.push(new MovingTile(this.camera, this, 152, 7, 152, 10, this.map.tileHeight * 1.2));
        this.movingTiles.push(new MovingTile(this.camera, this, 212, 6, 216, 6, this.map.tileWidth));
        this.movingTiles.push(new MovingTile(this.camera, this, 217, 6, 221, 6, this.map.tileWidth));
        
        this.bulletsPooling = new ObjectPooling(30);
        this.particlesPooling = new ObjectPooling(200);
        this.interactiveParticlesPooling = new ObjectPooling(350);
        this.monstersPooling = new ObjectPooling(50);
        this.flyingMonstersPooling = new ObjectPooling(15);
        
        var tiles1 = [5 * this.map.mapWidth + 41, 6 * this.map.mapWidth + 41, 7 * this.map.mapWidth + 41, 8 * this.map.mapWidth + 41];
        var tiles2 = [1 * this.map.mapWidth + 262, 2 * this.map.mapWidth + 262, 3 * this.map.mapWidth + 262, 4 * this.map.mapWidth + 262];
        
        this.cinematics = [
            new Cinematic(this.player, this.map, this.camera, this.map.tileWidth * 42, this.map.tiles[1 * this.map.mapWidth + 42], tiles1, null),
            new Cinematic(this.player, this.map, this.camera, this.map.tileWidth * 263, this.map.tiles[0 * this.map.mapWidth + 263], tiles2, function() {
                if (!this.isPlayingBossMusic) {
                    this.isPlayingBossMusic = true;
                    this.music.stop();
                    this.music = this.assets.playAudio(this.assets.boss, true, 0.2);
                }
            }.bind(this))
        ];
        
        this.checkpoints = [
            {checked: false, position: new Vector(20 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(23 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(26 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(42 * this.map.tileWidth + this.map.tileWidth * 0.5, 5 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(65 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(72 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(92 * this.map.tileWidth + this.map.tileWidth * 0.5, 4 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(100 * this.map.tileWidth + this.map.tileWidth * 0.5, 7 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(116 * this.map.tileWidth + this.map.tileWidth * 0.5, 5 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(133 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(143 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(174 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(201 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(215 * this.map.tileWidth + this.map.tileWidth * 0.5, 8 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(225 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)},
            {checked: false, position: new Vector(263 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)},
        ];
        
        this.events = [
            
            new EnemyEvent((function() {
                for (var a = 0; a < 3; a++) {
                    var speedRatio = 0.3 + Math.random();
                    var sizeRatio = 0.6 + 0.1 * Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * sizeRatio, tileHeight * sizeRatio, 46, 8, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(42.1 * this.map.tileWidth + this.map.tileWidth * 0.5, 5 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 5; a++) {
                    var speedRatio = 0.5 + Math.random();
                    var sizeRatio = 0.6 + 0.1 * Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * sizeRatio, tileHeight * sizeRatio, 70, 5, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(67 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 6; a++) {
                    var speedRatio = 0.5 + Math.random();
                    var sizeRatio = 0.6 + 0.1 * Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * sizeRatio, tileHeight * sizeRatio, 79, 5, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(76 * this.map.tileWidth + this.map.tileWidth * 0.5, 3 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
               this.monsters.push(this.createFlyingMonsterInstance(98, 8, this, this.map.tileWidth * 0.5, this.map.tileHeight * 0.5, 30, this.map.tileWidth));
            }).bind(this), new Vector(92 * this.map.tileWidth + this.map.tileWidth * 0.5, 4 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 7; a++) {
                    var speedRatio = 0.5 + Math.random();
                    var sizeRatio = 0.6 + 0.1 * Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * sizeRatio, tileHeight * sizeRatio, 109, 8, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(100 * this.map.tileWidth + this.map.tileWidth * 0.5, 7 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
               this.monsters.push(new Boss(114, 5, this, this.map.tileWidth * 0.8, 50, this.player, false, 2));
            }).bind(this), new Vector(111 * this.map.tileWidth + this.map.tileWidth * 0.5, 5 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
               this.monsters.push(this.createFlyingMonsterInstance(127, 7, this, this.map.tileWidth * 0.5, this.map.tileHeight * 0.5, 30, this.map.tileWidth));
               this.monsters.push(this.createFlyingMonsterInstance(127, 7, this, this.map.tileWidth * 0.7, this.map.tileHeight * 0.7, 50, this.map.tileWidth * 1.5));
               this.monsters.push(this.createFlyingMonsterInstance(127, 7, this, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, 40, this.map.tileWidth * 1.2));
            }).bind(this), new Vector(122 * this.map.tileWidth + this.map.tileWidth * 0.5, 5 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 7; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.5, tileHeight * 0.5, 138, 2, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(134 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 7; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.5, tileHeight * 0.5, 140, 2, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(136 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 10; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.5, tileHeight * 0.5, 142, 2, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(138 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 30; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.6, tileHeight * 0.6, 172, 8, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(154 * this.map.tileWidth + this.map.tileWidth * 0.5, 1 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 40; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.7, tileHeight * 0.7, 200, 5, this, this.map.tileWidth * speedRatio, 3));
                }
            }).bind(this), new Vector(174 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 10; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.5, tileHeight * 0.5, 232, 4, this, this.map.tileWidth * speedRatio, 3));
                }
                for (var a = 0; a < 10; a++) {
                    var speedRatio = 1 + Math.random();
                    this.monsters.push(this.createFlyingMonsterInstance(232, 5, this, this.map.tileWidth * 0.3, this.map.tileHeight * 0.3, 4, this.map.tileWidth * speedRatio));
                }
            }).bind(this), new Vector(226 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
                for (var a = 0; a < 10; a++) {
                    var speedRatio = 0.5 + Math.random();
                    this.monsters.push(this.createMonsterInstance(tileWidth * 0.5, tileHeight * 0.5, 248, 4, this, this.map.tileWidth * speedRatio, 3));
                }
                for (var a = 0; a < 10; a++) {
                    var speedRatio = 1 + Math.random();
                    this.monsters.push(this.createFlyingMonsterInstance(248, 5, this, this.map.tileWidth * 0.3, this.map.tileHeight * 0.3, 4, this.map.tileWidth * speedRatio));
                }
            }).bind(this), new Vector(240 * this.map.tileWidth + this.map.tileWidth * 0.5, 2 * this.map.tileHeight + this.map.tileHeight * 0.5)),
            
            new EnemyEvent((function() {
               this.monsters.push(new Boss(267, 1, this, this.map.tileWidth * 1.5, 150, this.player, true, 4));
            }).bind(this), new Vector(263 * this.map.tileWidth + this.map.tileWidth * 0.5, 11 * this.map.tileHeight + this.map.tileHeight * 0.5)),
        ];
        
        this.assets = Assets.getInstance();
        this.music = this.assets.playAudio(this.assets.main, true, 0.2);
        this.isPlayingBossMusic = false;
    }
    
    createMonsterInstance(width, height, x, y, level, speed, life) {
        var monster = null;
        if (this.monstersPooling.hasObjects()) {
            monster = this.monstersPooling.get();
            monster.resetState(height, x, y, speed, life);
        } else {
            monster = new Monster(width, height, x, y, level, speed, life);
        }
        return monster;
    }
    
    createFlyingMonsterInstance(x, y, level, width, height, life, speed) {
        var monster = null;
        if (this.flyingMonstersPooling.hasObjects()) {
            monster = this.flyingMonstersPooling.get();
            monster.resetState(x, y, width, height, life, speed);
        } else {
            monster = new FlyingMonster(x, y, level, width, height, life, speed);
        }
        return monster;
    }
    
    update(dt) {
        
        if (this.player.dispose) {
            this.resetState();
            return;
        }
        
        for (let checkpoint of this.checkpoints) {
            if (!checkpoint.checked && this.player.position.x >= checkpoint.position.x) {
                this.player.positionCopy = checkpoint.position;
                checkpoint.checked = true;
            }
        }
        
        for (let event of this.events) {
            event.check(this.player);
        }
        
        // Example for offsetting the camera on the X axis. 
        /*
        var tile = this.map.tiles[4 * this.map.mapWidth + 13];
        if (this.player.collide(tile)) {
            this.camera.xOffset = this.map.tileWidth * 13;
            this.camera.minX = this.camera.xOffset + this.map.canvasWidth * 0.5;
        }
        */
        var isCinematicOn = false;
        for (let cinematic of this.cinematics) {
            cinematic.update(dt);
            if (cinematic.isCinematicOn) {
                isCinematicOn = true;
            }
        }
       
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(dt);
            if (this.bullets[a].dispose) {
                this.bulletsPooling.add(this.bullets[a]);
                this.bullets.splice(a--, 1);
            }
        }
        for (var a = 0; a < this.enemyBullets.length; a++) {
            this.enemyBullets[a].update(dt);
            if (this.enemyBullets[a].dispose) {
                this.bulletsPooling.add(this.enemyBullets[a]);
                this.enemyBullets.splice(a--, 1);
            } else {
                if (this.enemyBullets[a].collide(this.player)) {
                    this.player.damage(1);
                    this.enemyBullets[a].isReadyToDispose = true;
                }
            }
        }
        for (var a = 0; a < this.particles.length; a++) {
            this.particles[a].update(dt);
            if (this.particles[a].dispose) {
                if (this.particles[a] instanceof InteractiveParticle) {
                    this.interactiveParticlesPooling.add(this.particles[a]);
                } else {
                    this.particlesPooling.add(this.particles[a]);
                }
                this.particles.splice(a--, 1);
            }
        }
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.update(dt);
        }
        this.frontParallax.update(dt);
        this.map.update(dt, this.player);
        this.camera.update(this.player);
        for (let movingTile of this.movingTiles) {
            movingTile.update(dt);
        }
        for (var a = 0; a < this.monsters.length; a++) {
            this.monsters[a].update(dt);
            if (this.monsters[a].dispose) {
                if (this.monsters[a] instanceof Boss && this.monsters[a].isFinal) {
                    this.dispose = true;
                } else if (this.monsters[a] instanceof Monster) {
                    this.monstersPooling.add(this.monsters[a]);
                } else if (this.monsters[a] instanceof FlyingMonster) {
                    this.flyingMonstersPooling.add(this.monsters[a]);
                }
                this.monsters.splice(a--, 1);
            }
        }
        
        if (!isCinematicOn) {
            this.player.update(dt);
        }
    }
    
    render(context) {
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.render(context);
        } 
        this.map.render(context, this.player);
        for (let movingTile of this.movingTiles) {
            movingTile.render(context);
        }
        this.player.render(context);
        for (let monster of this.monsters) {
            monster.render(context);
        }
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
        for (let bullet of this.enemyBullets) {
            bullet.render(context);
        }
        for (let particle of this.particles) {
            particle.render(context);
        }
        this.map.renderFront(context, this.player);
        this.frontParallax.render(context);
    }
    
    resetState() {
        this.player.resetState();
        this.monsters = [];
        this.bullets = [];
        this.enemyBullets = [];
        this.particles = [];
        for (let event of this.events) {
            if (event.position.x >= this.player.position.x) {
                event.executed = false;
            }
        }
    }
}

class Cinematic {
    
    constructor(player, map, camera, xOffsetTo, targetTile, blockTiles, callBack) {
        this.isCinematicOn = false;
        this.xOffsetTo = xOffsetTo;
        this.targetTile = targetTile;
        this.player = player;
        this.map = map;
        this.camera = camera;
        this.blockTiles = blockTiles;
        this.callBack = callBack;
    }
    
    update(dt) {
        if (this.targetTile !== null && this.player.position.x >= this.targetTile.position.x && !this.isCinematicOn) {
            this.isCinematicOn = true;
            this.targetTile = null;
            var xLeft = this.player.position.x - this.map.canvasWidth * 0.5;
            var xDiff = this.xOffsetTo - xLeft;
            this.camera.xOffset = this.xOffsetTo - xDiff;
            
            for (let blockTile of this.blockTiles) {
                this.map.tiles[blockTile] = new Tile(this.map.tileWidth, this.map.tileHeight, blockTile % this.map.mapWidth, parseInt(blockTile / this.map.mapWidth), this.camera, 0);
            }
        }
       
        if (this.isCinematicOn) {
            if (this.callBack !== null) {
                this.callBack();
            }
            this.camera.xOffset += (this.xOffsetTo - this.camera.xOffset) * dt;
            this.camera.minX = this.xOffsetTo + this.map.canvasWidth * 0.5;
            if (Math.abs(this.camera.xOffset - this.xOffsetTo) <= 10) {
                this.camera.xOffset = this.xOffsetTo;
                this.isCinematicOn = false;
            }
        }
    }
}

class EnemyEvent {
    
    constructor(strategyCallback, position) {
        this.executed = false;
        this.strategy = strategyCallback;
        this.position = position;
    }
    
    check(player) {
        if (!this.executed) {
            if (player.position.x >= this.position.x) {
                this.executed = true;
                this.strategy();
            }
        }
    }
}

class EndScene extends Scene {
    
    constructor(canvas) {
        super(canvas);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.width = 5;
        this.height = 4;
        var canvasWidth = window.innerWidth;
        var canvasHeight = window.innerHeight;
        this.tileWidth = canvasWidth / this.width;
        this.tileHeight = canvasHeight / this.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        offsetY = canvasHeight;
        this.imageData = null;
    }
    
    setImageData(imageData) {
        this.imageData = imageData;
        var width = this.imageData.width;
        var height = this.imageData.height;
        var data = this.imageData.data;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var index = (y * width + x) * 4;
                var r = data[index];
                var g = data[index + 1];
                var b = data[index + 2];
                var a = data[index + 3];
                var p = (r + g + b) / 3;
                data[index] = p;
                data[index + 1] = p;
                data[index + 2] = p;
            }
        }
    }
    
    update(dt) {
        this.fontSize = this.tileHeight * 0.3;
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        
        this.context.putImageData(this.imageData, 0, 0);
        
        this.context.font = this.fontSize + "px Tahoma";
        this.context.fillStyle = "#ffac69";
        this.context.textAlign = "center";
        this.context.fillText("END", this.canvas.width * 0.5, this.canvas.height * 0.85); 
    }
}

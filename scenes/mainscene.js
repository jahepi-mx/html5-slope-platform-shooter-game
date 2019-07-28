class MainScene extends Scene {
    
    constructor(canvas) {
        super(canvas);
        this.cursor = Cursor.getInstance();
        this.sceneManager = SceneManager.getInstance();
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
        var camera = new Camera();
        this.parallaxBgs = [];
        this.parallaxBgs.push(new ParallaxBg(camera, canvasWidth, canvasHeight, "background3", 1, 0, true));
        this.parallaxBgs.push(new ParallaxBg(camera, canvasWidth, canvasHeight, "background2", 1, 0, false));
        this.dispose = false;
    }
    
    update(dt) {
        this.fontSize = this.tileHeight * 0.3;
        var half = this.tileWidth * 0.5;
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.update(dt);
        }
        if (this.cursor.isPressed) {
            var x = this.canvas.width * 0.5;
            var y = this.canvas.height * 0.85;
            if (this.cursor.position.x >= x - half && this.cursor.position.x <= x + half
                    && offsetY - this.cursor.position.y >= y - half && offsetY - this.cursor.position.y <= y + half) {
                if (!this.dispose) {
                    this.sceneManager.setScene("game");
                    this.dispose = true;
                }
            }
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.render(this.context);
        } 
        this.context.font = this.fontSize + "px Tahoma";
        this.context.fillStyle = "#ffac69";
        this.context.textAlign = "center";
        this.context.fillText("Start Game", this.canvas.width * 0.5, this.canvas.height * 0.85); 
    }
}


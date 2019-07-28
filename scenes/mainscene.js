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
        this.startFontSize = this.tileHeight * 0.3;
        this.descFontSize = this.tileHeight * 0.1;
        this.controlFontSize = this.tileHeight * 0.09;
        this.startFromKeyInput = false;
    }
    
    update(dt) {
        var half = this.tileWidth;
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.update(dt);
        }
        if (this.cursor.isPressed) {
            var x = this.canvas.width * 0.9;
            var y = this.canvas.height * 0.75;
            if (this.cursor.position.x >= x - half && this.cursor.position.x <= x
                    && offsetY - this.cursor.position.y >= y - half && offsetY - this.cursor.position.y <= y + half) {
                if (!this.dispose) {
                    this.sceneManager.setScene("game");
                    this.dispose = true;
                }
            }
        }
        
        if (this.startFromKeyInput) {
            if (!this.dispose) {
                this.sceneManager.setScene("game");
                this.dispose = true;
            }
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        for (let parallaxBg of this.parallaxBgs) {
            parallaxBg.render(this.context);
        } 
        this.context.font = this.startFontSize + "px Impact";
        this.context.fillStyle = "#ffac69";
        this.context.textAlign = "right";
        this.context.fillText("Start Game", this.canvas.width * 0.9, this.canvas.height * 0.75); 
        
        this.context.font = "bold " + this.descFontSize + "px Tahoma";
        this.context.fillStyle = "#fff";
        this.context.textAlign = "right";
        this.context.fillText("This is a short game demo which showcases several game techniques such as slopes, parallax scrolling and basic physics", this.canvas.width * 0.9, this.canvas.height * 0.80);
        
        this.context.font = this.controlFontSize + "px Tahoma";
        this.context.fillStyle = "#fff";
        this.context.textAlign = "right";
        this.context.fillText("Control scheme: a = left | d = right | w = up | s = down | space bar = jump | right click = shoot", this.canvas.width * 0.9, this.canvas.height * 0.85);
    }
    
    input(key, pressed) {
        if (key === 80 && pressed) {
            this.startFromKeyInput = true;
        }
    }
}


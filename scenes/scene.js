class Scene {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.config = Config.getInstance();
    }
    
    update(dt) {}
    
    render() {}
    
    input(key, pressed) {}
    
}



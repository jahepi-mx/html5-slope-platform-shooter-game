let sceneManagerInstance = null;

class SceneManager {
    
    constructor() {
        this.scene = null;
        this.canvas = null;
    }
    
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    
    static getInstance() {
        if (sceneManagerInstance === null) {
            sceneManagerInstance = new SceneManager();
        }
        return sceneManagerInstance;
    }
    
    setScene(name) {
        switch (name) {
            case "main": this.scene = new MainScene(this.canvas); break;
            case "game": this.scene = new GameScene(this.canvas); break;
            case "end": this.scene = new EndScene(this.canvas); break;
        }
        return this.scene;
    }
}


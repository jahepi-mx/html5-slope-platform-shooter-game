let configInstance = null;

class Config {
    
    constructor() {
        this.screenRatio = 1920 / 1080;
        this.offsetY = 0;
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    }
}


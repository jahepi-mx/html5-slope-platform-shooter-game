let assetsInstance = null;

class Assets {
    
    constructor() {
        this.loaded = false;
        this.loadedCount = 0;
        this.callback = null;
        this.downloadCallback = null
        this.srcs = ["assets/sprites/sprites.png"];
        this.keys = ["spritesAtlas"];
        this.audio = {};
        this.audio.srcs = ["assets/sounds/boss.mp3", "assets/sounds/boss_gun.mp3", "assets/sounds/main.mp3", "assets/sounds/monster_die0.mp3", "assets/sounds/monster_die1.mp3", "assets/sounds/monster_die2.mp3", "assets/sounds/monster_die3.mp3", "assets/sounds/player_gun.mp3", "assets/sounds/robot_die0.mp3", "assets/sounds/robot_die1.mp3"];
        this.audio.keys = ["boss", "boss_gun", "main", "monster_die0", "monster_die1", "monster_die2", "monster_die3", "player_gun", "robot_die0", "robot_die1"];
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
    
    static getInstance() {
        if (assetsInstance === null) {
            assetsInstance = new Assets();
        }
        return assetsInstance;
    }
    
    getLoadedRatio() {
        return this.loadedCount / (this.srcs.length + this.audio.srcs.length);
    }
    
    loadAll(callback, downloadCallback) {
        if (this.loaded) return;
        this.callback = callback;
        this.downloadCallback = downloadCallback;
        for (var i = 0; i < this.keys.length; i++) {
            this[this.keys[i]] = new Image();
        }
        this.load(0);
    }

    load(index) {
        var self = this;
        self[self.keys[index]].onload = function() {
            if (index + 1 >= self.srcs.length) {
                self.loadedCount++;
                if (self.audio.srcs.length === 0) {
                    if (self.downloadCallback !== null) {
                        self.downloadCallback();
                    }
                    if (self.callback !== null) {
                        self.callback();
                    }
                } else {
                    self.loadAllAudios();
                }
            } else {
                self.loadedCount++;
                if (self.downloadCallback !== null) {
                    self.downloadCallback();
                }
                self.load(index + 1);
            }
        };
        this[this.keys[index]].src = this.srcs[index];
    }

    loadAllAudios() {
        this.loadAudio(0);
    }

    loadAudio(index) {
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", this.audio.srcs[index], true);
        xmlRequest.responseType = "arraybuffer";
        var self = this;
        xmlRequest.onload = function() {
            self.audioContext.decodeAudioData(xmlRequest.response, function(buffer) {
                self[self.audio.keys[index]] = buffer;
                if (index + 1 >= self.audio.srcs.length) {
                    self.loadedCount++;
                    self.loaded = true;
                    if (self.downloadCallback !== null) {
                        self.downloadCallback();
                    }
                    if (self.callback !== null) {
                        self.callback();
                    }
                } else {
                    self.loadedCount++;
                    if (self.downloadCallback !== null) {
                        self.downloadCallback();
                    }
                    self.loadAudio(index + 1);
                }
            }, function() {
                if (index + 1 >= self.audio.srcs.length) {
                    self.loadedCount++;
                    self.loaded = true;
                    if (self.callback !== null) {
                        self.callback();
                    }
                } else {
                    self.loadedCount++;
                    self.loadAudio(index + 1);
                }
            });
        };
        xmlRequest.send();
    }

    playAudio(buffer, loop, volume) {
        var source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        //source.connect(this.audioContext.destination);
        var gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = volume;
        source.start(0);
        return source;
    }
    
    playAudioWithGainInfo(buffer, loop, volume) {
        var source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        //source.connect(this.audioContext.destination);
        var gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = volume;
        source.start(0);
        return {source: source, gain: gainNode.gain};
    }
};
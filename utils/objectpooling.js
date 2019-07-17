class ObjectPooling {
    
    constructor(capacity) {
        this.capacity = capacity;
        this.objects = [];
    }
    
    add(object) {
        while (this.size() >= this.capacity) {
            this.objects.pop();
        }
        this.objects.push(object);
    }
    
    size() {
        return this.objects.length;
    }
    
    get() {
        if (this.hasObjects()) {
            return this.objects.pop();
        }
        return null;
    }
    
    hasObjects() {
        return this.size() > 0;
    } 
}


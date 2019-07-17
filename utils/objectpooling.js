class ObjectPooling {
    
    constructor(size) {
        this.size = size;
        this.objects = [];
    }
    
    add(object) {
        while (this.length() >= this.size) {
            this.objects.pop();
        }
        this.objects.push(object);
    }
    
    length() {
        return this.objects.length;
    }
    
    get() {
        if (this.hasObjects()) {
            return this.objects.pop();
        }
        return null;
    }
    
    hasObjects() {
        return this.objects.length > 0;
    }
    
}


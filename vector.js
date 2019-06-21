let DEGREES_TO_RADIANS = Math.PI / 180;
let RADIANS_TO_DEGREES = 180 / Math.PI;
        
class Vector {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    add(vector) {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }
    
    addThis(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    
    sub(vector) {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }
    
    subThis(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    
    mul(vector) {
        return new Vector(this.x * vector.x, this.y * vector.y);
    }
    
    mulByScalar(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    
    mulThis(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
    }
    
    div(vector) {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }
    
    divThis(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    
    normalize() {
        var length = this.length();
        return new Vector(this.x / length, this.y / length);
    }
    // Counter-clockwise rotation
    ccwMatrix(degrees) {
        var radians = degrees * DEGREES_TO_RADIANS;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var matrix = [
            cos, -sin, 
            sin, cos,
        ];
        return matrix;
    }
    
    ccwTransform(degrees) {
        var matrix = this.ccwMatrix(degrees);
        var x = this.x * matrix[0] + this.y * matrix[1];
        var y = this.x * matrix[2] + this.y * matrix[3];
        return new Vector(x, y);
    }
    
    // Clockwise rotation
    cwMatrix(degrees) {
        var radians = degrees * DEGREES_TO_RADIANS;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var matrix = [
            cos,  sin, 
            -sin, cos,
        ];
        return matrix;
    }
    
    cwTransform(degrees) {
        var matrix = this.cwMatrix(degrees);
        var x = this.x * matrix[0] + this.y * matrix[1];
        var y = this.x * matrix[2] + this.y * matrix[3];
        return new Vector(x, y);
    }
    
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    
    clone() {
        return new Vector(this.x, this.y);
    }
    
    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }
}



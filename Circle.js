// A circle class to define an object that is able to rotate around another circle object

class Circle {
    // define one cycle in radians
    static cycle = 2 * Math.PI;

    // private properties
    #radius = null;
    #pos = {x: null, y: null};
    #angle = 0;
    #fill = null;
    #colour = null;

    constructor(radius=1, x=0, y=0, fill=false, colour="white") {
        this.#radius = radius;
        this.#pos.x = x;
        this.#pos.y = y;
        this.#fill = fill;
        this.#colour = colour;
    }
    
    get radius() {return this.#radius;}
    get pos() {return this.#pos;}

    // move around anoter circle object
    move(OuterCircle, deltaA, wave) {
        // accumulate angle with a delta variable
        this.#angle += deltaA;
        
        // get remainder when angle goes beyond full cycle
        if (this.#angle > Circle.cycle) {
            this.#angle %= Circle.cycle;
        }

        // use polar coordinates to define new position of circle
        let xCircle = null;
        let yCircle = null;
        if (wave == "square") {
            xCircle = Math.cos(this.#angle);
            yCircle = Math.sin(this.#angle);
        } else if (wave == "triangle") {
            xCircle = Math.sin(this.#angle);
            yCircle = Math.cos(this.#angle);
        }
        this.#pos.x = OuterCircle.pos.x + OuterCircle.radius * xCircle;
        this.#pos.y = OuterCircle.pos.y + OuterCircle.radius * yCircle;
    }
    
    draw(context) {
        context.beginPath();
        context.arc(this.#pos.x, this.#pos.y, this.#radius, 0, Circle.cycle, false);
        context.lineWidth = 1;
        context.strokeStyle = this.#colour;
        context.stroke();
        
        if (this.#fill == true) {
            context.fillStyle = this.#colour;
            context.fill();
        }
        
        context.closePath();
    }

    // turn circle into a dot
    turnIntoDot() {
        this.#radius /= 5;
        this.#fill = true;
        this.#colour = "yellow";
    }
}
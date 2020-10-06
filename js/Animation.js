
class FourierAnimation {
    // return the kth odd harmonic
    static oddHarmonic = k => 2 * k - 1;

    constructor(wave, radius, center, harmonics) {
        this.points = [];
        // define first circle
        this.radius = radius;
        this.center = center;

        // define number of harmonics
        this.harmonics = harmonics;
        
        // create circles
        this.circles = [];
        this.wave = wave;
        for (let k = 1; k < this.harmonics + 2; k++) {
            let currentR = null;
            const n = FourierAnimation.oddHarmonic(k)
            if (this.wave == "square") {
                currentR = this.radius / n;
            } else if (this.wave == "triangle") {
                currentR = this.radius / n**2;
            }
            const currentX = this.center.X + (k - 1) * this.radius;
            this.circles.push(new Circle(currentR, currentX, this.center.Y));
        }

        // turn final circle into a dot
        this.circles[this.circles.length - 1].turnIntoDot();
    }
    
    plot(context) {
        // limit how many datapoints are stored
        if (this.points.length > 180) {
            this.points.pop();
        }
        
        // set line parameters
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "yellow";
        
        // draw line from center of last circle
        let startX = 200;
        const lastIndex = this.circles.length - 1;
        context.moveTo(this.circles[lastIndex].pos.x, this.circles[lastIndex].pos.y);
        context.lineTo(startX, this.circles[lastIndex].pos.y);
        context.stroke();
        
        // connect all data points with lines
        let deltaX = 0;
        for (this.point of this.points) {
            context.lineTo(startX + deltaX, this.point);
            context.stroke();
            deltaX += 1;
        }
        
        context.closePath();
    }
    
    draw(context, deltaA) {
        // draw first circle
        this.circles[0].draw(context);
        
        // move and draw all circles except the zeroth one
        for (let k = 1; k < this.circles.length; k++) {
            this.circles[k].move(this.circles[k - 1], 
                                 deltaA * FourierAnimation.oddHarmonic(k),
                                 this.wave);
            this.circles[k].draw(context);
        }
        
        // append y position of final circle to the beginning
        this.points.unshift(this.circles[this.circles.length - 1].pos.y);
        
        // plot the y positions stored
        this.plot(context);
    }
}
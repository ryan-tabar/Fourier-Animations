// An animation of Fourier analysis

class FourierCanvas {
    constructor(wave, canvasID, sliderID, harmonicsID) {
        this.wave = wave;

        // aquire canvas and context
        this.canvas = document.getElementById(canvasID);
        this.context = this.canvas.getContext("2d");
        
        // aquire slider and set slider function
        this.slider = document.getElementById(sliderID);
        this.output = document.getElementById(harmonicsID);
        this.output.innerHTML = this.slider.value;
        this.slider.oninput = () => { this.output.innerHTML = this.slider.value;
                                      this.animation = new FourierAnimation(this.wave, 
                                                                            this.radius, 
                                                                            this.center, 
                                                                            this.harmonics=parseInt(this.slider.value));
                                    };
        
        // set canvas parameters and set interval
        const FPS = 60;
        this.canvas.width = 400;
        this.canvas.height = 200;
        window.setInterval(this.draw, 1000 / FPS, this);
        
        // set initial circle parameters
        this.radius = 60;
        this.center = {
            X: this.canvas.width / 5,
            Y: this.canvas.height / 2
        };
        
        // create animation
        this.animation = new FourierAnimation(this.wave, 
                                              this.radius, 
                                              this.center, 
                                              this.harmonics=parseInt(this.slider.value));

        this.sliderValueBefore = parseInt(this.slider.value);
    }
    
    drawBackground(obj) {
        obj.context.fillStyle = "black";
        obj.context.fillRect(0, 0, obj.canvas.width, obj.canvas.height);
    }
    
    draw(obj) {
        obj.drawBackground(obj);
        obj.animation.draw(obj.context, 0.05);
    }
    
}

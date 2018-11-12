let waterFullCanvas = function (c, cw, ch) {
    let that = this
    this.c = c
    this.ctx = c.getContext('2d')
    this.cw = cw
    this.ch = ch

    this.particles = []
    this.particleRate = 1
    this.gravity = 0.15

    this.init = function () {
        this.loop()
    }

    this.reset = function () {
        this.ctx.clearRect(0, 0, this.cw, this.ch)
        this.particles = []
    }

    this.rand = function (rMi, rMa) {
        return ~~((Math.random() * (rMa - rMi + 1)) + rMi)
    }

    this.Particle = function () {
        let newWidth = that.rand(1, 20)
        let newHeight = that.rand(1, 45)
        this.x = that.rand(10 + (newWidth / 2), that.cw - 10 - (newWidth / 2))
        this.y = -newHeight
        this.vx = 0
        this.vy = 0
        this.width = newWidth
        this.height = newHeight
        this.hue = that.rand(200, 220)
        this.saturation = that.rand(30, 60)
        this.lightness = that.rand(30, 60)
    }
    this.Particle.prototype.update = function () {
        this.vx += this.vx
        this.vy += that.gravity
        this.x += this.vx
        this.y += this.vy
        // console.log(this.y)
    }
    this.Particle.prototype.render = function () {
        // that.ctx.strokeStyle = 'red'
        that.ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, .05)'
        that.ctx.beginPath()
        that.ctx.moveTo(this.x, this.y)
        that.ctx.lineTo(this.x, this.y + this.height)
        that.ctx.lineWidth = this.width / 2
        that.ctx.lineCap = 'round'
        that.ctx.stroke()
    }
    this.Particle.prototype.renderBubble = function () {
        // that.ctx.fillStyle = 'red'
        that.ctx.fillStyle = 'hsla('+this.hue+', 40%, 40%, 1)'
        // that.ctx.fillStyle = 'red'
        that.ctx.fillStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, .3)'
        that.ctx.beginPath()
        that.ctx.arc(this.x+this.width/2, that.ch-20-that.rand(0,10), that.rand(1,8), 0, Math.PI*2, false)
        that.ctx.fill()
    }
    this.createParticles = function(){
        let i = this.particleRate;
        while(i--){
            this.particles.push(new this.Particle());
        }
    };

    this.removeParticles = function(){
        let i = this.particleRate;
        while(i--){
            let p = this.particles[i];
            if(p.y > that.ch-20-p.height){
                p.renderBubble();
                that.particles.splice(i, 1);
            }
        }
    };

    this.updateParticles = function(){
        let i = this.particles.length;
        while(i--){
            let p = this.particles[i];
            p.update(i);
            // console.log(p)
        };
    };

    this.renderParticles = function(){
        let i = this.particles.length;
        while(i--){
            let p = this.particles[i];
            p.render();
        };
    };

    this.clearCanvas = function(){
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(255,255,255,.06)';
        this.ctx.fillRect(0,0,this.cw,this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    };
    this.number = 0
    this.loop = function(){
        let loopIt = function(){
            that.number++
            if (that.number < 43) {
                requestAnimationFrame(loopIt);
            }
            // requestAnimationFrame(loopIt);
            that.clearCanvas();
            that.createParticles();
            that.updateParticles();
            that.renderParticles();
            that.removeParticles();
        };
        loopIt();
    };
}

let isSupportCanvas = function () {
    let elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
}

let setupRAF = function () {
    let lastTime = 0
    let vendors = ['ms', 'moz', 'webkit', 'o']
    for (let i = 0; i < vendors.length && !window.requestAnimationFrame; i++) {
        window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            let currtime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currtime - lastTime))
            window.requestAnimationFrame = window.setTimeout(function () {
                callback(currtime + timeToCall)
            }, timeToCall)
            lastTime = currtime + timeToCall
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
}
if(isSupportCanvas()){
    let c = document.getElementById('water');
    let cw = c.width = 100;
    let ch = c.height = 140;
    let waterfall = new waterFullCanvas(c, cw, ch);
    // setupRAF();
    waterfall.init();
}

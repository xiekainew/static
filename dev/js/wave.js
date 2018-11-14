(function () {
    let FastRandom = function () {
        this.getNextFloat = function () {
            return Math.random()
        }
    }
    let ParticleWave = function () {
        let me = this
        let config = {
            colors: {
                background: 0x000000,
                particle: 0x477cc2
            },
            alpha: {
                particle: 1
            },
            particleCount: 30000
        }
        let TAU = Math.PI * 2
        let random = new FastRandom()
        let particle,
            particleFillStyle,
            particleColorRGB = new Float32Array(3),
            smoothGradient,
            waterGradient,
            canvas,
            engine,
            width,
            height,
            particleWaveWalker = 0,
            randomWalker = 0

        let requestTick = function () {
            window.requestAnimationFrame(tick)
        }

        let initParticle = function () {
            particle = new Float32Array(config.particleCount * 2)
            eachParticle(function(x, z) {
                particle[x] = random.getNextFloat()
                particle[z] = random.getNextFloat()
            })
        }
        let eachParticle = function (cb) {
            for (let i = 0, l = particle.length; i < l; i += 2) {
                cb(i, i + 1)
            }
        }

        let initCanvas = function () {
            canvas = document.getElementById('canvas')
            engine = canvas.getContext('2d')
            width = window.innerWidth
            height = window.innerHeight
            canvas.setAttribute('width', width)
            canvas.setAttribute('height', height)
        }

        let initParticleColor = function () {
            particleColorRGB[0] = config.colors.particle >> 16 & 0xff
            particleColorRGB[1] = config.colors.particle >> 8 & 0xff
            particleColorRGB[2] = config.colors.particle & 0xff
            particleFillStyle = 'rgb(' + particleColorRGB[0] + ',' + particleColorRGB[1] + ',' + particleColorRGB[2] + ')'
        }

        let initSmoothGradient = function () {
            smoothGradient = engine.createLinearGradient(width / 2, 0, width / 2, height)
            smoothGradient.addColorStop(0.25, 'rgba(0, 0, 0, 0)')
            smoothGradient.addColorStop(0.45, 'rgba(0, 0, 0, 0.9)')
            smoothGradient.addColorStop(0.5 , 'rgba(0, 0, 0, 1)')
            smoothGradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.9)')
            smoothGradient.addColorStop(0.75, 'rgba(0, 0, 0, 0)')
        }

        let initWaterGradient = function () {
            waterGradient = engine.createLinearGradient(width / 2, height / 2, width / 2, height)
            waterGradient.addColorStop(0, 'rgba(0, 0, 30, 0)')
            waterGradient.addColorStop(1, 'rgba(30, 0, 60, 0.5)')
        }

        let init = function () {
            initCanvas()
            initParticle()
            initParticleColor()
            initSmoothGradient()
            initWaterGradient()
        }

        let renderParticle = function () {
            randomWalker += (Math.random() - 0.5) * 0.1
            particleWaveWalker += 0.03
            let radius = {
                min: 1,
                add: 5
            }
            let midY = height / 2
            let midX = width / 2
            let spreadX = 5
            let spreadZ = 0.0
            let modZ = 0.0
            let addX = 0,
                addY = 0
            let p = {
                x: 0.0,
                y: 0.0,
                r: 0.0
            }
            engine.fillStyle = particleFillStyle
            let waveControl = 10
            for (let i = 0, xIndex, zIndex, l = particle.length; i < l; i += 2) {
                xIndex = i
                zIndex = i + 1
                particle[zIndex] += 0.003
                if (particle[zIndex] > 1) {
                    particle[zIndex] = 0
                    particle[zIndex] = random.getNextFloat()
                }
                if (particle[zIndex] < 0.3) {
                    continue
                }
                modZ = Math.pow(particle[zIndex], 2)
                spreadZ = 1 + (spreadX - 1) * modZ

                addX = (0.5 - particle[xIndex]) * width * spreadZ
                addY = midY * modZ * (1 + 3 / waveControl)

                p.x = midX + addX
                p.y = midY + addY
                p.r = radius.min + modZ * radius.add

                p.y += Math.sin(particle[xIndex] * 50 + particleWaveWalker) * addY / waveControl
                p.y += Math.cos(particle[zIndex] * 10 + particleWaveWalker) * addY / waveControl;

                // p.y -= Math.cos(particle[zIndex] + particle[xIndex] * 10 + particleWaveWalker) * addY / waveControl;

                p.y -= Math.cos(particle[xIndex] * 50 + particleWaveWalker) * addY / waveControl;
                p.y -= Math.sin(particle[zIndex] * 10 + particleWaveWalker) * addY / waveControl;
                if (p.x < 0 || p.x > width) {
                    continue
                }
                engine.fillRect(p.x, p.y, p.r, p.r)

                // engine.moveTo(p.x, p.y);
                // engine.arc(p.x, p.y, p.r, 0, TAU, false);
                //
                // // top
                // p.y = height - p.y;
                //
                // engine.moveTo(p.x, p.y);
                // engine.arc(p.x, p.y, p.r, 0, TAU, false);
            }
            engine.fillStyle = particleFillStyle

            // engine.closePath();
            // engine.fill();
        }
        let colorIntToHexString = function (color) {
            let s = color.toString(16)
            return '0'.repeat(6 - s.length) + s
        }
        let clear = function () {
            engine.fillStyle = '#' + colorIntToHexString(config.colors.background)
            engine.fillRect(0, 0, width, height)
        }
        let drawSmooth = function () {
            engine.fillStyle = smoothGradient
            engine.fillRect(0, 0, width, height)
        }
        let drawWater = function () {
            engine.fillStyle = waterGradient
            engine.fillRect(0, height / 2, width, height / 2)
        }
        let tick = function () {
            clear()
            drawWater()
            renderParticle()
            drawSmooth()
            requestTick()
        }
        this.run = function () {
            init()
            tick()
        }
    }
    let pw = new ParticleWave()
    pw.run()
})()
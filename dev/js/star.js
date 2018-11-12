(function () {
    var canvas = document.getElementById('star')
    var ctx = canvas.getContext('2d')
    var mousePos = [0, 0]
    var easingFactor = 5.0
    var backgroundColor = '#f1f1f1'
    let nodeColor = '#20a0ff'
    let edgeColor = '#20a0ff'

    let nodes = []
    let edges = []
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    console.log(canvas.clientHeight)
    let rand = function (rMi, rMa) {
        return ~~((Math.random() * (rMa - rMi + 1)) + rMi)
    }
    function createNodes () {
        for (let i = 0; i < 30; i++) {
            let node = {
                drivenByMouse: i === 0,
                x: rand(0, canvas.width),
                y: rand(0, canvas.height),
                vx: Math.random() - 0.5,
                vy: Math.random() - 0.5,
                radius: Math.random() > 0.9 ? 2 + Math.random() * 2 : 1 + Math.random() * 2
            }
            nodes.push(node)
        }
        console.log(nodes)
        nodes.forEach(function (e) {
            nodes.forEach(function (e2) {
                if (e === e2) return
                let edge = {
                    from: e,
                    to: e2
                }
                addEdge(edge)
            })
        })
        console.log(edges)
    }
    function lengthOfEdge (edge) {
        return ~~(Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2)))
        // return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));

    }
    function addEdge (edge) {
        let flag = false
        edges.forEach(function (e) {
            if (e.from === edge.from && e.to === edge.to) {
                flag = true
            }
            if (e.from === edge.to && e.to === edge.from) {
                flag = true
            }
        })
        if (!flag) {
            edges.push(edge)
        }
    }
    function render () {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        edges.forEach(function (e) {
            let l = lengthOfEdge(e) / 1.4
            let threshold = canvas.width / 4
            if (l > threshold) return
            ctx.strokeStyle = edgeColor
            ctx.strokeWidth = (1 - l / threshold) * 2
            ctx.globalAlpha = 1 - l / threshold
            ctx.beginPath()
            ctx.moveTo(e.from.x, e.from.y)
            ctx.lineTo(e.to.x, e.to.y)
            ctx.stroke()
        })
        ctx.globalAlpha = 1
        nodes.forEach(function (e) {
            ctx.fillStyle = nodeColor
            ctx.beginPath()
            ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI)
            ctx.fill()
        })
    }
    function clamp (min, max, value) {
        if (value > max) {
            return max
        } else if (value < min) {
            return min
        } else {
            return value
        }
    }
    function step () {
        nodes.forEach(function (e) {
            e.x += e.vx
            e.y += e.vy

            if (e.x <= 0 || e.x >= canvas.width) {
                e.vx *= -1
                e.x = clamp(0, canvas.width, e.x)
            }
            if (e.y <= 0 || e.y >= canvas.height) {
                e.vy *= -1
                e.y = clamp(0, canvas.height, e.y)
            }
        })
        render()
        window.requestAnimationFrame(step)
    }
    createNodes()
    window.requestAnimationFrame(step)
})()
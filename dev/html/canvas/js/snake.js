function Snake (canvas, space, number, lineColor) {
    canvas.width = document.documentElement.clientWidth - 100
    canvas.height = document.documentElement.clientHeight - 100
    this.ctx = canvas.getContext('2d')
    this.width = canvas.clientWidth
    this.height = canvas.clientHeight
    this.space = space || 20
    this.number = number || 20
    this.row = 0
    this.cel = 0
    this.snakeList = []
    this.moveList = []
    this.timer = null
    this.lineColor = lineColor || 'rgba(0, 0, 255, .3)'
}
Snake.prototype.line = function () {
    var that = this
    function lineRow () {
        that.ctx.beginPath()
        that.ctx.strokeStyle = that.lineColor
        that.ctx.lineWidth = 1
        that.ctx.moveTo(0, that.row)
        that.ctx.lineTo(that.width, that.row)
        that.ctx.stroke()
        that.ctx.closePath()
        that.row += that.space
        if (that.row < that.height) {
            lineRow()
        }
    }
    lineRow()
    function lineCel () {
        that.ctx.beginPath()
        that.ctx.strokeStyle = that.lineColor
        that.ctx.lineWidth = 1
        that.ctx.moveTo(that.cel, 0)
        that.ctx.lineTo(that.cel, that.height)
        that.ctx.stroke()
        that.ctx.closePath()
        that.cel += that.space
        if (that.cel < that.width) {
            lineCel()
        }
    }
    lineCel()
}
Snake.prototype.randomSnake = function (number) {
    while (number) {
        var x = randoms(this.row / this.space) * this.space
        var y = randoms(this.cel / this.space) * this.space
        this.snakeList.push({
            x: x,
            y: y,
            color: '#'+Math.floor(Math.random()*0xffffff).toString(16)
        })
        number--
    }
    this.snakeList.forEach(function (item) {
        this.ctx.beginPath()
        this.ctx.rect(item.x + 1, item.y + 1, this.space - 2, this.space - 2)
        this.ctx.fillStyle = 'blue' || item.color
        this.ctx.fill()
        this.ctx.closePath()
    })
}
Snake.prototype.randomPushSnake = function () {
    var that = this
    var timer = setTimeout(function () {
        clearTimeout(timer)
        that.randomSnake(1)
    }, 3000)
}
Snake.prototype.moveSnake = function () {
    this.moveList = this.snakeList.splice(0, 1)
    this.step(39)
}
Snake.prototype.bindSnake = function () {
    var that = this
    document.addEventListener('keydown', function (e) {
        clearTimeout(that.timer)
        that.step(e.keyCode)
    })
}
Snake.prototype.step = function (keyCode) {
    var that = this
    var checked = that.checkSnake(keyCode)
    if (checked) return
    that.clearSnake(that.moveList[that.moveList.length - 1])
    var o = {}
    switch (keyCode) {
        case 39: // 右
            o = {
                x: that.moveList[0].x + that.space,
                y: that.moveList[0].y
            }
            break
        case 40: // 下
            o = {
                x: that.moveList[0].x,
                y: that.moveList[0].y + that.space
            }
            break
        case 37: // 左
            o = {
                x: that.moveList[0].x - that.space,
                y: that.moveList[0].y
            }
            break
        case 38: // 上
            o = {
                x: that.moveList[0].x,
                y: that.moveList[0].y - that.space
            }
            break
    }
    that.moveList.unshift(o)
    that.moveList.pop()
    that.drawSnake(that.moveList[0])
    that.timer = setTimeout(function () {
        that.step(keyCode)
    }, 1000 / that.moveList.length)
}
Snake.prototype.checkSnake = function (keyCode) {
    var that = this
    var first = {
        x: that.moveList[0].x,
        y: that.moveList[0].y
    }
    switch (keyCode) {
        case 39: // 右
            first.x += that.space
            break
        case 40: // 下
            first.y += that.space
            break
        case 37: // 左
            first.x -= that.space
            break
        case 38: // 上
            first.y -= that.space
            break
    }
    var flag = this.moveList.some(function (item) {
        return item.x === first.x && item.y === first.y
    })
    if (flag) return true
    var i = ''
    this.snakeList.forEach(function (item, index) {
        if (item.x === first.x && item.y === first.y) {
            that.moveList.unshift(item)
            i = index
        }
    })
    if (i !== '') {
        this.snakeList.splice(i, 1)
        this.randomPushSnake()
    }
}
Snake.prototype.drawSnake = function (target) {
    this.ctx.beginPath()
    this.ctx.rect(target.x + 1, target.y + 1, this.space - 2, this.space - 2)
    this.ctx.fillStyle = 'blue' || item.color
    this.ctx.fill()
    this.ctx.closePath()
}
Snake.prototype.clearSnake = function (target) {
    this.ctx.clearRect(target.x + 1, target.y + 1, this.space - 2, this.space - 2)
}
Snake.prototype.run = function () {
    this.line()
    this.randomSnake(this.number)
    this.moveSnake()
    this.bindSnake()
}
function randoms (n) {
    return Math.floor(Math.random() * n - 1)
}

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var space = 15
var number = 40
var snake = new Snake(canvas, space, number)
snake.run()

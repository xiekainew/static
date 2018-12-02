function Line (ctx, data, padding, arrow) {
    this.ctx = ctx
    this.data = data
    this.padding = padding || {top: 10, right: 10, bottom: 10, left: 10}
    this.arrow = arrow || {width: 10, height: 20}

    this.top = {
        x: this.padding.left,
        y: this.padding.top
    }
    this.origin = {
        x: this.padding.left,
        y: this.ctx.canvas.height - this.padding.bottom
    }
    this.right = {
        x: this.ctx.canvas.width - this.padding.right,
        y: this.ctx.canvas.height - this.padding.bottom
    }
    // 计算坐标轴表示的最大刻度
    this.coordWidth = this.ctx.canvas.width - this.padding.left - this.padding.right - this.arrow.height
    this.coordHeight = this.ctx.canvas.height - this.padding.top - this.padding.bottom - this.arrow.height
}

Line.prototype = {
    constructor: Line,
    draw: function () {
        this.drawCoord()
        this.drawArrow()
        this.drawLine()
    },
    // 绘制坐标轴
    drawCoord: function () {
        this.ctx.beginPath()
        // this.ctx.strokeStyle = 'red'
        this.ctx.moveTo(this.top.x, this.top.y)
        this.ctx.lineTo(this.origin.x, this.origin.y)
        this.ctx.lineTo(this.right.x, this.right.y)
        // this.ctx.closePath()
        this.ctx.stroke()
    },
    // 绘制箭头
    drawArrow: function () {
        this.ctx.beginPath()
        this.ctx.moveTo(this.top.x, this.top.y)
        this.ctx.lineTo(this.top.x - this.arrow.width / 2, this.top.y + this.arrow.height)
        this.ctx.lineTo(this.top.x, this.top.y + this.arrow.height / 2)
        this.ctx.lineTo(this.top.x + this.arrow.width / 2, this.top.y + this.arrow.height)
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(this.right.x, this.right.y)
        this.ctx.lineTo(this.right.x - this.arrow.height, this.right.y - this.arrow.width / 2)
        this.ctx.lineTo(this.right.x - this.arrow.height / 2, this.right.y)
        this.ctx.lineTo(this.right.x - this.arrow.height, this.right.y + this.arrow.width / 2)
        this.ctx.closePath()
        this.ctx.stroke()
    },
    drawLine: function () {
        this.ctx.beginPath()
        var that = this
        var ratioX = this.coordWidth / this.data.length,
            ratioY = this.coordHeight / Math.max.apply(null, this.data)

        this.data.forEach(function (y, x) {
            that.ctx.fillRect(that.origin.x + (x * ratioX) - 1, that.origin.y - (y * ratioY) -1, 2, 2)
        })
        this.data.forEach(function (y, x) {
            that.ctx.lineTo(that.origin.x + x * ratioX, that.origin.y - y * ratioY)
        })
        this.ctx.stroke()
    }
}

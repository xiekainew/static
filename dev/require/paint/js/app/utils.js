define(function () {
    var history = []
    function drawLine (context, line) {
        line.drawMe(context)
    }
    function drawRect (context, rect) {
        rect.drawMe(context)
    }
    function drawArc (context, arc) {
        arc.drawMe(context)
    }
    function addHistory (item) {
        history.push(item)
    }
    function drawHistory (context) {
        for (var i = 0, l = history.length; i < l; i++) {
            var obj = history[i]
            obj.drawMe(context)
        }
    }
    function clearHistory () {
        history = []
    }
    return {
        drawArc: drawArc,
        drawLine: drawLine,
        drawRect: drawRect,
        addHistory: addHistory,
        drawHistory: drawHistory,
        clearHistory: clearHistory
    }
})
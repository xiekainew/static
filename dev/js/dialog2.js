function Dialog (options) {
    this.title = options.title || '消息提示'
    this.content = options.content || '传入内容'
    this.btns = options.btns || ['确定']
    this.confirm = options.confirm || null
    this.cancel = options.cancel || null
    this.dialogWrapper = null
    this.confirmBtn = null
    this.cancelBtn = null
    this.dialog = null
    this.shadeClose = true

    this.createEle = function () {
        this.dialogWrapper = document.createElement('div')
        var dialog = document.createElement('div')
        var title = document.createElement('div')
        var content = document.createElement('div')
        var button = document.createElement('div')
        this.dialogWrapper.className = 'dialog-wrapper'
        dialog.className = 'dialog'
        title.className = 'title'
        content.className = 'content'
        button.className = 'button'

        title.innerHTML = this.title
        content.innerHTML = this.content

        this.btns.forEach(function (item, index) {
            if (index >= 2) return
            var btn = document.createElement('div')
            btn.className = 'btn ' + (index === 0 ? 'confirm-btn' : 'cancel-btn')
            btn.innerHTML = item
            button.appendChild(btn)
        })

        dialog.appendChild(title)
        dialog.appendChild(content)
        dialog.appendChild(button)
        this.dialogWrapper.appendChild(dialog)
        document.body.appendChild(this.dialogWrapper)
    }
    this.show = function (confirm, cancel) {
        this.createEle()
        this.getElement()
        this.bindEvent(confirm, cancel)
        return this.dialogWrapper
    }
    this.getElement = function () {
        // this.dialogWrapper = document.querySelector('.dialog-wrapper')
        this.confirmBtn = document.querySelector('.confirm-btn')
        this.cancelBtn = document.querySelector('.cancel-btn')
    }
    this.bindEvent = function (confirm, cancel) {
        console.log('event')
        var that = this
        this.confirmBtn && this.confirmBtn.addEventListener('click', function (e) {
            console.log('hide')
            that.hide()
            confirm && confirm()
        })
        this.cancelBtn && this.cancelBtn.addEventListener('click', function (e) {
            that.hide()
            cancel && cancel()
        })
        if (this.shadeClose) {
            this.dialogWrapper.addEventListener('click', function (e) {
                var target = e.target || e.srcElement
                if (target.className.match('dialog-wrapper')) {
                    that.hide()
                }
            })
        }
    }
    this.hide = function () {
        var that = this
        this.dialogWrapper.classList.add('fadeOut')
        setTimeout(function () {
            that.dialogWrapper.parentNode.removeChild(that.dialogWrapper)
        }, 20)
    }
}
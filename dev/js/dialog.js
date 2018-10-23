'use strict';

var dialog = (function () {
    var elem, dialog, cancelBtn, confirmBtn
    var animalArr = [['fadeIn', 'fadeOut'], ['slideDown', 'slideUp'], ['scaleIn', 'scaleOut']]
    var currAnimation = ''
    var getNeedElement = function () {
        elem = document.querySelector('.dialog-wrapper')
        dialog = elem.querySelector('.dialog')
        cancelBtn = elem.querySelector('.cancel-btn')
        confirmBtn = elem.querySelector('.confirm-btn')
    }
    var show = function (options) {
        var title = options.title || ''
        var content = options.content || '忘记传content了'
        var skin = options.skin || ''
        var btns = options.btns || ['确定']
        var shadeClose = options.shadeClose || true
        var confirm = null
        var cancel = null
        var animation = options.animation || 1
        var skinClass = skin ? ' ' + skin : ''
        currAnimation = animation

        var btnTemp = ''
        btns.forEach(function (item, index) {
            if (index === 2) return
            var btnClass = index === 0 ? 'confirm-btn' : 'cancel-btn'
            var temp = '<div class="btn ' + btnClass + '">' + item + '</div>'
            btnTemp += temp
        })
        var html = '<div class="dialog-wrapper fadeIn">' +
                        '<div class="dialog"'+ skinClass + animalArr[currAnimation[0]] + '>' +
                            '<div class="title">' + title + '</div>' +
                            '<div class="content">' + content + '</div>' +
                            '<div class="button">' + btnTemp + '</div>' +
                        '</div>' +
                    '</div>'
        document.body.innerHTML = html
        getNeedElement()
        bindEvent(confirm, cancel, shadeClose)
        return elem
    }
    var hide = function (index) {
        elem.classList.add('fadeOut')
        dialog.classList.add(animalArr[currAnimation[1]])
        setTimeout(function () {
            console.log(elem)
            elem.remove()
        }, 20)
    }
    var bindEvent = function (confirm, cancel, shadeClose) {
        confirmBtn && confirmBtn.addEventListener('click', function (e) {
            hide()
            confirm && confirm()
        })
        cancelBtn && cancelBtn.addEventListener('click', function (e) {
            hide()
            cancel && cancel()
        })
        if (shadeClose) {
            elem.addEventListener('click', function (e) {
                var target = e.target || e.srcElement
                if (target.className.match('dialog-wrapper')) {
                    hide()
                }
            })
        }
    }
    return {
        show: show,
        hide: hide
    }
})()
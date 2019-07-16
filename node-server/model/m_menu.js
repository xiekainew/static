const M_base = require('./m_base.js')
const common = require('../lib/common.js')

class M_menu extends M_base{
	constructor(title = '', icon = '', path = '', parent = '', children = []) {
		super();
		let date = new Date()
		this.id = common.uuid()
		this.create = date
		this.update = date
		this.title = title
		this.icon = icon
		this.path = path
		this.parent = parent
		this.children = children
	}
	checknull(...params) {
		var msg = ''
		for(var p of params) {
			if (!this[p]) {
				switch(p) {
					case 'title':msg += '标题, ';break;
                    case 'icon':msg += '图标, '; break;
				}
			}
		}
		if (msg) {
            msg = msg.substr(0, msg.length - 2) + '为空';
            return msg;
        } else return '';
	}
	handleList(list) {
		let arr = []
		list.forEach(item => {
			delete item._id
		})
	    let l = list.length


	    for (let i = 0; i < l; i++) {
	        let target = list.shift()
	        if (!target.parent) {
	            arr.push(target)
	        } else {
	            let p = findArr(arr, target.parent)
	            if (p) {
	                p.children.push(target)
	            } else {
	                findList(target)
	            }
	        }
	    }
	    function findList(target) {
	        let t = null
	        list.forEach(item => {
	            if (item.id === target.parent) {
	                t = item
	            }
	        })
	        t && t.children.push(target)
	    }
	    function findArr(arrs, id) {
	        let t = null
	        arrs.forEach(item => {
	            if (item.id === id) {
	                t = item
	                return
	            }
	            if (item.children && item.children.length) {
	                t = findArr(item.children, id)
	            }
	        })
	        return t
	    }
	    return arr
	}
}

module.exports = M_menu
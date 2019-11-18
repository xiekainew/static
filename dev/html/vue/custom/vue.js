
function nodeContainer (node, vm, flag) {
	var flag = flag || document.createDocumentFragment();
	var child
	while (child = node.firstChild) {
		compile(child, vm)
		flag.appendChild(child)
		if (child.firstChild) {
			nodeContainer(child, vm, flag)
		}
	}
	return flag
}

// 编译
function compile(node, vm) {
	var reg = /\{\{(.*)\}\}/g
	if (node.nodeType === 1) {
		var attr = node.attributes
		for (var i = 0; i < attr.length; i++) {

			if (attr[i].nodeName == 'v-model') {
				var name = attr[i].nodeValue
				node.addEventListener('input', function(e) {

					vm[name] = e.target.value
				})
				node.value = vm[name]
				node.removeAttribute('v-model')
			}
		}
	}
	if (node.nodeType === 3) {
		if (reg.test(node.nodeValue)) {
			var name = RegExp.$1
			name = name.trim()

			new Watcher(vm, node, name)
		}
	}
}

function defineReactive (obj, key, value) {
	var dep = new Dep()
	Object.defineProperty(obj, key, {
		get: function() {
			console.log(Dep.global)
			if (Dep.global) {
				dep.add(Dep.global)
			}
			return value
		},
		set: function(newValue) {
			if (newValue === value) {
				return
			}
			value = newValue
			dep.notify()
		}
	})
}

function observe(obj, vm) {
	Object.keys(obj).forEach(function(key) {
		defineReactive(vm, key, obj[key])
	})
}

function Vue(options) {
	this.data = options.data
	var data = this.data

	observe(data, this)
	var id = options.el
	var dom = nodeContainer(document.getElementById(id), this)
	document.getElementById(id).appendChild(dom)
}

function Dep() {
	this.subs = []
}

Dep.prototype.add = function(sub) {
	this.subs.push(sub)
}
Dep.prototype.notify = function() {
	this.subs.forEach(function(sub) {
		sub.update()
	})
}
function Watcher(vm, node, name) {
	Dep.global = this
	this.name = name
	this.node = node
	this.vm = vm
	this.update()
	Dep.global = null
}
Watcher.prototype = {
	constructor: Watcher,
	update: function() {
		this.get()
		switch (this.node.nodeType) {
			case 1:
				this.node.value = this.value
				break;
			case 3:
				this.node.nodeValue = this.value
				break;
			default:
				break;
		}
	},
	get: function() {
		this.value = this.vm[this.name]
	}
}


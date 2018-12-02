class Wue {
    constructor (options) {
        const vm = this
        vm.$options = options
        vm.$watch = function (key, cb) {
            new Watcher(vm, key, cb)
        }
        initOptions(vm)
        let data = vm._data = vm.$options.data
        observer(vm._data)
        for (let key in vm._data) {
            proxy(vm, '_data', key)
        }
        callHook(vm, 'created')
        new Compiler(vm.$options.el, vm)
        callHook(vm, 'mounted')
    }
}

function observer (value) {
    if (!value || typeof value !== 'object') return
    return new Observer(value)
}
function proxy (target, sourceKey, key) {
    Object.defineProperty(target, key, {
        configurable: true,
        get: function proxyGetter () {
            return target[sourceKey][key]
        },
        set: function proxySetter (newVal) {
            target[sourceKey][key] = newVal
        }
    })
}
class Observer {
    constructor (value) {
        this.walk(value)
    }
    walk (obj) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object') {
                this.walk(obj[key])
            }
            defineReactive(obj, key, obj[key])
        })
    }

}
let defineReactive = (obj, key, value) => {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        set (newVal) {
            if (newVal === value) return
            value = newVal
            observer(newVal)
            dep.notify()
        },
        get () {
            if (Dep.target) {
                dep.addDepend()
            }
            return value
        }
    })
}
class Dep {
    constructor () {
        this.sub = []
    }
    addDepend () {
        Dep.target.addDep(this)
    }
    addSub (sub) {
        this.sub.push(sub)
    }
    notify () {
        console.log('this.sub', this.sub)
        for (let sub of this.sub) {
            sub.update()
        }
    }
}
Dep.target = null
const targetStack = []
function pushTarget (_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}
function popTarget () {
    Dep.target = targetStack.pop()
}

class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm
        this.cb = cb
        this.expression = expression
        this.value = this.getVal()
    }
    getVal () {
        pushTarget(this)
        let val = this.vm
        this.expression.split('.').forEach(key => {
            val = val[key]
        })
        popTarget()
        return val
    }
    addDep (dep) {
        dep.addSub(this)
    }
    update () {
        let val = this.vm
        this.expression.split('.').forEach(key => {
            val = val[key]
        })
        this.cb.call(this.vm, val, this.value)
    }
}
class Compiler {
    constructor (el, vm) {
        vm.$el = document.querySelector(el)
        this.replace(vm.$el, vm)
    }
    replace (frag, vm) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            // 正则匹配{{}}
            let reg = /\{\{(.*?)\}\}/g;
            // 如果是文本节点，且包含{{}}
            if (node.nodeType === 3 && reg.test(txt)) {
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];
                });
                node.textContent = txt.replace(reg, val).trim();
                vm.$watch(RegExp.$1, function (newVal) {
                    node.textContent = txt.replace(reg, newVal).trim();
                })
            }
            // 如果是元素节点
            if (node.nodeType === 1) {
                let nodeAttr = node.attributes;
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;
                    let exp = attr.value;
                    console.log('exp', exp)
                    // 如果是通过 v- 指令绑定的元素，则设置节点的value为绑定的相应的值
                    if (name.includes('v-')){
                        node.value = vm[exp];
                    }
                    // 监听变化
                    vm.$watch(exp, function(newVal) {
                        node.value = newVal;
                    });

                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        let arr = exp.split('.')
                        let val = vm;
                        // 考虑到 v-model="deep.a" 这种情况
                        arr.forEach((key, i)=> {
                            if (i === arr.length - 1) {
                                val[key] = newVal
                                return
                            }
                            val = val[key];
                        });
                    });
                });
            }

            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                this.replace(node, vm);
            }
        })
    }
}

function callHook (vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        handlers.call(vm)
    }
}

const LIFECYCLE_HOOKS = ['created', 'mounted']
function initOptions (vm) {
    let data = vm._data = vm.$options.data
    observer(vm._data)
    LIFECYCLE_HOOKS.forEach(hook => {
        vm.$options[hook] = vm.$options[hook] || function () {}
    })
}
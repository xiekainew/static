
class Hello {
    private _name: string
    get name ():string {
        return this._name
    }
    set name (newname: string) {
        if (newname.length > 3) {
            alert('长度不符')
            return
        }
        this._name = newname
    }
    tell () {
        return this.name
    }
}

var h = new Hello()
h.name = 'iwen'
console.log(h.tell())
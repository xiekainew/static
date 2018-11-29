class Run {
    constructor (type) {
        this.type = type
    }
    run () {
        switch (this.type) {
            case 'dog':
                console.log('run speed 50')
                break
            case 'mao':
                console.log('run speed 40')
                break
            case 'tu':
                console.log('run speed 60')
                break
            default:
                console.log('不知道跑多快')
        }
    }
    static set (type) {
        this.type = type
    }
}
let tracer = require('tracer')

let opts = {
    format : [
        "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
        {
            error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
        }
    ],
    dateformat : "yyyy-mm-dd'T'HH:MM:ss.L",
    preprocess :  function(data){
        data.title = data.title.toUpperCase();
    }
}
let logger = tracer.colorConsole(opts)
module.exports = logger
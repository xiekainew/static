/**
 *  Boolean, Number, String, Array, Enum, Any, Void
 */
var isBoon:boolean = true

function tell (){
    console.log(isBoon)
}
tell()

var height : number = 23
console.log(height)

var school : string = '北京大学'
console.log(school)

var list: number[] = [1, 2,3 ]
var list2: Array<string> = ['2', '3']
console.log(list)
console.log(list2)

enum Color {Red = 1, Green = 5, Blue}
var c:Color = Color.Blue
console.log(Color)
console.log(Color[2])
console.log(Color[5])
console.log(c)

var not:any = 10
not = 'sdf'
not = false
console.log(not)
var list3: any[] = [1, '3', false]
console.log(list3)

var vi : viod = function(){
    console.log('viod')
}
vi()
function say(): string{
    return 'say'
}
function sayNumber(): number{
    return 12
}
function vio(): viod{
    console.log('vio')
}
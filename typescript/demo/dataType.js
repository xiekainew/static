/**
 *  Boolean, Number, String, Array, Enum, Any, Void
 */
var isBoon = true;
function tell() {
    console.log(isBoon);
}
tell();
var height = 23;
console.log(height);
var school = '北京大学';
console.log(school);
var list = [1, 2, 3];
var list2 = ['2', '3'];
console.log(list);
console.log(list2);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color[Color["Blue"] = 6] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(Color);
console.log(Color[2]);
console.log(Color[5]);
console.log(c);
var not = 10;
not = 'sdf';
not = false;
console.log(not);
var list3 = [1, '3', false];
console.log(list3);
var vi = function () {
    console.log('viod');
};
vi();
function say() {
    return 'say';
}
function sayNumber() {
    return 12;
}
function vio() {
    console.log('vio');
}

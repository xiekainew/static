function add(x, y) {
    return x + y;
}
console.log(add(1, 3));
var myAdd = function (x, y) {
    return 'hee';
};
// var myAddTs:(name: string, age:number) => number = function (a: string, n: number): string {
//     return a + n + ''
// }
// console.log(myAddTs('wang', 12))
function buildName(fistName, lastName) {
    return fistName + ' ' + lastName;
}
var result1 = buildName('name', 'xiekai');
console.log(result1);
var re2 = buildName('fd');
console.log(re2);
function defaultName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'wang'; }
    return firstName + lastName;
}
console.log(defaultName('eang', 'eeee'));
function peopleName(fName) {
    var restName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restName[_i - 1] = arguments[_i];
    }
    return fName + restName.join(',');
}
console.log(peopleName('wang', 'r', 't', 't'));
// 关键字 箭头函数
var people = {
    name: ['wang', 'li', 'yang', 'xie'],
    getName: function () {
        var _this = this;
        return function () {
            // return function () {
            var i = Math.floor(Math.random() * 4);
            return {
                n: _this.name[i]
            };
        };
    }
};
var myName = people.getName();
console.log(myName().n);
function attr(nameage) {
    if (nameage && typeof nameage === 'string') {
        console.log('姓名');
    }
    else {
        console.log('年龄');
    }
}
attr('sdfh');
attr(23);

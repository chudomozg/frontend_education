"use strict";
document.addEventListener('DOMContentLoaded', function() {
    let calc = new Calculator;

    alert(calc.calculate("3 + 7")); // 10
});

function Calculator() {

    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b
    };

    this.calculate = function(str) {

        let split = str.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2]

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        return this.methods[op](a, b);
    }

    this.addMethod = function(name, func) {
        this.methods[name] = func;
    };
}

function copySorted(arr) {
    return arr.slice().sort();
}

function filterRangeInPlace(arr, a, b) {
    arr.forEach(function(item, index) {
        if (a >= item || item >= b)
            arr.splice(index, 1);
    })
}

function filterRange(arr, a, b) {
    return arr.filter(item => (a <= item && item <= b));
}

function camelize(str) {
    return str.split('-')
        .map((item, index) => index == 0 ? item : item[0].toUpperCase() + item.slice(1))
        .join('');
}


function sumInput() {
    let arr = [];
    let input;
    while (true) {
        input = prompt('введите число', 0);
        if (input === null || input === '' || !isFinite(input))
            break;
        arr.push(+input);
    }

    let sum = 0;
    for (let el of arr) {
        sum += el;
    }
    return sum;
}

function swapInCenter(arr, data) {
    let index = Math.floor(arr.length / 2);
    arr[index] = data;
    return arr;
}

function ucFirst(str) {
    str = str.trim();
    return str[0].toUpperCase() + str.substring(1, str.length);
}

function checkSpam(str) {
    str = str.toLowerCase();
    if (str.includes('xxx') || str.includes('viagra')) return true;
    return false;
}

function truncate(str, maxlength) {
    return (str.length > maxlength) ? (str.slice(0, maxlength - 1) + '...') : str;
}
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    let sources = [
        "https://en.js.cx/images-load/1.jpg",
        "https://en.js.cx/images-load/2.jpg",
        "https://en.js.cx/images-load/3.jpg"
    ];

    preloadImages(sources, function() {
        alert('Загружено!');
    })

});

function preloadImages(sources, callback) {
    let imgArray = sources.map(value => {
        let img = document.createElement('img');
        img.src = value;
        img.onload = callback();
        img.onerror = function() {
            alert("Ошибка во время загрузки изображения");
        };
        return img;
    });
}

function myGallery(element_selector) {
    let main = document.querySelector(`${element_selector} .gallery__main`);
    let element = document.querySelector(`${element_selector}`);
    let wrapper = document.querySelector(`.gallery_items-wrapper`);
    main.src = document.querySelector(`.gallery_items-wrapper__item_active`).src;

    wrapper.onclick = function(event) {
        if (event.target.tagName == 'IMG') {
            main.src = event.target.src;
        }
    }
}

function preventGoToLink() {
    let wrapper = document.querySelector('.preventDefaultLink');
    wrapper.onclick = function(event) {
        function handleLink(href) {
            let isLeaving = confirm(`Leave for ${href}?`);
            if (!isLeaving) return false;
        }

        let target = event.target.closest('a');

        if (target && wrapper.contains(target)) {
            return handleLink(target.getAttribute('href'));
        }
    }
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {
    let name = prompt("Введите логин?", "iliakan");

    try {
        let user = await loadJson(`https://api.github.com/users/${name}`)
        alert(`Полное имя: ${user.name}.`);
        return user;
    } catch (err) {
        if (err instanceof HttpError && err.response.status == 404) {
            alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
            return demoGithubUser();
        } else {
            throw err;
        }
    }
}

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response.status);
    }
}

function delayPromise(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}


class MyClock {
    constructor(template) {
        this.template = template;
        this.timer = 0;
    }
    render() {
        function getZeroBefore(number) {
            return (number < 10) ? '0' + number : number;
        }

        let date = new Date();
        let hours = getZeroBefore(date.getHours());
        let mins = getZeroBefore(date.getMinutes());
        let secs = getZeroBefore(date.getSeconds());
        let output = this.template.replace('h', hours).replace('m', mins).replace('s', secs);
        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    };

    start() {
        this.timer = setInterval(() => this.render(), 1000);
    };
}


function Clock({ template }) {

    let timer;

    function render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    this.stop = function() {
        clearInterval(timer);
    };

    this.start = function() {
        render();
        timer = setInterval(render, 1000);
    };

}

// let clock = new Clock({ template: 'h:m:s' });
// clock.start();



function delay(func, timeOut) {
    return function() {
        setTimeout(func.apply(this, arguments), timeOut);
    }
}

function bind(obj, func) {
    return function(...args) {
        return func.apply(obj, args);
    }
}

function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}


function makeCounter() {

    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    counter.set = function setter(value) {
        counter.count = value;
    }

    counter.decrease = function dec() {
        counter.count--;
    }

    return counter;
}

function byField(str) {
    return (a, b) => a[str] > b.str ? 1 : -1;
}

function inBetween(a, b) {
    return function(x) {
        return x >= a && x <= b;
    }
}

function inArray(arr) {
    return function(x) {
        return arr.includes(x);
    }
}

function getLocalDay(date) {
    let dayOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', ];
    alert(date.getDay());
    return dayOfWeek[date.getDay()];
}

function topSallery(obj) {
    let top = {};
    top.name = null;
    top.sal = 0;
    for (let [epname, sallery] of Object.entries(obj)) {
        if (sallery > top.sal) {
            top.sal = sallery;
            top.name = epname;
        }
    }
    return top.name;
}

function sumSalaries(obj) {
    let sum = 0;
    for (let val of Object.values(obj)) {
        sum += val;
    }
    return sum;
}

function countProp(obj) {
    return Object.keys(obj).length;
}

function aclean(arr) {
    let map = new Map();

    for (let el of arr) {
        let sorted = el.toLowerCase().split("").sort().join("");
        map.set(sorted, el)
    }

    return Array.from(map.values());
}

function unique(arr) {
    return Array.from(new Set(arr));
}

function getAverageAge(arr) {
    return arr.reduce((sum, item) => sum + item.age / arr.length, 0);
}

function shuffle(arr) {
    return arr.sort(() => (Math.random() - 0.5));
}

function sortByAge(users) {
    return users.sort((a, b) => a.age - b.age);
}

function arrObjToArrNames(arr) {
    // let names = [];
    // for (let user of arr) {
    //     names.push(user.name);
    // }
    // return names;

    return arr.map(item => item.name);
}

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
let u = (function() {
    let raf = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    let compose = function(f,g) { return function(x) { return f(g(x)); }; };
    let map = function(f) { return function(a) { return a.map(f); }; };
    let reduce = function(f) { return function(a) { return a.reduce(f); }; };
    let prop = function(n) { return function(o) { return o[n]; }; };
    let pluck = compose(map, prop);
    let toArray = function(al) { return Array.from(al); };

    let qsa = function(e) { return function(s) { return e.querySelectorAll(s); }; };
    let qsai = function(s) { return function(e) { return e.querySelectorAll(s); }; };
    let qsi = function(s) { return function(e) { return e.querySelector(s); }; };
    let qs = function(e) { return function(s) { return e.querySelector(s); }; };
    let dqsa = qsa(document);
    let dqs = qs(document);
    let dqsas = compose(toArray, dqsa);

    return {
        raf, ready,
        compose, map, reduce, prop, pluck, toArray,
        qsa, qsai, qsi, qs, dqsa, dqs, dqsas
    };
})();

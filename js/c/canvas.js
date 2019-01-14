let raf = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// utility functions
let u = (function() {
    let CANVAS_WIDTH = 1024;
    let CANVAS_HEIGHT = 768;
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

    let t = 0;
    function loop(fn, canvas, ctx) {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fn(canvas, ctx);
        raf(()=>{loop(fn,canvas,ctx)});
    }


    return {
        loop, ready,
        compose, map, reduce, prop, pluck, toArray,
        qsa, qsai, qsi, qs, dqsa, dqs, dqsas,
        w: CANVAS_WIDTH,
        h: CANVAS_HEIGHT
    };
})();

let m = (function() {
    let toRad = (d) => d * Math.PI / 180;
    let toDeg = (r) => r * 180 / Math.PI;
    let indexer = (w,s=0) => () => {
        s = (s+1)%w;
        return s;
    };

    return {
        toRad, toDeg,
        indexer
    };
})();

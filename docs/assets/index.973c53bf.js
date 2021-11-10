var ee=Object.defineProperty;var Y=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var Q=(i,e,s)=>e in i?ee(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s,T=(i,e)=>{for(var s in e||(e={}))te.call(e,s)&&Q(i,s,e[s]);if(Y)for(var s of Y(e))se.call(e,s)&&Q(i,s,e[s]);return i};import{n as ie,S as C,i as A,s as O,e as v,t as $,a as L,b as f,c as w,d as p,f as F,g as q,h as k,j as U,l as E,r as le,k as ne,m as re,u as ae,o as oe,p as ue,q as I,v as N,w as ce,x as M,y as z,z as G,A as j,B as J,C as D,M as H,D as P,E as ge}from"./vendor.2c4945e3.js";const fe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}};fe();const he=45,de=5,V=he+de;class S{constructor({life:e,x:s,y:l,top:t,left:n,right:r,bottom:o,alive:u=!1}){this.id=ie(),this.life=e,this._top=t,this._left=n,this._right=r,this._bottom=o,this.setPosition(s,l),this.alive=u,this.cache={}}get time(){return this.life.time}get element(){return document.getElementById(this.id)}set alive(e){e&&this._alive||(this._alive=e,e?this.create():this.die())}get alive(){return!!this._alive}get right(){return this.getOrGenerate([1,0])}get left(){return this.getOrGenerate([-1,0])}get bottom(){return this.getOrGenerate([0,1])}get top(){return this.getOrGenerate([0,-1])}getOrGenerate([e,s],l=!1){let t=`${e}${s}`;if(this.cache.time==this.time&&t in this.cache)return this.cache[t];let n=this.life.get(...this.getAbsoluteCoords([e,s]))||this.generateCell([e,s]);return this.cache.time!=this.time&&(this.cache={time:this.time}),this.cache[t]=n,n}get neighboors(){return[this.top.left,this.top,this.top.right,this.left,this.right,this.bottom.left,this.bottom,this.bottom.right]}get aliveNeighboors(){return this.neighboors.filter(e=>e.alive)}static check(e,s=!0){if(e.lastChecked==e.time)return;e.lastChecked=e.time;let l=e.alive?e.neighboors.map(n=>S.check(n,!1)):[],t;return e.alive&&(e.aliveNeighboors.length==2||e.aliveNeighboors.length==3)?t=void 0:!e.alive&&e.aliveNeighboors.length==3?t=()=>{e.alive=!0}:t=()=>{e.alive=!1},()=>{l.forEach(n=>n&&n()),t&&t()}}die(){this.life.kill(this)}create(){return this.life.create(this),this}setPosition(e=0,s=0){this.x=e,this.y=s}getAbsoluteCoords([e,s]){return[this.x+e*V,this.y+s*V]}generateCell([e,s],l=!1){return[e,s]=this.getAbsoluteCoords([e,s]),new S({life:this.life,x:e,y:s,alive:l}).create()}}class pe{constructor(){console.log("\u221E initated life..."),this.rows=new Map,this.time=42}get cells(){return[...this.rows.values()].reduce((e,s)=>[...e,...s.values()],[])}check(){return[...this.cells].map(s=>s.alive?S.check(s,!0):()=>s.die()).forEach(s=>s&&s()),this.time+=1,this}get(e,s){if(!!this.rows.has(e))return this.rows.get(e).get(s)}create(e){this.rows.has(e.x)||this.rows.set(e.x,new Map),this.rows.get(e.x).set(e.y,e)}kill(e){var s;(s=this.rows.get(e.x))==null||s.delete(e.y),this.rows.get(e.x)==0&&this.rows.delete(e.x)}}function _e(i){let e,s,l,t=i[0].filter(W).length+"",n,r,o,u,c=i[0].length+"",g;return{c(){e=v("div"),s=v("span"),l=$("Alive Cells: "),n=$(t),r=L(),o=v("span"),u=$("Cells In Memory: "),g=$(c),f(s,"class","svelte-15ndhqb"),f(o,"class","svelte-15ndhqb"),f(e,"class","svelte-15ndhqb")},m(h,_){w(h,e,_),p(e,s),p(s,l),p(s,n),p(e,r),p(e,o),p(o,u),p(o,g)},p(h,[_]){_&1&&t!==(t=h[0].filter(W).length+"")&&F(n,t),_&1&&c!==(c=h[0].length+"")&&F(g,c)},i:q,o:q,d(h){h&&k(e)}}}const W=i=>i.alive;function me(i,e,s){let{cells:l=[]}=e;return i.$$set=t=>{"cells"in t&&s(0,l=t.cells)},[l]}class ve extends C{constructor(e){super();A(this,e,me,_e,O,{cells:0})}}function be(i){let e,s,l,t,n,r,o,u,c,g,h=i[0].speed+"",_,b,d;return{c(){e=v("div"),s=v("span"),l=$(`Autoplay:
    `),t=v("input"),n=L(),r=v("span"),o=$(`Speed:
    `),u=v("input"),c=L(),g=v("span"),_=$(h),f(t,"type","checkbox"),f(t,"class","svelte-17nonxd"),f(s,"class","svelte-17nonxd"),f(u,"type","range"),f(u,"min","0"),f(u,"max","420"),f(u,"step","1"),f(g,"class","sub svelte-17nonxd"),f(r,"class","svelte-17nonxd"),f(e,"class","svelte-17nonxd")},m(m,a){w(m,e,a),p(e,s),p(s,l),p(s,t),t.checked=i[0].autoplay,p(e,n),p(e,r),p(r,o),p(r,u),U(u,i[0].speed),p(r,c),p(r,g),p(g,_),b||(d=[E(t,"change",i[1]),E(u,"change",i[2]),E(u,"input",i[2])],b=!0)},p(m,[a]){a&1&&(t.checked=m[0].autoplay),a&1&&U(u,m[0].speed),a&1&&h!==(h=m[0].speed+"")&&F(_,h)},i:q,o:q,d(m){m&&k(e),b=!1,le(d)}}}function ye(i,e,s){let l=JSON.parse(localStorage.getItem("settings")||"{}");const t=T({autoplay:!1,speed:0},l);function n(){t.autoplay=this.checked,s(0,t)}function r(){t.speed=ne(this.value),s(0,t)}return i.$$.update=()=>{i.$$.dirty&1&&localStorage.setItem("settings",JSON.stringify(t))},[t,n,r]}class we extends C{constructor(e){super();A(this,e,ye,be,O,{settings:0})}get settings(){return this.$$.ctx[0]}}function ke(i){let e,s,l,t,n;const r=i[5].default,o=re(r,i,i[4],null);return{c(){e=v("div"),o&&o.c(),f(e,"class",s=""+((i[2]?"dragging":"")+" "+(i[0]?"dragme":"")+" svelte-114yj5s"))},m(u,c){w(u,e,c),o&&o.m(e,null),i[6](e),l=!0,t||(n=E(e,"mousedown",i[3]),t=!0)},p(u,[c]){o&&o.p&&(!l||c&16)&&ae(o,r,u,u[4],l?ue(r,u[4],c,null):oe(u[4]),null),(!l||c&5&&s!==(s=""+((u[2]?"dragging":"")+" "+(u[0]?"dragme":"")+" svelte-114yj5s")))&&f(e,"class",s)},i(u){l||(I(o,u),l=!0)},o(u){N(o,u),l=!1},d(u){u&&k(e),o&&o.d(u),i[6](null),t=!1,n()}}}function $e(i,e,s){let{$$slots:l={},$$scope:t}=e,n,{draggable:r=!0}=e,o=!1;function u(){s(2,o=!!r)}ce(()=>{getComputedStyle(n);let g=!0,h=0,_=0;document.addEventListener("mousemove",b=>{!r||!o||!g||(g=!1,requestAnimationFrame(()=>{o&&(h=h+2*b.movementY,_=_+2*b.movementX,s(1,n.style.top=h+"px",n),s(1,n.style.left=_+"px",n)),g=!0}))}),document.addEventListener("mouseup",b=>{s(2,o=!1)})});function c(g){M[g?"unshift":"push"](()=>{n=g,s(1,n)})}return i.$$set=g=>{"draggable"in g&&s(0,r=g.draggable),"$$scope"in g&&s(4,t=g.$$scope)},i.$$.update=()=>{i.$$.dirty&2},[r,n,o,u,t,l,c]}class Se extends C{constructor(e){super();A(this,e,$e,ke,O,{draggable:0})}}function Z(i,e,s){const l=i.slice();return l[11]=e[s],l[4]=s,l}function R(i){let e,s,l;return{c(){e=v("div"),f(e,"class",s="cell "+(i[11].alive?"":"dead")+" svelte-vba4v4"),f(e,"id",l=i[11].id),P(e,"top",i[11].y+"px"),P(e,"left",i[11].x+"px")},m(t,n){w(t,e,n)},p(t,n){n&4&&s!==(s="cell "+(t[11].alive?"":"dead")+" svelte-vba4v4")&&f(e,"class",s),n&4&&l!==(l=t[11].id)&&f(e,"id",l),n&4&&P(e,"top",t[11].y+"px"),n&4&&P(e,"left",t[11].x+"px")},d(t){t&&k(e)}}}function Ce(i){let e,s=[...i[2]].filter(x),l=[];for(let t=0;t<s.length;t+=1)l[t]=R(Z(i,s,t));return{c(){e=v("div");for(let t=0;t<l.length;t+=1)l[t].c();f(e,"id","canvas"),f(e,"class","svelte-vba4v4")},m(t,n){w(t,e,n);for(let r=0;r<l.length;r+=1)l[r].m(e,null)},p(t,n){if(n&4){s=[...t[2]].filter(x);let r;for(r=0;r<s.length;r+=1){const o=Z(t,s,r);l[r]?l[r].p(o,n):(l[r]=R(o),l[r].c(),l[r].m(e,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=s.length}},d(t){t&&k(e),ge(l,t)}}}function Ae(i){let e,s,l,t,n,r,o,u,c;function g(a){i[5](a)}let h={$$slots:{default:[Ce]},$$scope:{ctx:i}};i[1]!==void 0&&(h.draggable=i[1]),e=new Se({props:h}),M.push(()=>z(e,"draggable",g));function _(a){i[6](a)}let b={class:"stats"};i[2]!==void 0&&(b.cells=i[2]),t=new ve({props:b}),M.push(()=>z(t,"cells",_));function d(a){i[7](a)}let m={class:"settings"};return i[0]!==void 0&&(m.settings=i[0]),o=new we({props:m}),M.push(()=>z(o,"settings",d)),{c(){G(e.$$.fragment),l=L(),G(t.$$.fragment),r=L(),G(o.$$.fragment)},m(a,y){j(e,a,y),w(a,l,y),j(t,a,y),w(a,r,y),j(o,a,y),c=!0},p(a,[y]){const B={};y&8196&&(B.$$scope={dirty:y,ctx:a}),!s&&y&2&&(s=!0,B.draggable=a[1],J(()=>s=!1)),e.$set(B);const K={};!n&&y&4&&(n=!0,K.cells=a[2],J(()=>n=!1)),t.$set(K);const X={};!u&&y&1&&(u=!0,X.settings=a[0],J(()=>u=!1)),o.$set(X)},i(a){c||(I(e.$$.fragment,a),I(t.$$.fragment,a),I(o.$$.fragment,a),c=!0)},o(a){N(e.$$.fragment,a),N(t.$$.fragment,a),N(o.$$.fragment,a),c=!1},d(a){D(e,a),a&&k(l),D(t,a),a&&k(r),D(o,a)}}}const x=i=>!0;function Oe(i,e,s){let l,t=new pe,n={},r=!1;function o(d,m){let a=new S({life:t,alive:!0,x:d,y:m});a.right.alive=!0,a.bottom.alive=!0,a.bottom.bottom.alive=!0,a.bottom.bottom.bottom.alive=!0,a.top.alive=!0,a.left.alive=!0}o(200,200),o(400,400),o(400,200),o(800,200),o(800,400),o(800,800);function u(d,m){let a=new S({life:t,alive:!0,x:d,y:m});a.bottom.alive=!0,a.bottom.right.alive=!0,a.bottom.right.right.alive=!0,a.bottom.right.bottom.alive=!0,a.bottom.right.right.alive=!0,a.bottom.right.right.top.alive=!0,a.bottom.right.right.top.right.alive=!0}u(2500,500),o(2800,1800),H.bind("right",function(d){s(3,t=t.check())}),H.bind("space",function(d){return s(1,r=!0),!1},"keydown"),H.bind("space",function(d){return s(1,r=!1),!1},"keyup");let c;function g(d=1){c&&clearInterval(c),d!=0&&s(4,c=setInterval(()=>{requestAnimationFrame(()=>{s(3,t=t.check())})},1e3/d))}function h(d){r=d,s(1,r)}function _(d){l=d,s(2,l),s(3,t)}function b(d){n=d,s(0,n)}return i.$$.update=()=>{i.$$.dirty&8&&s(2,l=t.cells),i.$$.dirty&17&&(n.autoplay?g(n.speed/10):clearInterval(c))},[n,r,l,t,c,h,_,b]}class Le extends C{constructor(e){super();A(this,e,Oe,Ae,O,{})}}function qe(i){let e,s,l;return s=new Le({}),{c(){e=v("main"),G(s.$$.fragment),f(e,"class","svelte-ihohq2")},m(t,n){w(t,e,n),j(s,e,null),l=!0},p:q,i(t){l||(I(s.$$.fragment,t),l=!0)},o(t){N(s.$$.fragment,t),l=!1},d(t){t&&k(e),D(s)}}}class Ie extends C{constructor(e){super();A(this,e,null,qe,O,{})}}new Ie({target:document.getElementById("app")});
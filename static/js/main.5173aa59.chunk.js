(this.webpackJsonpview=this.webpackJsonpview||[]).push([[0],{23:function(e,t,n){},57:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),s=n(16),a=n.n(s),i=(n(23),n(3)),o=n(4),u=n(12),l=n.n(u),h=n(17),j=n(2),b=n(18),d=n(5),f=n.n(d),p=(n(57),n(0)),O=1613967115931,m=f()((function(e){var t=e.match(/(\d)+H/),n=t&&parseInt(t[1])||0,c=e.match(/(\d)+M/),r=c&&parseInt(c[1])||0,s=e.match(/(\d)+D/);return{hours:n,minutes:r,days:s&&parseInt(s[1])||0}})),v={_$_$:!1,$_$_:!0,$__$:!1,$_0_:!1,$_$2_:!1,$_$$_:!1,$_11$:!1,$__$_:!1,$o1$:!1,$e1$:!1},g=["bl","br","ch","cl","cr","dr","fl","fr","gl","gr","ph","pl","pr","qu","sc","sh","sl","sm","sn","sp","st","sw","th","tr","tw","wh","wr"],x=["ch","ck","gh","lt","st","th","sk","sh","sm","sp","ph","ng"],$=f()((function(e,t){e=e.replace(".com","");for(var n=0,c=0;c<e.length;c++,n++){if(n>=t.length)return!1;var r=e[c],s=t[n];if("$"===s)if(0===c){var a=e.substr(c,2);if(g.includes(a)){c++;continue}}else{var i=e.substr(c,2);if(x.includes(i)){c++;continue}}if("*"!==s)if("$"===s){if(!L(r))return!1}else if("_"===s){if(!k(r))return!1}else if(/[0-9]/.test(s)){if(r!==e[Number(s)])return!1}else if(r!==s)return!1}return!0})),w=6e4,_=36e5,N=24*_,y=f()((function(e){var t=e.gathered||O,n=m(e.timeLeft),c=n.hours,r=n.minutes,s=t+n.days*N+c*_+r*w;return Date.now()>s})),S=f()((function(e){var t=e.gathered||O,n=m(e.timeLeft),c=n.hours,r=n.minutes,s=t+n.days*N+c*_+r*w,a=Date.now()-s,i=Math.abs;return{hoursLeft:i(a%N/_|0),minutesLeft:i(a%_/w|0),daysLeft:i(a/N|0)}})),k=function(e){return 1===e.length&&["a","e","i","o","u","y"].includes(e)},L=function(e){return!k(e)};var C=function(){var e=Object(c.useState)(1e4),t=Object(j.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(""),a=Object(j.a)(s,2),u=a[0],d=a[1],f=Object(c.useState)((function(){return localStorage.patterns?JSON.parse(localStorage.patterns):v})),O=Object(j.a)(f,2),m=O[0],g=O[1],x=function(e){localStorage.patterns=JSON.stringify(e),g(e)},w=Object(c.useState)(!1),_=Object(j.a)(w,2),N=_[0],k=_[1],L=Object(c.useState)([]),C=Object(j.a)(L,2),A=C[0],I=C[1];Object(c.useEffect)((function(){Object(h.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/gd-scrape/domains.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,I(n);case 7:case"end":return e.stop()}}),e)})))()}),[]);for(var D=[],F=0,J=Object.entries(m);F<J.length;F++){var M=Object(j.a)(J[F],2),P=M[0];M[1]&&D.push(P)}var H=A.slice(0,1e4).filter((function(e){var t=e.name,c=e.price;return console.log("filtering"),D.some((function(e){return $(t,e)}))&&function(e){var t,n=e.split(""),c=[],r=Object(b.a)(n);try{for(r.s();!(t=r.n()).done;){var s=t.value;/[0-9]/.test(s)&&c.push(s)}}catch(a){r.e(a)}finally{r.f()}return Number(c.join(""))}(c)<Number(n)&&!y(e)}));return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsxs)("label",{className:"price-limit",children:["price limit: ",Object(p.jsx)("input",{value:n,onChange:function(e){Number.isNaN(Number(e.target.value))||r(e.target.value)}})]}),Object(p.jsxs)("label",{className:"new-pattern",children:["new pattern: ",Object(p.jsx)("input",{value:u,onChange:function(e){d(e.target.value)}})]}),Object(p.jsxs)("div",{className:"btns",children:[Object(p.jsx)("button",{className:"add-new-pattern",onClick:function(){x(Object(o.a)(Object(o.a)({},m),{},Object(i.a)({},u,!0))),d("")},children:"Add Pattern"}),Object(p.jsx)("button",{className:"explanation",onClick:function(){k(!N)},children:"How Patterns Work"})]}),N?Object(p.jsxs)("div",{children:[Object(p.jsx)("p",{children:"A '$' represents a consonant. This includes consonant digraphs (th, st, etc.)"}),Object(p.jsx)("p",{children:"A '_' represents a vowel."}),Object(p.jsx)("p",{children:"Any letter represents itself."}),Object(p.jsx)("p",{children:"A number represents the 0-indexed character in the string. So, for a domain that's all the same letter, I would make the pattern '$000', that's consonant, then the same consonant, then the same consonant, then the same consonant, e.g. cccc."}),Object(p.jsx)("p",{children:"A '*' can represent any character."})]}):"",Object(p.jsx)("div",{className:"patterns",children:Object.entries(m).map((function(e){var t=Object(j.a)(e,2),n=t[0],c=t[1];return Object(p.jsxs)("label",{onClick:function(){x(Object(o.a)(Object(o.a)({},m),{},Object(i.a)({},n,!c)))},children:[Object(p.jsx)("input",{type:"checkbox",checked:c}),n]})}))}),Object(p.jsx)("table",{children:Object(p.jsx)("tbody",{children:H.map((function(e){var t=S(e),n=t.daysLeft,c=t.minutesLeft,r=t.hoursLeft;return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.name}),Object(p.jsx)("td",{children:e.price}),Object(p.jsxs)("td",{children:[n?"".concat(n,"D "):"",r?"".concat(r,"H "):"",c?"".concat(c,"M "):""]})]})}))})})]})};window.WebSocket=void 0;var A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,60)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};a.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root")),A()}},[[59,1,2]]]);
//# sourceMappingURL=main.5173aa59.chunk.js.map
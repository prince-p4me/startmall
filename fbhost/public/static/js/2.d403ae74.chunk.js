(this["webpackJsonphello-ionic"]=this["webpackJsonphello-ionic"]||[]).push([[2],{591:function(e,t,n){"use strict";n.r(t),n.d(t,"startInputShims",(function(){return y}));var r=n(3),o=n.n(r),i=n(6),a=n(40),u=new WeakMap,c=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;u.has(e)!==n&&(n?l(e,t,r):d(e,t))},s=function(e){return e===e.getRootNode().activeElement},l=function(e,t,n){var r=t.parentNode,o=t.cloneNode(!1);o.classList.add("cloned-input"),o.tabIndex=-1,r.appendChild(o),u.set(e,o);var i="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform="translate3d(".concat(i,"px,").concat(n,"px,0) scale(0)")},d=function(e,t){var n=u.get(e);n&&(u.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},f=function(e,t,n){if(!n||!t)return function(){};var r=function(n){s(t)&&c(e,t,n)},o=function(){return c(e,t,!1)},i=function(){return r(!0)},a=function(){return r(!1)};return n.addEventListener("ionScrollStart",i),n.addEventListener("ionScrollEnd",a),t.addEventListener("blur",o),function(){n.removeEventListener("ionScrollStart",i),n.removeEventListener("ionScrollEnd",a),t.addEventListener("ionBlur",o)}},v="input, textarea, [no-blur]",p=function(e,t,n,r){var o=e.top,i=e.bottom,a=t.top,u=a+15,c=.5*Math.min(t.bottom,r-n)-i,s=u-o,l=Math.round(c<0?-c:s>0?-s:0),d=Math.min(l,o-a),f=Math.abs(d)/.3;return{scrollAmount:d,scrollDuration:Math.min(400,Math.max(150,f)),scrollPadding:n,inputSafeY:4-(o-u)}},m=function(e,t,n,r){var o,i=function(e){o=Object(a.j)(e)},u=function(i){if(o){var u=Object(a.j)(i);E(6,o,u)||s(t)||(i.preventDefault(),i.stopPropagation(),h(e,t,n,r))}};return e.addEventListener("touchstart",i,!0),e.addEventListener("touchend",u,!0),function(){e.removeEventListener("touchstart",i,!0),e.removeEventListener("touchend",u,!0)}},h=function(e,t,n,r){var a=function(e,t,n){var r=e.closest("ion-item,[ion-item]")||e;return p(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)}(e,n,r);if(Math.abs(a.scrollAmount)<4)t.focus();else if(c(e,t,!0,a.inputSafeY),t.focus(),"undefined"!==typeof window){var u,s=function(){var r=Object(i.a)(o.a.mark((function r(){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return void 0!==u&&clearTimeout(u),window.removeEventListener("resize",s),r.next=4,n.scrollByPoint(0,a.scrollAmount,a.scrollDuration);case 4:c(e,t,!1,a.inputSafeY),t.focus();case 6:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();window.addEventListener("resize",s),u=setTimeout(s,1e3)}},E=function(e,t,n){if(t&&n){var r=t.x-n.x,o=t.y-n.y;return r*r+o*o>e*e}return!1},g=function(e,t){if("INPUT"===e.tagName&&(!e.parentElement||"ION-INPUT"!==e.parentElement.tagName)&&(!e.parentElement||!e.parentElement.parentElement||"ION-SEARCHBAR"!==e.parentElement.parentElement.tagName)){var n=e.closest("ion-content");if(null!==n){var r=n.$ionPaddingTimer;r&&clearTimeout(r),t>0?n.style.setProperty("--keyboard-offset","".concat(t,"px")):n.$ionPaddingTimer=setTimeout((function(){n.style.setProperty("--keyboard-offset","0px")}),120)}}},y=function(e){var t=document,n=e.getNumber("keyboardHeight",290),r=e.getBoolean("scrollAssist",!0),a=e.getBoolean("hideCaretOnScroll",!0),u=e.getBoolean("inputBlurring",!0),c=e.getBoolean("scrollPadding",!0),s=Array.from(t.querySelectorAll("ion-input, ion-textarea")),l=new WeakMap,d=new WeakMap,p=function(){var e=Object(i.a)(o.a.mark((function e(t){var i,u,c,s,v;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.componentOnReady){e.next=3;break}return e.next=3,t.componentOnReady();case 3:if(i=t.shadowRoot||t,u=i.querySelector("input")||i.querySelector("textarea"),c=t.closest("ion-content"),u){e.next=8;break}return e.abrupt("return");case 8:c&&a&&!l.has(t)&&(s=f(t,u,c),l.set(t,s)),c&&r&&!d.has(t)&&(v=m(t,u,c,n),d.set(t,v));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();u&&function(){var e=!0,t=!1,n=document,r=function(){t=!0},o=function(){e=!0},i=function(r){if(t)t=!1;else{var o=n.activeElement;if(o&&!o.matches(v)){var i=r.target;i!==o&&(i.matches(v)||i.closest(v)||(e=!1,setTimeout((function(){e||o.blur()}),50)))}}};n.addEventListener("ionScrollStart",r),n.addEventListener("focusin",o,!0),n.addEventListener("touchend",i,!1)}(),c&&function(e){var t=document,n=function(t){g(t.target,e)},r=function(e){g(e.target,0)};t.addEventListener("focusin",n),t.addEventListener("focusout",r)}(n);for(var h=0,E=s;h<E.length;h++){var y=E[h];p(y)}t.addEventListener("ionInputDidLoad",(function(e){p(e.detail)})),t.addEventListener("ionInputDidUnload",(function(e){!function(e){if(a){var t=l.get(e);t&&t(),l.delete(e)}if(r){var n=d.get(e);n&&n(),d.delete(e)}}(e.detail)}))}}}]);
//# sourceMappingURL=2.d403ae74.chunk.js.map
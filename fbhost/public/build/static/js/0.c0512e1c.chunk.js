(this["webpackJsonphello-ionic"]=this["webpackJsonphello-ionic"]||[]).push([[0],{588:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return a}));var r=n(40),i=n(189),a=function(t,e,n,a,o){var c=t.ownerDocument.defaultView;return Object(i.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/c.innerWidth;a(e)},onEnd:function(t){var e=t.deltaX,n=c.innerWidth,i=e/n,a=t.velocityX,u=n/2,s=a>=0&&(a>.2||t.deltaX>u),h=(s?1-i:i)*n,l=0;if(h>5){var d=h/Math.abs(a);l=Math.min(d,540)}o(s,i<=0?.01:Object(r.c)(0,i,.9999),l)}})}}}]);
//# sourceMappingURL=0.c0512e1c.chunk.js.map
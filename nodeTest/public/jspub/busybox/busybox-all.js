var BBDN=function(){return{util:{},core:{}}}();var YAHOO=function(){return{util:{},widget:{},example:{},namespace:function(a){if(!a||!a.length)return null;a=a.split(".");for(var b=YAHOO,c="YAHOO"==a[0]?1:0;c<a.length;++c)b[a[c]]=b[a[c]]||{},b=b[a[c]];return b}}}();YAHOO.util.Dom=new function(){this.get=function(a){"string"==typeof a&&(a=document.getElementById(a));return a};this.getStyle=function(a,b){var c=null,d=document.defaultView;a=this.get(a);if("opacity"==b&&a.filters){c=1;try{c=a.filters.item("DXImageTransform.Microsoft.Alpha").opacity/100}catch(f){try{c=a.filters.item("alpha").opacity/100}catch(g){}}}else if(a.style[b])c=a.style[b];else if(a.currentStyle&&a.currentStyle[b])c=a.currentStyle[b];else if(d&&d.getComputedStyle){var k="";i=0;for(len=b.length;i<
len;++i)k=b.charAt(i)==b.charAt(i).toUpperCase()?k+"-"+b.charAt(i).toLowerCase():k+b.charAt(i);d.getComputedStyle(a,"").getPropertyValue(k)&&(c=d.getComputedStyle(a,"").getPropertyValue(k))}return c};this.setStyle=function(a,b,c){a=this.get(a);switch(b){case "opacity":a.filters?(a.style.filter="alpha(opacity="+100*c+")",a.currentStyle.hasLayout||(a.style.zoom=1)):(a.style.opacity=c,a.style["-moz-opacity"]=c,a.style["-khtml-opacity"]=c);break;default:a.style[b]=c}};this.getXY=function(a){a=this.get(a);
if(null===a.parentNode||"none"==this.getStyle(a,"display"))return!1;var b=null,c=[];if(a.getBoundingClientRect)return c=a.getBoundingClientRect(),[c.left+(document.documentElement.scrollLeft||document.body.scrollLeft),c.top+(document.documentElement.scrollTop||document.body.scrollTop)];if(document.getBoxObjectFor)c=document.getBoxObjectFor(a),c=[c.x,c.y];else{c=[a.offsetLeft,a.offsetTop];b=a.offsetParent;if(b!=a)for(;b;)c[0]+=b.offsetLeft,c[1]+=b.offsetTop,b=b.offsetParent;b=navigator.userAgent.toLowerCase();
if(-1!=b.indexOf("opera")||-1!=b.indexOf("safari")&&"absolute"==this.getStyle(a,"position"))c[1]-=document.body.offsetTop}for(b=a.parentNode?a.parentNode:null;b&&"BODY"!=b.tagName&&"HTML"!=b.tagName;)c[0]-=b.scrollLeft,c[1]-=b.scrollTop,b=b.parentNode?b.parentNode:null;return c};this.getX=function(a){return this.getXY(a)[0]};this.getY=function(a){return this.getXY(a)[1]};this.setXY=function(a,b,c){a=this.get(a);var d=YAHOO.util.Dom.getXY(a);if(!1===d)return!1;"static"==this.getStyle(a,"position")&&
this.setStyle(a,"position","relative");var f=[parseInt(YAHOO.util.Dom.getStyle(a,"left"),10),parseInt(YAHOO.util.Dom.getStyle(a,"top"),10)];isNaN(f[0])&&(f[0]=0);isNaN(f[1])&&(f[1]=0);null!==b[0]&&(a.style.left=b[0]-d[0]+f[0]+"px");null!==b[1]&&(a.style.top=b[1]-d[1]+f[1]+"px");d=this.getXY(a);c||d[0]==b[0]&&d[1]==b[1]||this.setXY(a,b,!0);return!0};this.setX=function(a,b){return this.setXY(a,[b,null])};this.setY=function(a,b){return this.setXY(a,[null,b])};this.getRegion=function(a){a=this.get(a);
return new YAHOO.util.Region.getRegion(a)};this.getClientWidth=function(){return document.documentElement.offsetWidth||document.body.offsetWidth};this.getClientHeight=function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}};YAHOO.util.Region=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};YAHOO.util.Region.prototype.contains=function(a){return a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom};
YAHOO.util.Region.prototype.getArea=function(){return(this.bottom-this.top)*(this.right-this.left)};YAHOO.util.Region.prototype.intersect=function(a){var b=Math.max(this.top,a.top),c=Math.min(this.right,a.right),d=Math.min(this.bottom,a.bottom);a=Math.max(this.left,a.left);return d>=b&&c>=a?new YAHOO.util.Region(b,c,d,a):null};
YAHOO.util.Region.prototype.union=function(a){var b=Math.min(this.top,a.top),c=Math.max(this.right,a.right),d=Math.max(this.bottom,a.bottom);a=Math.min(this.left,a.left);return new YAHOO.util.Region(b,c,d,a)};YAHOO.util.Region.prototype.toString=function(){return"Region {  t: "+this.top+", r: "+this.right+", b: "+this.bottom+", l: "+this.left+"}"};YAHOO.util.Region.getRegion=function(a){var b=YAHOO.util.Dom.getXY(a);return new YAHOO.util.Region(b[1],b[0]+a.offsetWidth,b[1]+a.offsetHeight,b[0])};
YAHOO.util.Point=function(a,b){this.x=a;this.top=this.y=b;this.right=a;this.bottom=b;this.left=a};YAHOO.util.Point.prototype=new YAHOO.util.Region;YAHOO.util.CustomEvent=function(a,b){this.type=a;this.scope=b||window;this.subscribers=[];YAHOO.util.Event&&YAHOO.util.Event.regCE(this)};
YAHOO.util.CustomEvent.prototype={subscribe:function(a,b,c){this.subscribers.push(new YAHOO.util.Subscriber(a,b,c))},unsubscribe:function(a,b){for(var c=!1,d=0;d<this.subscribers.length;++d){var f=this.subscribers[d];f&&f.contains(a,b)&&(this._delete(d),c=!0)}return c},fire:function(){for(var a=0;a<this.subscribers.length;++a){var b=this.subscribers[a];b&&b.fn.call(b.override?b.obj:this.scope,this.type,arguments,b.obj)}},unsubscribeAll:function(){for(var a=0;a<this.subscribers.length;++a)this._delete(a)},
_delete:function(a){var b=this.subscribers[a];b&&(delete b.fn,delete b.obj);delete this.subscribers[a]}};YAHOO.util.Subscriber=function(a,b,c){this.fn=a;this.obj=b||null;this.override=c};YAHOO.util.Subscriber.prototype.contains=function(a,b){return this.fn==a&&this.obj==b};
if(!YAHOO.util.Event){YAHOO.util.Event=function(){var a=!1,b=[],c=[],d=[],f=[],g=[],k=[];return{EL:0,TYPE:1,FN:2,WFN:3,SCOPE:3,ADJ_SCOPE:4,isSafari:navigator.userAgent.match(/safari/gi),isIE:!this.isSafari&&navigator.userAgent.match(/msie/gi),addListener:function(h,n,m,l,f){if(this._isValidCollection(h)){for(var r=!0,s=0;s<h.length;++s)r=this.on(h[s],n,m,l,f)&&r;return r}if("string"==typeof h)if(a)h=this.getEl(h);else return c[c.length]=[h,n,m,l,f],!0;if(!h)return!1;if("unload"==n&&l!==this)return d[d.length]=
[h,n,m,l,f],!0;var t=f?l:h;f=function(a){return m.call(t,YAHOO.util.Event.getEvent(a),l)};r=b.length;b[r]=[h,n,m,f,t];if(this.useLegacyEvent(h,n)){var p=this.getLegacyIndex(h,n);-1==p&&(p=g.length,g[p]=[h,n,h["on"+n]],k[p]=[],h["on"+n]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),p)});k[p].push(r)}else h.addEventListener?h.addEventListener(n,f,!1):h.attachEvent&&h.attachEvent("on"+n,f);return!0},fireLegacyEvent:function(a,c){var d=!0,l=k[c];for(i=0;i<l.length;++i){var f=
l[i];f&&(f=b[f],f=f[this.WFN].call(f[this.ADJ_SCOPE],a),d=d&&f)}return d},getLegacyIndex:function(a,b){for(var c=0;c<g.length;++c){var d=g[c];if(d&&d[0]==a&&d[1]==b)return c}return-1},useLegacyEvent:function(a,b){return!a.addEventListener&&!a.attachEvent||"click"==b&&this.isSafari},removeListener:function(a,c,d){if("string"==typeof a)a=this.getEl(a);else if(this._isValidCollection(a)){for(var f=!0,g=0;g<a.length;++g)f=this.removeListener(a[g],c,d)&&f;return f}f=null;d=this._getCacheIndex(a,c,d);0<=
d&&(f=b[d]);if(!a||!f)return!1;a.removeEventListener?a.removeEventListener(c,f[this.WFN],!1):a.detachEvent&&a.detachEvent("on"+c,f[this.WFN]);delete b[d][this.WFN];delete b[d][this.FN];delete b[d];return!0},getTarget:function(a,b){var c=a.target||a.srcElement;return b&&c&&"#text"==c.nodeName?c.parentNode:c},getPageX:function(a){var b=a.pageX;b||0===b||(b=a.clientX||0,this.isIE&&(b+=this._getScrollLeft()));return b},getPageY:function(a){var b=a.pageY;b||0===b||(b=a.clientY||0,this.isIE&&(b+=this._getScrollTop()));
return b},getRelatedTarget:function(a){var b=a.relatedTarget;b||("mouseout"==a.type?b=a.toElement:"mouseover"==a.type&&(b=a.fromElement));return b},getTime:function(a){if(!a.time){var b=(new Date).getTime();try{a.time=b}catch(c){return b}}return a.time},stopEvent:function(a){this.stopPropagation(a);this.preventDefault(a)},stopPropagation:function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},getEvent:function(a){a=
a||window.event;if(!a)for(var b=this.getEvent.caller;b&&(!(a=b.arguments[0])||Event!=a.constructor);)b=b.caller;return a},getCharCode:function(a){return a.charCode||"keypress"==a.type?a.keyCode:0},_getCacheIndex:function(a,c,d){for(var f=0;f<b.length;++f){var g=b[f];if(g&&g[this.FN]==d&&g[this.EL]==a&&g[this.TYPE]==c)return f}return-1},_isValidCollection:function(a){return a&&a.length&&"string"!=typeof a&&!a.tagName&&!a.alert&&"undefined"!=typeof a[0]},elCache:{},getEl:function(a){return document.getElementById(a)},
clearCache:function(){for(i in this.elCache)delete this.elCache[i]},regCE:function(a){f.push(a)},_load:function(b){a=!0},_tryPreloadAttach:function(){for(var b=!a,d=0;d<c.length;++d){var f=c[d];if(f){var l=this.getEl(f[this.EL]);l&&(this.on(l,f[this.TYPE],f[this.FN],f[this.SCOPE],f[this.ADJ_SCOPE]),delete c[d])}}b&&setTimeout("YAHOO.util.Event._tryPreloadAttach()",50)},_unload:function(a,c){for(var m=0;m<d.length;++m){var l=d[m];l&&l[this.FN].call(l[this.ADJ_SCOPE]?l[this.SCOPE]:window,this.getEvent(a),
l[this.SCOPE])}if(b&&0<b.length){for(m=0;m<b.length;++m)(l=b[m])&&this.removeListener(l[this.EL],l[this.TYPE],l[this.FN]);this.clearCache()}for(m=0;m<f.length;++m)f[m].unsubscribeAll(),delete f[m];for(m=0;m<g.length;++m)delete g[m][0],delete g[m]},_getScrollLeft:function(){return this._getScroll()[1]},_getScrollTop:function(){return this._getScroll()[0]},_getScroll:function(){var a=document.documentElement;db=document.body;return a&&a.scrollTop?[a.scrollTop,a.scrollLeft]:db?[db.scrollTop,db.scrollLeft]:
[0,0]}}}();YAHOO.util.Event.on=YAHOO.util.Event.addListener;if(document&&document.body)YAHOO.util.Event._load();else YAHOO.util.Event.on(window,"load",YAHOO.util.Event._load,YAHOO.util.Event,!0);YAHOO.util.Event.on(window,"unload",YAHOO.util.Event._unload,YAHOO.util.Event,!0);YAHOO.util.Event._tryPreloadAttach()};YAHOO.util.Anim=function(a,b,c,d){a&&this.init(a,b,c,d)};
YAHOO.util.Anim.prototype={doMethod:function(a,b,c){return this.method(this.currentFrame,b,c-b,this.totalFrames)},setAttribute:function(a,b,c){YAHOO.util.Dom.setStyle(this.getEl(),a,b+c)},getAttribute:function(a){return parseFloat(YAHOO.util.Dom.getStyle(this.getEl(),a))},defaultUnits:{opacity:" "},defaultUnit:"px",init:function(a,b,c,d){var f=!1,g=null,k=null,h=0,n={};a=YAHOO.util.Dom.get(a);this.attributes=b||{};this.duration=c||1;this.method=d||YAHOO.util.Easing.easeNone;this.useSeconds=!0;this.currentFrame=
0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.getEl=function(){return a};this.setDefault=function(b,c){if("auto"==c)switch(b){case "width":c=a.clientWidth||a.offsetWidth;break;case "height":c=a.clientHeight||a.offsetHeight;break;case "left":c="absolute"==YAHOO.util.Dom.getStyle(a,"position")?a.offsetLeft:0;break;case "top":c="absolute"==YAHOO.util.Dom.getStyle(a,"position")?a.offsetTop:0;break;default:c=0}n[b]=c};this.getDefault=function(a){return n[a]};this.isAnimated=function(){return f};this.getStartTime=
function(){return g};this.animate=function(){this.onStart.fire();this._onStart.fire();this.totalFrames=this.useSeconds?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;YAHOO.util.AnimMgr.registerElement(this);var a=this.attributes;this.getEl();for(var b in a)a=this.getAttribute(b),this.setDefault(b,a);f=!0;h=0;g=new Date};this.stop=function(){this.currentFrame=0;k=new Date;var a={time:k,duration:k-g,frames:h,fps:h/this.duration};f=!1;h=0;this.onComplete.fire(a)};this._onStart=new YAHOO.util.CustomEvent("_onStart",
this);this.onStart=new YAHOO.util.CustomEvent("start",this);this.onTween=new YAHOO.util.CustomEvent("tween",this);this._onTween=new YAHOO.util.CustomEvent("_tween",this);this.onComplete=new YAHOO.util.CustomEvent("complete",this);this._onTween.subscribe(function(){var a,b=null,c,d=this.attributes,f;for(f in d)c=d[f].unit||this.defaultUnits[f]||this.defaultUnit,a="undefined"!=typeof d[f].from?d[f].from:this.getDefault(f),"undefined"!=typeof d[f].to?b=d[f].to:"undefined"!=typeof d[f].by&&(b=a+d[f].by),
null!==b&&"undefined"!=typeof b&&(a=this.doMethod(f,a,b),("width"==f||"height"==f||"opacity"==f)&&0>a&&(a=0),this.setAttribute(f,a,c));h+=1})}};
YAHOO.util.AnimMgr=new function(){var a=null,b=[],c=0;this.fps=200;this.delay=1;this.registerElement=function(a){if(a.isAnimated())return!1;b[b.length]=a;c+=1;this.start()};this.start=function(){null===a&&(a=setInterval(this.run,this.delay))};this.stop=function(d){if(d)d.stop(),--c,0>=c&&this.stop();else{clearInterval(a);d=0;for(var f=b.length;d<f;++d)b[d].isAnimated()&&b[d].stop();b=[];a=null;c=0}};this.run=function(){for(var a=0,c=b.length;a<c;++a){var g=b[a];if(g&&g.isAnimated())if(g.currentFrame<
g.totalFrames||null===g.totalFrames){g.currentFrame+=1;if(g.useSeconds){var k=g,h=k.totalFrames,n=k.currentFrame,m=k.currentFrame*k.duration*1E3/k.totalFrames,l=new Date-k.getStartTime(),q=0,q=l<1E3*k.duration?Math.round((l/m-1)*k.currentFrame):h-(n+1);0<q&&isFinite(q)&&(k.currentFrame+q>=h&&(q=h-(n+1)),k.currentFrame+=q)}g.onTween.fire();g._onTween.fire()}else YAHOO.util.AnimMgr.stop(g)}}};
YAHOO.util.Bezier=new function(){this.getPosition=function(a,b){for(var c=a.length,d=[],f=0;f<c;++f)d[f]=[a[f][0],a[f][1]];for(var g=1;g<c;++g)for(f=0;f<c-g;++f)d[f][0]=(1-b)*d[f][0]+b*d[parseInt(f+1,10)][0],d[f][1]=(1-b)*d[f][1]+b*d[parseInt(f+1,10)][1];return[d[0][0],d[0][1]]}};
YAHOO.util.Easing=new function(){this.easeNone=function(a,b,c,d){return b+a/d*c};this.easeIn=function(a,b,c,d){return b+c*(a/=d)*a*a};this.easeOut=function(a,b,c,d){d=(a/=d)*a;return b+c*(d*a+-3*d+3*a)};this.easeBoth=function(a,b,c,d){d=(a/=d)*a;return b+c*(-2*d*a+3*d)};this.backIn=function(a,b,c,d){d=(a/=d)*a;a*=d;return b+c*(-3.4005*a*d+10.2*d*d+-6.2*a+.4*d)};this.backOut=function(a,b,c,d){d=(a/=d)*a;var f=d*a;return b+c*(8.292*f*d+-21.88*d*d+22.08*f+-12.69*d+5.1975*a)};this.backBoth=function(a,
b,c,d){d=(a/=d)*a;var f=d*a;return b+c*(.402*f*d+-2.1525*d*d+-3.2*f+8*d+-2.05*a)}};YAHOO.util.Motion=function(a,b,c,d){a&&this.initMotion(a,b,c,d)};YAHOO.util.Motion.prototype=new YAHOO.util.Anim;YAHOO.util.Motion.prototype.defaultUnits.points="px";
YAHOO.util.Motion.prototype.doMethod=function(a,b,c){var d=null;"points"==a?(a=this.getTranslatedPoints(),b=this.method(this.currentFrame,0,100,this.totalFrames)/100,a&&(d=YAHOO.util.Bezier.getPosition(a,b))):d=this.method(this.currentFrame,b,c-b,this.totalFrames);return d};
YAHOO.util.Motion.prototype.getAttribute=function(a){var b=null;"points"==a?(b=[this.getAttribute("left"),this.getAttribute("top")],isNaN(b[0])&&(b[0]=0),isNaN(b[1])&&(b[1]=0)):b=parseFloat(YAHOO.util.Dom.getStyle(this.getEl(),a));return b};YAHOO.util.Motion.prototype.setAttribute=function(a,b,c){"points"==a?(YAHOO.util.Dom.setStyle(this.getEl(),"left",b[0]+c),YAHOO.util.Dom.setStyle(this.getEl(),"top",b[1]+c)):YAHOO.util.Dom.setStyle(this.getEl(),a,b+c)};
YAHOO.util.Motion.prototype.initMotion=function(a,b,c,d){YAHOO.util.Anim.call(this,a,b,c,d);b=b||{};b.points=b.points||{};b.points.control=b.points.control||[];this.attributes=b;var f,g=null,k=null;this.getTranslatedPoints=function(){return k};var h=function(a,b){var c=YAHOO.util.Dom.getXY(b.getEl());return a=[a[0]-c[0]+f[0],a[1]-c[1]+f[1]]};this._onStart.subscribe(function(){f=this.getAttribute("points");var a=this.attributes,b=a.points.control||[];0<b.length&&b[0].constructor!=Array&&(b=[b]);"static"==
YAHOO.util.Dom.getStyle(this.getEl(),"position")&&YAHOO.util.Dom.setStyle(this.getEl(),"position","relative");if("undefined"!=typeof a.points.from)YAHOO.util.Dom.setXY(this.getEl(),a.points.from),f=this.getAttribute("points");else if(0===f[0]||0===f[1])YAHOO.util.Dom.setXY(this.getEl(),YAHOO.util.Dom.getXY(this.getEl())),f=this.getAttribute("points");var c;if("undefined"!=typeof a.points.to)for(g=h(a.points.to,this),a=0,c=b.length;a<c;++a)b[a]=h(b[a],this);else if("undefined"!=typeof a.points.by)for(g=
[f[0]+a.points.by[0],f[1]+a.points.by[1]],a=0,c=b.length;a<c;++a)b[a]=[f[0]+b[a][0],f[1]+b[a][1]];g&&(k=[f],0<b.length&&(k=k.concat(b)),k[k.length]=g)})};YAHOO.util.Scroll=function(a,b,c,d){a&&YAHOO.util.Anim.call(this,a,b,c,d)};YAHOO.util.Scroll.prototype=new YAHOO.util.Anim;YAHOO.util.Scroll.prototype.defaultUnits.scroll=" ";
YAHOO.util.Scroll.prototype.doMethod=function(a,b,c){var d=null;return d="scroll"==a?[this.method(this.currentFrame,b[0],c[0]-b[0],this.totalFrames),this.method(this.currentFrame,b[1],c[1]-b[1],this.totalFrames)]:this.method(this.currentFrame,b,c-b,this.totalFrames)};YAHOO.util.Scroll.prototype.getAttribute=function(a){var b=null,b=this.getEl();return b="scroll"==a?[b.scrollLeft,b.scrollTop]:parseFloat(YAHOO.util.Dom.getStyle(b,a))};
YAHOO.util.Scroll.prototype.setAttribute=function(a,b,c){var d=this.getEl();"scroll"==a?(d.scrollLeft=b[0],d.scrollTop=b[1]):YAHOO.util.Dom.setStyle(d,a,b+c)};BBDN.util.BrowserSniff=new function(){var a=navigator.userAgent.toLowerCase(),b=navigator.appVersion.toLowerCase().indexOf("msie");this.is_opera=-1!=a.indexOf("opera");this.is_mac=-1!=a.indexOf("mac");this.is_konq=-1!=a.indexOf("konqueror");this.is_khtml=(this.is_safari=-1!=a.indexOf("safari")&&-1!=a.indexOf("mac")?!0:!1)||this.is_konq;this.is_gecko=!this.is_khtml&&navigator.product&&"gecko"==navigator.product.toLowerCase()?!0:!1;this.is_fb=-1!=a.indexOf("mozilla/5")&&-1==a.indexOf("spoofer")&&-1==
a.indexOf("compatible")&&-1==a.indexOf("opera")&&-1==a.indexOf("webtv")&&-1==a.indexOf("hotjava")&&this.is_gecko&&"Firebird"==navigator.vendor;this.is_fx=-1!=a.indexOf("mozilla/5")&&-1==a.indexOf("spoofer")&&-1==a.indexOf("compatible")&&-1==a.indexOf("opera")&&-1==a.indexOf("webtv")&&-1==a.indexOf("hotjava")&&this.is_gecko&&("Firefox"==navigator.vendor||-1!=a.indexOf("firefox"));this.is_moz=-1!=a.indexOf("mozilla/5")&&-1==a.indexOf("spoofer")&&-1==a.indexOf("compatible")&&-1==a.indexOf("opera")&&
-1==a.indexOf("webtv")&&-1==a.indexOf("hotjava")&&this.is_gecko&&!this.is_fb&&!this.is_fx&&(""==navigator.vendor||"Mozilla"==navigator.vendor||"Debian"==navigator.vendor);this.is_nav=-1!=a.indexOf("mozilla")&&-1==a.indexOf("spoofer")&&-1==a.indexOf("compatible")&&-1==a.indexOf("opera")&&-1==a.indexOf("webtv")&&-1==a.indexOf("hotjava")&&!this.is_khtml&&!this.is_moz&&!this.is_fb&&!this.is_fx;this.is_ie=-1!=b&&!this.is_opera&&!this.is_khtml};
BBDN.util.uaMatchBrowser=new function(a){a=navigator.userAgent.toLowerCase();a=a.toLowerCase();a=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};BBDN.util.Dom=new function(){this.verticalScrollBarVisible=function(){return document.documentElement.clientHeight<document.documentElement.scrollHeight};this.horizontalScrollBarVisible=function(){return document.documentElement.clientWidth<document.documentElement.scrollWidth};this.bothScrollBarsVisible=function(){return this.verticalScrollBarVisible()&&this.horizontalScrollBarVisible()};this.getTotalWidth=function(){var a;if((BBDN.util.BrowserSniff.is_fx||BBDN.util.BrowserSniff.is_nav)&&this.verticalScrollBarVisible()&&
!this.bothScrollBarsVisible())return document.documentElement.clientWidth;this.getInnerWidth()>this.getScrollWidth()?a=this.getInnerWidth():a=this.getScrollWidth();return a};this.getTotalHeight=function(){var a;if((BBDN.util.BrowserSniff.is_fx||BBDN.util.BrowserSniff.is_nav)&&this.horizontalScrollBarVisible()&&!this.bothScrollBarsVisible())return document.documentElement.clientHeight;this.getInnerHeight()>this.getScrollHeight()?a=this.getInnerHeight():a=this.getScrollHeight();return a};this.getInnerWidth=
function(){var a;self.innerWidth?a=self.innerWidth:document.documentElement&&document.documentElement.clientWidth?a=document.documentElement.clientWidth:document.body&&(a=document.body.clientWidth);return a};this.getInnerHeight=function(){var a;self.innerHeight?a=self.innerHeight:document.documentElement&&document.documentElement.clientHeight?a=document.documentElement.clientHeight:document.body&&(a=document.body.clientHeight);return a};this.getScrollOffsetWidth=function(){var a;self.pageYOffset?
a=self.pageXOffset:document.documentElement&&document.documentElement.scrollTop?a=document.documentElement.scrollLeft:document.body&&(a=document.body.scrollLeft);return a};this.getScrollOffsetHeight=function(){var a;self.pageYOffset?a=self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?a=document.documentElement.scrollTop:document.body&&(a=document.body.scrollTop);return a};this.getScrollWidth=function(){var a=0;document.documentElement&&document.documentElement.scrollWidth?
a=document.documentElement.scrollWidth:document.body&&(a=document.body.scrollWidth);return a};this.getScrollHeight=function(){var a=0;document.documentElement&&document.documentElement.scrollHeight?a=document.documentElement.scrollHeight:document.body&&(a=document.body.scrollHeight);return a};this.getBodyWidth=function(){return document.body.scrollWidth>document.body.offsetWidth?document.body.scrollWidth:document.body.offsetWidth};this.getBodyHeight=function(){return document.body.scrollHeight>document.body.offsetHeight?
document.body.scrollHeight:document.body.offsetHeight};this.hideSelects=function(){var a=BBDN.util.uaMatchBrowser;if("msie"==a.browser&&("6.0"==a.version||"7.0"==a.version))for(var a=[],a=document.all.tags("SELECT"),b=0;b<a.length;b++)a[b].runtimeStyle.visibility="hidden"};this.showSelects=function(){var a=BBDN.util.uaMatchBrowser;if("msie"==a.browser&&("6.0"==a.version||"7.0"==a.version))for(var a=[],a=document.all.tags("SELECT"),b=0;b<a.length;b++)a[b].runtimeStyle.visibility=""};this.setOpacity=
function(a,b){var c=BBDN.util.uaMatchBrowser;if("msie"!=c.browser||"8.0"!=c.version)a.style.filter="alpha(opacity:"+b+")";a.style.KHTMLOpacity=b/100;a.style.MozOpacity=b/100;a.style.opacity=b/100};this.documentLoaded=function(){return"complete"!=document.readyState?!1:!0};this.checkValidators=function(){return!0};this.$=function(){for(var a=[],b=0;b<arguments.length;b++){var c=arguments[b];"string"==typeof c&&(c=document.getElementById(c));if(1==arguments.length)return c;a.push(c)}return a};this.getAbsoluteLeft=
function(a){for(var b=a.offsetLeft;null!==a.offsetParent;)a=a.offsetParent,b+=a.offsetLeft;return b};this.getAbsoluteTop=function(a){for(var b=a.offsetTop;null!=a.offsetParent;)a=a.offsetParent,b+=a.offsetTop;return b};this.getElementSize=function(a){return{width:a.offsetWidth,height:a.offsetHeight}}};
BBDN.util.Yahoo=new function(){this.getEasingFromString=function(a){switch(a){case "easeout":return YAHOO.util.Easing.easeOut;case "easeboth":return YAHOO.util.Easing.easeBoth;case "easein":return YAHOO.util.Easing.easeIn;case "easenone":return YAHOO.util.Easing.easeNone;case "backboth":return YAHOO.util.Easing.backBoth;case "backin":return YAHOO.util.Easing.backIn;case "backout":return YAHOO.util.Easing.backOut;default:return YAHOO.util.Easing.easeOut}}};BBDN.core.BusyBox=function(a,b,c,d,f,g,k,h,n,m,l,q,r,s,t,p,v,y,z,A,B,C,D,E,F,w,x,G,H,I,J,K,L,M,N,O,P,Q,R){function u(){if(e.Visible){var a=BBDN.util.Dom.getInnerHeight(),b=BBDN.util.Dom.getInnerWidth(),c=parseInt(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,10),d=parseInt(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,10);e.ShowOnLoad&&(c-=BBDN.util.Dom.getAbsoluteTop(e.container.offsetParent),d-=BBDN.util.Dom.getAbsoluteLeft(e.container.offsetParent));
var f,g;switch(e.Position){case "center":f=d+(b-e.box.offsetWidth)/2;g=c+(a-e.box.offsetHeight)/2;break;case "righttop":g=c+10;f=d+b-e.box.offsetWidth-20;break;case "lefttop":g=c+10;f=d+10;break;case "leftbottom":g=c+a-e.box.offsetHeight-20;f=d+10;break;case "rightbottom":g=c+a-e.box.offsetHeight-20,f=d+b-e.box.offsetWidth-20}(new YAHOO.util.Anim(e.ID,{top:{to:g},left:{to:f}},e.SlideDuration/1E3,e.SlideEasing)).animate()}}function S(){e.FinishedFading=!0}function T(){e.FinishedFading&&BBDN.util.Dom.setOpacity(e.box,
e.FadeOnMouseOverOpacity)}function U(){e.FinishedFading&&BBDN.util.Dom.setOpacity(e.box,e.Opacity)}var e=this;this.ID=a;this.Title=b;this.Text=c;this.Width=""!==d?d:"300px";this.Height=""!==f?f:"60px";this.ImageUrl=g;this.Layout=k;this.Overlay=h;this.ImmediatelyOverlay=n;this.KeepOverlay=m;""===l?(document.body.currentStyle&&(this.OverlayColor=document.body.currentStyle.backgroundColor),document.defaultView&&(this.OverlayColor=document.defaultView.getComputedStyle(document.body,"").getPropertyValue("background-color")),
"transparent"==this.OverlayColor&&(this.OverlayColor="#fff")):this.OverlayColor=l;this.OverlayOpacity=q;this.Opacity=r;this.BorderWidth=""!==s?s:"1px";this.BorderColor=""!==t?t:"black";this.BorderStyle="NotSet"!==p?p:"solid";this.BackColor=""===v?"#ffffff":v;this.TextWeight=y;this.TextStyle=z;this.TextSize=A;this.TextFamily=B;this.TitleWeight=C;this.TitleStyle=D;this.TitleSize=E;this.TitleFamily=F;this.TextColor=""!==w?w:"black";this.TitleColor=""!==x?x:"black";this.FadeInDuration=G;this.FadeOnMouseOver=
I;this.FadeOnMouseOverOpacity=J;this.Visible=this.FinishedFading=!1;this.Position=K;this.KeepPosition=L;this.SlideDuration=M;this.SlideEasing=BBDN.util.Yahoo.getEasingFromString(N);this.FadeInEasing=BBDN.util.Yahoo.getEasingFromString(H);this.RoundCorners=O;this.ShowOnLoad=P;this.AnchorControlID=Q;this.DockPosition=R;this.Show=function(){if(BBDN.util.Dom.checkValidators()){this.container=BBDN.util.Dom.$(this.ID+"Container");BBDN.util.Dom.$(e.ID)&&e.Close();e.box=document.createElement("div");e.ShowOnLoad?
(e.container.appendChild(e.box),e.hideSelectsTimer=window.setInterval(BBDN.util.Dom.hideSelects,100)):document.body.appendChild(e.box);e.box.style.display="none";e.box.id=e.ID;e.box.style.position="absolute";e.box.style.zIndex="9999";e.box.style.borderWidth=e.BorderWidth;e.box.style.borderColor=e.BorderColor;e.box.style.borderStyle=e.BorderStyle;e.box.style.backgroundColor=e.BackColor;var a=e.ID+"Table",b=e.ID+"Text",c=e.ID+"Title",d=e.ID+"Image";switch(e.Layout){case "classic":e.box.innerHTML='<table id="'+
a+'" border=0 cellpadding=0 cellspacing=0>\t<tr valign="top">\t\t<td rowspan="2"><img border="0" id="'+d+'" src="'+e.ImageUrl+'" /></td>\t\t<td width="100%"><p id="'+c+'">'+e.Title+'</p></td>\t</tr>\t<tr valign="top">\t\t<td><p id="'+b+'">'+e.Text+"</p></td>\t</tr></table>";a=BBDN.util.Dom.$(a);a.style.width=e.Width;a.style.height=e.Height;c=BBDN.util.Dom.$(c);c.style.fontWeight=e.TitleWeight;c.style.fontStyle=e.TitleStyle;c.style.fontSize=e.TitleSize;c.style.fontFamily=e.TitleFamily;c.style.margin=
"15px 10px 0px 10px";c.style.color=e.TitleColor;b=BBDN.util.Dom.$(b);b.style.fontWeight=e.TextWeight;b.style.fontStyle=e.TextStyle;b.style.fontSize=e.TextSize;b.style.fontFamily=e.TextFamily;b.style.margin="20px 10px 15px 10px";b.style.color=e.TextColor;d=BBDN.util.Dom.$(d);d.style.margin="15px 5px 10px 10px";break;case "classicbottomimage":e.box.innerHTML='<table id="'+a+'" border="0" cellpadding="0" cellspacing="0">\t<tr valign="top">\t\t<td width="100%"><p id="'+c+'">'+e.Title+'</p></td>\t</tr>\t<tr valign="top">\t\t<td><p id="'+
b+'">'+e.Text+'</p></td>\t</tr>\t<tr valign="top">\t\t<td align="center"><img border="0" id="'+d+'" src="'+e.ImageUrl+'" /></td>\t</tr></table>';a=BBDN.util.Dom.$(a);a.style.width=e.Width;a.style.height=e.Height;c=BBDN.util.Dom.$(c);c.style.fontWeight=e.TitleWeight;c.style.fontStyle=e.TitleStyle;c.style.fontSize=e.TitleSize;c.style.fontFamily=e.TitleFamily;c.style.margin="15px 10px 0px 10px";c.style.color=e.TitleColor;b=BBDN.util.Dom.$(b);b.style.fontWeight=e.TextWeight;b.style.fontStyle=e.TextStyle;
b.style.fontSize=e.TextSize;b.style.fontFamily=e.TextFamily;b.style.margin="20px 10px 15px 10px";b.style.color=e.TextColor;d=BBDN.util.Dom.$(d);d.style.margin="0px 0px 10px 0px";break;case "imageonly":e.box.innerHTML='<img border="0" id="'+d+'" src="'+e.ImageUrl+'" />';d=BBDN.util.Dom.$(d);d.style.margin="0px 0px 0px 0px";break;case "textonly":e.box.innerHTML='<span id="'+b+'">'+e.Text+"</span>",b=BBDN.util.Dom.$(b),b.style.fontWeight=e.TextWeight,b.style.fontStyle=e.TextStyle,b.style.fontSize=e.TextSize,
b.style.fontFamily=e.TextFamily,b.style.margin="20px 10px 15px 10px",b.style.color=e.TextColor}e.box.style.display="block";e.Visible=!0;if(e.Visible)switch(d=BBDN.util.Dom.getInnerHeight(),b=BBDN.util.Dom.getInnerWidth(),c=parseInt(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,10),a=parseInt(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,10),e.ShowOnLoad&&(c-=BBDN.util.Dom.getAbsoluteTop(e.container.offsetParent),
a-=BBDN.util.Dom.getAbsoluteLeft(e.container.offsetParent)),e.Position){case "center":e.box.style.top=c+(d-e.box.offsetHeight)/2+"px";e.box.style.left=a+(b-e.box.offsetWidth)/2+"px";break;case "righttop":e.box.style.top=c+10+"px";e.box.style.left=a+b-e.box.offsetWidth-20+"px";break;case "lefttop":e.box.style.top=c+10+"px";e.box.style.left=a+10+"px";break;case "leftbottom":e.box.style.top=c+d-e.box.offsetHeight-20+"px";e.box.style.left=a+10+"px";break;case "rightbottom":e.box.style.top=c+d-e.box.offsetHeight-
20+"px";e.box.style.left=a+b-e.box.offsetWidth-20+"px";break;case "dock":switch(d=BBDN.util.Dom.getElementSize(e.box),b=BBDN.util.Dom.getElementSize(document.body),c=YAHOO.util.Dom.getXY(BBDN.util.Dom.$(e.AnchorControlID)),a=BBDN.util.Dom.getElementSize(BBDN.util.Dom.$(e.AnchorControlID)),"auto"===e.DockPosition&&(e.DockPosition=0<b.width-c[0]-a.width-d.width&&0<c[1]+a.height/2-d.height/2?"right":0<c[0]-d.width&&0<c[1]+a.height/2-d.height/2?"left":0<c[0]+a.width/2-d.width/2&&0<c[1]-d.height?"top":
"bottom"),e.DockPosition){case "right":e.box.style.left=c[0]+a.width+"px";e.box.style.top=c[1]+a.height/2-d.height/2+"px";break;case "left":e.box.style.left=c[0]-d.width+"px";e.box.style.top=c[1]+a.height/2-d.height/2+"px";break;case "top":e.box.style.left=c[0]+a.width/2-d.width/2+"px";e.box.style.top=c[1]-d.height+"px";break;case "bottom":e.box.style.left=c[0]+a.width/2-d.width/2+"px",e.box.style.top=c[1]+a.height+"px"}}e.Visible&&(0<e.FadeInDuration?(BBDN.util.Dom.setOpacity(e.box,0),d=new YAHOO.util.Anim(e.ID,
{opacity:{to:e.Opacity/100}},e.FadeInDuration/1E3,e.FadeInEasing),d.onComplete.subscribe(S,e,!0),d.animate()):(BBDN.util.Dom.setOpacity(e.box,e.Opacity),e.FinishedFading=!0));BBDN.util.Dom.hideSelects();this.KeepPosition&&"dock"!==this.Position&&(YAHOO.util.Event.addListener(window,"resize",u,this,!0),YAHOO.util.Event.addListener(window,"scroll",u,this,!0),YAHOO.util.Event.addListener(window,"DOMMouseScroll",u,this,!0));!this.Overlay||this.ImmediatelyOverlay||this.ShowOnLoad||this.CreateOverlay();
this.FadeOnMouseOver&&(YAHOO.util.Event.addListener(this.box,"mouseover",T,this,!0),YAHOO.util.Event.addListener(this.box,"mouseout",U,this,!0))}};this.Close=function(){if(this.Overlay&&!this.KeepOverlay&&!this.ShowOnLoad){var a=BBDN.util.Dom.$(this.ID+"Overlay");null!==a&&document.body.removeChild(a)}this.Visible=!1;null!==this.box&&(this.ShowOnLoad?(this.container.removeChild(this.box),window.clearInterval(this.hideSelectsTimer),BBDN.util.Dom.showSelects()):document.body.removeChild(this.box));
BBDN.util.Dom.showSelects()};this.CreateOverlay=function(){var a=document.createElement("div");document.body.appendChild(a);a.id=this.ID+"Overlay";a.style.position="absolute";a.style.top="0px";a.style.left="0px";a.style.zIndex="9998";a.style.width=BBDN.util.Dom.getTotalWidth()+"px";a.style.height=BBDN.util.Dom.getTotalHeight()+"px";if(BBDN.util.BrowserSniff.is_opera)a.style.backgroundImage="url(BusyBoxDotNet.axd?res=maskBG.png)",a.style.backgroundRepeat="repeat";else{var b=BBDN.util.uaMatchBrowser;
"msie"==b.browser&&"8.0"==b.version?(b=parseInt(this.OverlayOpacity/100*255).toString(16),b=this.OverlayColor.replace("#","#"+b),a.style.filter="progid:DXImageTransform.Microsoft.gradient(startColorstr="+b+",endColorstr="+b+")"):a.style.backgroundColor=this.OverlayColor;BBDN.util.Dom.setOpacity(a,this.OverlayOpacity)}}};var BusyBoxImage=new Image;BusyBoxImage.src="../../../images/BusyBox/GreenBar.gif";var BusyBoxOperaBackgroungImage=new Image;BusyBoxOperaBackgroungImage.src="../../../images/BusyBox/maskBG.png";
var mOverlayColor="#5b9bd5",BusyBox=new BBDN.core.BusyBox("topBusyBox","请稍候","页面正在处理中,请等待页面处理完成","","","../../../images/BusyBox/CircleSections.gif","classic",!0,!1,!1,mOverlayColor,28,90,"1px","","Solid","","normal","normal","12px","Tahoma","bold","normal","14px","Tahoma","","",0,"easeout",!0,0,"center",!0,0,"easeout",!1,!1,"","auto");function showBusy(){BusyBox.Show()}function closeBusy(){BusyBox.Close()};
/**
 * 
 * 该模板插件来自jqmobi1.*,2.0中未找到该插件
 * 2013/6/4对template插件进行扩展，支持jsp中使用
 * 
 */
(function($) {
    $["template"] = function(tmpl, data) {
        return (template(tmpl, data));
    };
    $["tmpl"] = function(tmpl, data) {
        return $(template(tmpl, data));
    };
    /*
     * 扩展
     * tmplId:模板id
     * tmplContent:模板内容
     */
    $["tmplExt"] = function(tmplId,tmplContent, data) {
        return $(templateExt(tmplId,tmplContent, data));
    };
    var template = function(str, data) {
        //If there's no data, let's pass an empty object so the user isn't forced to.
        if (!data)
            data = {};
        return tmpl(str, data);
    };
    /*
     * 扩展
     */
    var templateExt = function(tmplId,tmplContent, data) {
        //If there's no data, let's pass an empty object so the user isn't forced to.
        if (!data)
            data = {};
        return tmplExt(tmplId,tmplContent, data);
    };
    (function() {
        var cache = {};
        this.tmpl = function tmpl(str, data) {
        	var a=1;
           // var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^$]*$>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<$=(.+?)$>/g, "',$1,'").split("<$").join("');").split("$>").join("p.push('") + "');}return p.join('');");
            var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML.replace(/\$/g,"%")) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');");
        	return data ? fn(data) : fn;
        };
        /*
         * 扩展
         */
        this.tmplExt = function tmplExt(id,str, data) {
        	
            var fn = !/\W/.test(id) ? cache[id] = cache[id] || tmpl(str) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^$]*$>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<$=(.+?)$>/g, "',$1,'").split("<$").join("');").split("$>").join("p.push('") + "');}return p.join('');");
            return data ? fn(data) : fn;
        };
    })();
})(jq);
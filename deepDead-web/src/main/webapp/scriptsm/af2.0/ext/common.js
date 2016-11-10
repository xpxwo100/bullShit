/*
 *-------通用方法 
 */
/*
 * 停止事件的冒泡
 */
function stopEvent(event, allowDefault) {

	if (!allowDefault) {
		if (event.preventDefault) {
			event.preventDefault();                
		} else {
			event.returnValue = false;
		}
	}

	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
};
/*
 * 设置控件为屏幕大小
 */
function setDomWithScreen(domId)
{
	var dom=document.getElementById(domId);
	dom.style["height"]=window.innerHeight+"px";
	dom.style["width"]=window.innerWidth+"px";
	//var content_iframe=$('#'+domId);
	//content_iframe.css("height",window.innerHeight);	
	//content_iframe.css("width",window.innerWidth);	
	//content_iframe.width($('#jQUi').width());
	//console.info("content_iframe: height "+content_iframe.height());
	/*
	var mapdiv=content_iframe.get(0).contentWindow.document.getElementById("map");
	if(content_iframe.get(0).clientWidth)
	{
		content_iframe.width(content_iframe.get(0).clientWidth+'px');
	}
	else
	{
		content_iframe.width(document.documentElement.clientWidth+'px');
	}
	if(content_iframe.get(0).clientHeight)
	{
		content_iframe.height(content_iframe.get(0).clientHeight+'px');
	}
	else
	{
		content_iframe.height(document.documentElement.clientHeight+'px');
	}*/
}
/*
 * 设置dom高度为所有子元素的最大高度
 */
function setElementAutoHeight(select)
{
	var doms=$(select);
	for(var i=0;i<doms.length;i++)
	{
		var dom=doms.get(i);
		$(dom).height(dom.lastElementChild.offsetTop+dom.lastElementChild.offsetHeight+'px');
	}
}
/*
 * 输出对象的所有字段,方便手机上调试
 */
function printObject(obj)
{
	if(obj==null||obj==undefined)
	{
		return;
	}
	if(typeof obj != "object"&&typeof obj != "array")
	{
		console.info(obj);
		return;
	}
	var str="-> "+obj;
	for(var i in obj)
		{
		str+="\r\n  "+i+":"+obj[i];
		}
	console.info(str);
}
/*
获取URL?参数,组成HashMap
*/
function getUrlMap() 
{
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    var plen = pairs.length;
    for (var i = 0; i < pairs.length; i++) 
    {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) 
        {
            plen = plen - 1;
            continue;
        }
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1)
        args[argname] = unescape(value);
    }
    args.length = plen;
    args.isEmpty = (plen == 0 ? true : false);
    return args;
}

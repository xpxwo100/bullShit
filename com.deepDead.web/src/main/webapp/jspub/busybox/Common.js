/**
 * <p>Title: NickLee.Web.UI</p>
 * <p>Description: NickLee.Web.UI</p>
 * <p>Copyright: 1982-2005 by NickLee</p>
 * <p>Company: NickLee Corporation</p>
 * <p>CreateTime: 2004-07-01 08:30</p>
 * <p>ModifyTime: 2005-07-01 16:00</p>
 * @CreateAuthor Nick.Lee    * @version 1.0
 * @ModifyAuthor Nick.Lee    * @version 1.0
 */
BBDN.util.Dom = new function()
{
	this.verticalScrollBarVisible = function()
	{
		return (document.documentElement.clientHeight < document.documentElement.scrollHeight );
	};

	this.horizontalScrollBarVisible =  function()
	{
		return (document.documentElement.clientWidth < document.documentElement.scrollWidth );
	};

	this.bothScrollBarsVisible = function()
	{
		return (this.verticalScrollBarVisible() && this.horizontalScrollBarVisible());
	};

	// Gets the total width of the page, including horizontal scrolling
	this.getTotalWidth = function()
	{
		var width;
		
		// fix for firefox and netscape which shows scrollbars if one of the scrollbars is visible
		// DON'T CHANGE!!!
		if(BBDN.util.BrowserSniff.is_fx || BBDN.util.BrowserSniff.is_nav)
			if(this.verticalScrollBarVisible() && !this.bothScrollBarsVisible())
				return document.documentElement.clientWidth;
		
		this.getInnerWidth() > this.getScrollWidth() ?  
			width = this.getInnerWidth() : 
			width = this.getScrollWidth();
		
		return width;
	};

	// Gets the total height of the page, including vertical scrolling
	this.getTotalHeight = function()
	{
		var height;
		
		// fix for firefox and netscape which shows scrollbars if one of the scrollbars is visible
		// DON'T CHANGE!!!
		if(BBDN.util.BrowserSniff.is_fx || BBDN.util.BrowserSniff.is_nav)
			if(this.horizontalScrollBarVisible() && !this.bothScrollBarsVisible())
				return document.documentElement.clientHeight;
		
		this.getInnerHeight() > this.getScrollHeight() ? 
			height = this.getInnerHeight() : 
			height = this.getScrollHeight();
		
		return height;
	};

	// viewport width
	this.getInnerWidth = function()
	{
		var x;
		
		if (self.innerWidth) 
			x = self.innerWidth;
		else if (document.documentElement && document.documentElement.clientWidth)
			x = document.documentElement.clientWidth;
		else if (document.body) 
			x = document.body.clientWidth;
		
		return x;
	};

	// viewport height
	this.getInnerHeight = function()
	{
		var y;
		
		if (self.innerHeight) 
			y = self.innerHeight;
		else if (document.documentElement && document.documentElement.clientHeight)
			y = document.documentElement.clientHeight;
		else if (document.body) 
			y = document.body.clientHeight;
		
		return y;
	};

	this.getScrollOffsetWidth = function()
	{
		var x;
		
		if (self.pageYOffset)
			x = self.pageXOffset;
		else if (document.documentElement && document.documentElement.scrollTop)
			x = document.documentElement.scrollLeft;
		else if (document.body)
			x = document.body.scrollLeft;
		
		return x;
	};

	this.getScrollOffsetHeight = function()
	{
		var y;
		
		if (self.pageYOffset) 
			y = self.pageYOffset;
		else if (document.documentElement && document.documentElement.scrollTop)
			y = document.documentElement.scrollTop;
		else if (document.body) 
			y = document.body.scrollTop;
		
		return y;
	};

	this.getScrollWidth = function()
	{
		var x = 0;
		
		if (document.documentElement && document.documentElement.scrollWidth)
			x = document.documentElement.scrollWidth;
		else if (document.body)
			x = document.body.scrollWidth;
		
		return x;
	};

	this.getScrollHeight = function()
	{
		var y = 0;
		
		if (document.documentElement && document.documentElement.scrollHeight)
			y = document.documentElement.scrollHeight;
		else if (document.body)
			y = document.body.scrollHeight;
		
		return y;
	};

	// gets the actual width of the document body element
	// doesn't correspond to browser's window size
	this.getBodyWidth = function()
	{
		var x;
		
		var test1 = document.body.scrollWidth;
		var test2 = document.body.offsetWidth;

		if (test1 > test2) // all but Explorer Mac
			x = document.body.scrollWidth;
		else 
			x = document.body.offsetWidth;
		
		return x;
	};

	// gets the actual height of the document body element
	// doesn't correspond to browser's window size
	this.getBodyHeight = function()
	{
		var y;
		
		var test1 = document.body.scrollHeight;
		var test2 = document.body.offsetHeight;

		if (test1 > test2)
			y = document.body.scrollHeight;
		else 
			y = document.body.offsetHeight;
		
		return y;
	};
	this.hideSelects = function()
	{
		var mBrowser=BBDN.util.uaMatchBrowser;
//		if (BBDN.util.BrowserSniff.is_ie)
		if
		(	mBrowser.browser=="msie" && 
			(mBrowser.version=="6.0" || mBrowser.version=="7.0")
		)
		{
			var selects = [];
			selects = document.all.tags("SELECT");
			for	(var i = 0; i < selects.length; i++)
				selects[i].runtimeStyle.visibility = "hidden";
		}
	};

	this.showSelects = function()
	{
		var mBrowser=BBDN.util.uaMatchBrowser;
//		if (BBDN.util.BrowserSniff.is_ie)
		if
		(	mBrowser.browser=="msie" && 
			(mBrowser.version=="6.0" || mBrowser.version=="7.0")
		)
		{
			var selects = [];
			selects = document.all.tags("SELECT");
			for	(var i = 0; i < selects.length; i++)
				selects[i].runtimeStyle.visibility = "";   
		}
	};

	this.setOpacity = function(element, opacity)
	{
		var mBrowser=BBDN.util.uaMatchBrowser;
		if(!(mBrowser.browser=="msie" && mBrowser.version=="8.0"))
		{
			element.style.filter = "alpha(opacity:" + opacity + ")"; 
		}
		element.style.KHTMLOpacity = opacity / 100;
		element.style.MozOpacity = opacity / 100; 
		element.style.opacity = opacity / 100;
	};

	this.documentLoaded = function()
	{
		if(document.readyState != "complete") 
			return false;
		return true;
	};

	this.checkValidators = function()
	{
//		try
//		{
//			if(Page_IsValid != null) 
//			{
//				return Page_IsValid; 
//			}
//			return true;
//		}
//		catch(e) // no validators on page -> page is obviously valid
//		{ 
//			return true; 
//		}
		return true;
	};
	
	this.$ = function()
	{
		var elements = new Array();
		
		for (var i = 0; i < arguments.length; i++) 
		{
			var element = arguments[i];
			if (typeof element == 'string')
				element = document.getElementById(element);
			if (arguments.length == 1)
				return element;
			elements.push(element);
		}
		return elements;
	};
	
	this.getAbsoluteLeft = function(o) 
	{
		var oLeft = o.offsetLeft;        
		var oParent;   
		
		while(o.offsetParent !== null) 
		{   
			oParent = o.offsetParent;    
			oLeft += oParent.offsetLeft; 
			o = oParent;
		}
		return oLeft;
	};

	this.getAbsoluteTop = function(o) 
	{
		var oTop = o.offsetTop;   
		var oParent;         
		
		while(o.offsetParent!=null) 
		{ 
			oParent = o.offsetParent;  
			oTop += oParent.offsetTop; 
			o = oParent;
		}
		return oTop;
	};
	
	// getElementSize: return width and height
	this.getElementSize = function(obj)
	{
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		return {width : w, height : h};
	};
}; // end BBDN.util.Dom

BBDN.util.Yahoo = new function()
{
	this.getEasingFromString = function(easing)
	{
		switch(easing)
		{
			case "easeout":		return YAHOO.util.Easing.easeOut; 
			case "easeboth":	return YAHOO.util.Easing.easeBoth;
			case "easein":		return YAHOO.util.Easing.easeIn;
			case "easenone":	return YAHOO.util.Easing.easeNone;
			case "backboth":	return YAHOO.util.Easing.backBoth;
			case "backin":		return YAHOO.util.Easing.backIn;  
			case "backout":		return YAHOO.util.Easing.backOut; 
			default:			return YAHOO.util.Easing.easeOut;
		}
	} // end getYahooEasingFromString
};
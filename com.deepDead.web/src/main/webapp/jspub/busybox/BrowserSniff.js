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
BBDN.util.BrowserSniff = new function()
{
	var agt = navigator.userAgent.toLowerCase();
	var appVer = navigator.appVersion.toLowerCase();
	var iePos = appVer.indexOf('msie');

	this.is_opera = (agt.indexOf("opera") != -1);

	this.is_mac = (agt.indexOf("mac")!= -1);
	                                 
	this.is_konq = (agt.indexOf('konqueror') != -1);

	var is_getElementById   = (document.getElementById) ? "true" : "false"; // 001121-abk
	var is_getElementsByTagName = (document.getElementsByTagName) ? "true" : "false"; // 001127-abk
	var is_documentElement = (document.documentElement) ? "true" : "false"; // 001121-abk

	this.is_safari = ((agt.indexOf('safari')!=-1)&&(agt.indexOf('mac')!=-1))?true:false;
	this.is_khtml  = (this.is_safari || this.is_konq);

	this.is_gecko = ((!this.is_khtml)&&(navigator.product)&&(navigator.product.toLowerCase()=="gecko"))?true:false;

	this.is_fb = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
					(agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
					(agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
					(this.is_gecko) && (navigator.vendor=="Firebird"));
	this.is_fx = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
					(agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
					(agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
					(this.is_gecko) && ((navigator.vendor=="Firefox")||(agt.indexOf('firefox')!=-1)));
	this.is_moz   = ((agt.indexOf('mozilla/5')!=-1) && (agt.indexOf('spoofer')==-1) &&
					(agt.indexOf('compatible')==-1) && (agt.indexOf('opera')==-1)  &&
					(agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)     &&
					(this.is_gecko) && (!this.is_fb) && (!this.is_fx) &&
					((navigator.vendor=="")||(navigator.vendor=="Mozilla")||(navigator.vendor=="Debian")));

	this.is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
				&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
				&& (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)
				&& (!this.is_khtml) && (!(this.is_moz)) && (!this.is_fb) && (!this.is_fx));

	this.is_ie   = ((iePos!=-1) && (!this.is_opera) && (!this.is_khtml));
};
BBDN.util.uaMatchBrowser = new function(ua) 
{
	var ua = navigator.userAgent.toLowerCase();
	ua = ua.toLowerCase();
	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

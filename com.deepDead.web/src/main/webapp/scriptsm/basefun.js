/*
基础配置变量
*/
var mEmpty = "";
var mBlank = " ";
var mBlankWidth = 150;
var mBlankHeight = 100;
var mSelectColor="#FFCC66";
var mNoSelectColor = "#FFFFFF";
var mIsTopWindow = false;
var mUnDefined = "undefined";

var mAssWeb = "srm";
var mAssBusiness = "auap-biz";
var mVersionNum="20130101";

/*
获取当前请求http地址
*/
function getCurrentRoot() 
{
    var pos = window.location.pathname.lastIndexOf("/");
    return window.location.protocol + "//" + window.location.host + window.location.pathname.substr(0, pos) + "/";
}
/*
对Url生成随机URL
*/
function getRanUrl(url)
{
	if(url.indexOf("?")>0)
	{
		return url+"&i=" + encodeURIComponent(Math.random());
	}
	else
	{
		return url+"?i=" + encodeURIComponent(Math.random());
	}
}
/*
对URL生成固定版本号
*/
function getVerUrl(mValue)
{
	var mData = new Array();
   mData.push(mValue);
   mData.push("ver=" +mVersionNum);
	if (mValue.split("?").length == 1) 
	{
       return mData.join("?");
   }
   else 
   {
       return mData.join("&");
   }
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
        var value = pairs[i].substring(pos + 1);
        args[argname] = unescape(value);
    }
    args.length = plen;
    args.isEmpty = (plen == 0 ? true : false);
    return args;
}
/* ***********************************************************
 * 数字处理函数对象
 * ***********************************************************/
/**
 * 带千分位数字/金额转换为不带千分位数字
 * onfocus="NumberToDecimal(this.value);"
 * @param n
 * @returns
 */
function NumberToDecimal(n)
{
	n=n.toString();
	n=n.replace(/[^\d\x2D\x2E]/g,'');
	return n;
}
/**
 * 不带千分位数字转换为带千分位数字
 * onblur="DecimalToNumber(this.value,2);"
 * @param n
 * @param p
 * @returns
 */
function DecimalToNumber(n,p)
{
	n=n.toString();
	if(p==null)
	{
		p=2;
	}
	var sy=new Array('-','');
	var neg=(n.match(/\x2D/)!=null?true:false);
	n=n.replace(/[^\d\x2E]/g,'');
	var m=n.match(/(\d*)(\x2E*)(\d*)/);
	var f=m[3];
	if(f.length>p)
	{
		f=f/Math.pow(10,(f.length-p));
		f=Math.round(f);
		while(f.toString().length<p){f='0'+f};
	}
	else
	{
		while(f.toString().length<p)
		{
			f+='0'
		};
	}
	var w=new Number(m[1]);
	if(f==Math.pow(10,p))
	{
		w+=1;f=f.toString().substr(1);
	}
	w=w.toString();
	var s=3;
	var l=w.length-s;
	while(l>0)
	{
		w=w.substr(0,l)+'\x2C'+w.substr(l);l-=s;
	}
	if(p==0)
	{
		m[2]='';
		f='';
	}
	else
	{
		m[2]='\x2E';
	}
	return (neg?sy[0]+w+m[2]+f+sy[1]:w+m[2]+f);
}
/**
 * 不带千分位数字转换为带千分位金额
 * onblur="DecimalToCurrency(this.value,2);"
 * @param n
 * @param p
 * @returns
 */
function DecimalToCurrency(n,p)
{
	n=n.toString();
	if(p==null)
	{
		p=2;
	}
	var sy=new Array('￥','','￥-','');
	var neg=(n.match(/\x2D/)!=null?true:false);
	n=n.replace(/[^\d\x2E]/g,'');
	var m=n.match(/(\d*)(\x2E*)(\d*)/);
	var f=m[3];
	if(f.length>p)
	{
		f=f/Math.pow(10,(f.length-p));
		f=Math.round(f);
		while(f.toString().length<p)
		{
			f='0'+f
		};
	}
	else
	{
		while(f.toString().length<p)
		{
			f+='0'
		};
	}
	var w=new Number(m[1]);
	if(f==Math.pow(10,p))
	{
		w+=1;
		f=f.toString().substr(1);
	}
	w=w.toString();
	var s=3;
	var l=w.length-s;
	while(l>0)
	{
		w=w.substr(0,l)+'\x2C'+w.substr(l);l-=s;
	}
	if(p==0)
	{
		m[2]='';
		f='';
	}
	else
	{
		m[2]='\x2E';
	}
	return (neg?sy[2]+w+m[2]+f+sy[3]:sy[0]+w+m[2]+f+sy[1]);
}
/**
 * input onkeypress使用
 * onkeypress="EnsureNumeric(event);"
 * @param evt
 */
function EnsureNumeric(evt)
{
	evt = (evt) ? evt : ((window.event) ? event : null);
	if (evt)
	{
		var charCode = (evt.charCode) ? evt.charCode :	((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		var ch = String.fromCharCode(charCode);
	}
	var k=charCode;
	if(!((k>47&&k<58)||k==46||k==45||k==8||k==37||k==39))
	{
		if (window.event)
		{
			evt.returnValue = false;
		}
		else 
		{
			evt.preventDefault();
		}
	}
}
/**
 * 数字处理函数对象
 */
var xnum=
{
	/**
	 * 带千分位数字/金额转换为不带千分位数字
	 * onblur="d2n(this.value,2)"
	 * @param n
	 * @param p
	 * @returns
	 */
	d2n:function(n,p)
	{
		return DecimalToNumber(n,p);
	},
	/**
	 * 不带千分位数字转换为带千分位数字
	 * onfocus="n2d(this.value);"
	 * @param n
	 * @returns
	 */
	n2d:function(n)
	{
		return NumberToDecimal(n);
	},
	/**
	 * 不带千分位数字转换为带千分位金额
	 * onblur="d2c(this.value,2);"
	 * @param n
	 * @param p
	 * @returns
	 */
	d2c:function(n,p)
	{
		return DecimalToCurrency(n,p);
	},
	/**
	 * input onkeypress使用
	 * onkeypress="en(event);"
	 */
	en:function(evt)
	{
		return EnsureNumeric(evt);
	}
};
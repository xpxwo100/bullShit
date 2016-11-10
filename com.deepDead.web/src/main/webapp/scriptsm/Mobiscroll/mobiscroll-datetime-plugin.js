/**
 * 日期控件扩展
 *
 * 使用说明：
 *	1.引用mobiscroll.full.min.css或引用mobiscroll.scroll.css和用mobiscroll.scroll.android-ics.css
 *	2.引用mobiscroll.full.min.js或引用mobiscroll.datetime.js和mobiscroll.core.js
 * 	3.给input控件指定'mobiscroll-date'样式（也可添加dateFormat='...'属性）
 *  4.引用本JS库
 */


$(".mobiscroll-date").each(function() {
	
    var dateFormat=$(this).attr("dateFormat")||"yyyy-mm-dd";
	var dateOrder=$(this).attr("dateOrder")||"yyyymmdd";
	var theme=$(this).attr("theme")||"android-ics";
	var display=$(this).attr("display")||"bottom";
	$(this).mobiscroll().date
	(
		{
			lang:'zh',
			dateFormat:dateFormat,
			theme:theme,
			display:display,
			dateOrder:dateOrder
		}
	);
});

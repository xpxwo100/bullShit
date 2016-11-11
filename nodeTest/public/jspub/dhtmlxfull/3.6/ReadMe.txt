#以下均已打IE11补丁,3.6Pro企业版

#固定定义脚本库
dhtmlx.js 				企业版所有控件版本

dhtmlx_list.js 			企业版
	Grid,Tree,Layout,Menu,Toolbar,
	Windows,common,Calendar,Combo
	
dhtmlx_detail.js 		企业版
	Tree,Toolbar,common,Calendar,Combo,
	Form,Popup
dhtmlx_detailEx.js 		企业版
	Tree,Menu,Toolbar,common,
	Calendar,Combo,Tabbar,Form,Popup
dhtmlx_detailExGrid.js 	企业版
	Grid,Tree,Menu,Toolbar,common,
	Calendar,Combo,Tabbar,Form,Popup
	
#其他开发定义脚本库
dhtmlx_index.js			企业版
	Tree,Layout,Menu,Toolbar,common,
	Tabbar,Accordion,Message
	
dhtmlx_detailExTreeGrid.js 企业版
	Grid,TreeGrid,Toolbar
-----------	
林毓景 20140612添加
1、使用skin builder的时候，如果要使用自定义配色的web方案，会出现toolbar样式无法正常显示的问题
解决：估计是版本问题，可以将正常的skyblue中的toolbar样式覆盖到skin builder生成的dhtmlx_custom.css中（
注意skyblue替换为web、img路径）
2、使用skin builder的时候，如果使用Classic生成skin，页面也会出现不正常的显示，需要将index.jsp中的优化脚本放到页面上，
不使用脚本优化即可；
3、toolbar使用skin builder的web无法正常显示的问题，在4.0版本没有出现。
-----------

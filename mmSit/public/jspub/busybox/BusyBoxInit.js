var BusyBoxImage=new Image();
BusyBoxImage.src="../../../images/BusyBox/GreenBar.gif";
var BusyBoxOperaBackgroungImage=new Image();
BusyBoxOperaBackgroungImage.src="../../../images/BusyBox/maskBG.png";

var mOverlayColor="#5b9bd5";
//var mInitBrowser=BBDN.util.uaMatchBrowser;
//if(mInitBrowser.browser=="msie" && mInitBrowser.version=="8.0")
//{
//	mOverlayColor="transparent";
//}

var BusyBox=new BBDN.core.BusyBox
(
	/*
	请稍候
	页面正在处理中,请等待页面处理完成
	*/
	"topBusyBox",
	"\u8BF7\u7A0D\u5019",
	"\u9875\u9762\u6B63\u5728\u5904\u7406\u4E2D,\u8BF7\u7B49\u5F85\u9875\u9762\u5904\u7406\u5B8C\u6210",
	"","",
	"../../../images/BusyBox/CircleSections.gif","classic",true,false,false,
	mOverlayColor,28,90,"1px","","Solid","","normal","normal","12px","Tahoma","bold",
	"normal","14px","Tahoma","","",0,"easeout",
	true,0,"center",true,0,"easeout",false,false,"","auto"
);
function showBusy()
{
	BusyBox.Show();
}
function closeBusy()
{
	BusyBox.Close();
}
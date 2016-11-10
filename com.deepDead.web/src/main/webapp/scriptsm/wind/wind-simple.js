//初始化设置,每个页面仅需要调用一次
Wind.logger.level=Wind.Logging.Level.OFF;


//异步调用并返回数据
/**
 * 定义异步函数,有返回数据
 */
var asynReturnFun = eval(Wind.compile('async', function () {
	var mData={};
    mData.test="中文测试";
    //异步请求,并监听数据返回
	var result = $await(asynReturnFunContent(mData));
	alert(result.data.test);
}));
var asynReturnFunContent = eval(Wind.compile('async', function(data) {
  //模拟异步请求中线程休眠
  alert("sleep begin Return Fun");
  $await(Wind.Async.sleep(1000*5));
  alert("sleep end Return Fun");
  //这里进行业务调用
  var result={};
  result.data=data;
  return result;
}));
//执行异步请求,并返回数据
asynReturnFun().start();
/**
 * 定义异步函数,无返回数据
 */
var asynFunContent = eval(Wind.compile('async', function(data) {
	  //模拟异步请求中线程休眠
	  alert("sleep begin Fun");
	  $await(Wind.Async.sleep(1000*2));
	  alert("sleep end Fun");
	  //这里进行业务调用
	  var result={};
	  result.data=data;
	  return result;
}));
var mData={};
mData.test="中文测试";
asynFunContent(mData).start();
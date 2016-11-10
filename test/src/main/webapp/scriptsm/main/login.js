function login()
{ 
	var name=$("#name").val();
	var pwd=$("#password").val();
	/*
	请输入登录账号·
	*/
	if(name==mEmpty || name=="\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7\u00B7")
	{
		$.ui.popup({
		/*
		提示
		*/
		title:"\u63D0\u793A",
		/*
		请输入登录账号
		*/
		message:"\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7",
		/*
		确定
		*/
		cancelText:"\u786E\u5B9A", 
		cancelCallback: function(){},
		cancelOnly:true
		});
		return;
	}
	if(pwd=="")
	{
		$.ui.popup({
		/*
		提示
		*/
		title:"\u63D0\u793A",
		/*
		请输入登录密码
		*/
		message:"\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801",
		/*
		确定
		*/
		cancelText:"\u786E\u5B9A", 
		cancelCallback: function(){},
		cancelOnly:true
		});
		return;
	}
	var mUrl = getRanUrl("../../servlet/HttpReflectorServlet?s=tVRTluGcriUH");
	var mData = "{\"UserID\":\""+name+"\",\"UserPW\":\""+pwd+"\"}";
	//var obj=$.parseJSON("{\"UserID\":\""+name+"\",\"UserPW\":\""+pwd+"\"}");
	$.ajax({  
   		type:"POST", //默认为GET  
   		/*
   		默认为window.location  
   		*/
   		url:mUrl,
   		/*
   		默认为application/x-www-form-urlencoded
   		contentType:"application/json"
   		*/
   		contentType:"text/plain",  
  		data:mData,
  		/*
  		默认为text/html  可用调用$serialize函数把该对象转换为一键/值对字符串。
  		*/
   		dataType:"json",
   		/*
   		Ajax请求成功时调用的函数  
   		*/
   		success:function(data){
   			 if(data.RESULT==1)
   			 {
   			 	/*
   			 	 登录成功 
   			 	 */
   			 	if($("input[name='RbtnG']:checked").val()=="metro")
   			 	{
					window.location.href=getRanUrl("metroindex.jsp");
   			 	}
   			 	else
   			 	{
					window.location.href=getRanUrl("index.jsp");
   			 	}
   			 }
   			 else
   			 {
   			 	$.ui.popup({
	   			 	/*
	   			 	提示
	   			 	*/
					title:"\u63D0\u793A",
					message:data.MSG,
					/*
					确定
					*/
					cancelText:"\u786E\u5B9A", 
					cancelCallback: function(){},
					cancelOnly:true
				});
   			 }
   		}, 
   		/*
   		Ajax请求出错时调用的函数
   		*/
   		error:function(data){
   		   	}
		});
}
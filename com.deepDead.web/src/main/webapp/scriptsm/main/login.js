function login()
{ 
	var name=$("#name").val();
	var pwd=$("#password").val();
	/*
	�������¼�˺š�
	*/
	if(name==mEmpty || name=="\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7\u00B7")
	{
		$.ui.popup({
		/*
		��ʾ
		*/
		title:"\u63D0\u793A",
		/*
		�������¼�˺�
		*/
		message:"\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7",
		/*
		ȷ��
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
		��ʾ
		*/
		title:"\u63D0\u793A",
		/*
		�������¼����
		*/
		message:"\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801",
		/*
		ȷ��
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
   		type:"POST", //Ĭ��ΪGET  
   		/*
   		Ĭ��Ϊwindow.location  
   		*/
   		url:mUrl,
   		/*
   		Ĭ��Ϊapplication/x-www-form-urlencoded
   		contentType:"application/json"
   		*/
   		contentType:"text/plain",  
  		data:mData,
  		/*
  		Ĭ��Ϊtext/html  ���õ���$serialize�����Ѹö���ת��Ϊһ��/ֵ���ַ�����
  		*/
   		dataType:"json",
   		/*
   		Ajax����ɹ�ʱ���õĺ���  
   		*/
   		success:function(data){
   			 if(data.RESULT==1)
   			 {
   			 	/*
   			 	 ��¼�ɹ� 
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
	   			 	��ʾ
	   			 	*/
					title:"\u63D0\u793A",
					message:data.MSG,
					/*
					ȷ��
					*/
					cancelText:"\u786E\u5B9A", 
					cancelCallback: function(){},
					cancelOnly:true
				});
   			 }
   		}, 
   		/*
   		Ajax�������ʱ���õĺ���
   		*/
   		error:function(data){
   		   	}
		});
}
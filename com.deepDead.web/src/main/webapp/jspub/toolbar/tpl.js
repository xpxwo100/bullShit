var toolbarHtml = '<span id="toolbarHtml"></span>';
function menuInit(options, success, response) {
	var data = JSON.parse(response.responseText);
	navInit(options, success, response);// 左边导航栏
	if (data == null || data.length == 0) {
		return;
	}
	var subMenuHtml = ''; // 一、二、三级菜单
	for (var i = 0; i < data.length; i++) {
		var mDataItem = data[i];
		// 导航菜单
		if (mDataItem.p == 1) {
			subMenuHtml += '<li class="dropdown">';
			if(mDataItem.t=="业务构建"){
				subMenuHtml += '<a href="#" class="dropdown-toggle" style="color:#fb6e39;" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
					+ mDataItem.t + '<span class="caret"></span></a>';
			}else{
				subMenuHtml += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
					+ mDataItem.t + '<span class="caret"></span></a>';
			}
			
			if (i + 2 >= data.length) {
				subMenuHtml += '<ul class="dropdown-menu dropdown-menu-right">';
			} else {
				subMenuHtml += '<ul class="dropdown-menu">';
			}
			var mDataItemChild = mDataItem.children;
			if (mDataItemChild && mDataItemChild.length > 0) {
				// 获取二级菜单下单个三级菜单最大长度
				var mMaxThirdMenu = 0;
				for (var j = 0; j < mDataItemChild.length; j++) {
					var mChildSecond = mDataItemChild[j].children;
					if (mChildSecond && mChildSecond.length > 0) {
						if (mMaxThirdMenu < mChildSecond.length) {
							mMaxThirdMenu = mChildSecond.length;
						}
					}
				}
				// 单独增加一个二级菜单行
				mMaxThirdMenu++;
				// 构建最大的Table行列
				var mTable = document.createElement("table");
				mTable.style.width = "100%";
				if (mMaxThirdMenu > 1) {
					for (var mi = 0; mi < mMaxThirdMenu; mi++) {
						var tmpRow = mTable.insertRow();
						for (var mj = 0; mj < mDataItemChild.length; mj++) {
							tmpRow.insertCell();
						}
						if (mi == 0) {
							tmpRow.style.height = "23px";
						} else {
							tmpRow.style.height = "28px";
						}
					}
				}
				// 二级菜单
				for (var j = 0; j < mDataItemChild.length; j++) {
					var mCell = mTable.rows[0].insertCell(j);
					mCell.innerHTML = '<li class="dropdown-header">'
							+ mDataItemChild[j].t + '</li>';
					// mCell.innerHTML+='<li role="separator"
					// class="divider"></li>';
					mCell.style.textAlign = "center";

					var mChildSecond = mDataItemChild[j].children;
					if (mChildSecond && mChildSecond.length > 0) {
						// 三级菜单
						for (var k = 0; k < mChildSecond.length; k++) {
							// 从第二行开始增加三级菜单
							var tmpCell = mTable.rows[(k + 1)].cells[j];
							var mchild = mChildSecond[k];
							//记录菜单编码
							authMenu.push(mchild.c);
							menuDataCache[mchild.c] = mchild.t;
							//设置菜单可点击
							tmpCell.innerHTML = '<li><a href="javascript:void(0);" onclick="openNewTab(\''
									+ mchild.c
									+ '\',\''
									+ mchild.t
									+ (mchild.url ? '\',\'' + mchild.url : '')
									+ '\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
									+ mchild.t
									+ '&nbsp;&nbsp;</a></li>';
							tmpCell.style.textAlign = "left";
						}
					}
				}
				subMenuHtml += mTable.outerHTML;
			}
			subMenuHtml += '</ul>';
			subMenuHtml += '</li>';
		}
		// 定义工具菜单
		var leftInfoMenu = '<li>'
				+ '<a href="#">'
				+ '<table>'
				+ '<tr>'
				+ '<td><div id="changeUsr" style="color:#000;"></div></td>'
				+ '<td><div id="divUser" style="color:#000;"></div></td>'
				+ '<td><img id="main_msgWarn" onclick="msgWarn_Click();" alt="点击打开消息管理" src="./jspub/msg/images/icon16_infomsg.png" style="display:none;cursor:hand;"></img></td>'
				+ '</tr>'
				+ '</table>'
				+ '</a>'
/*				+ '</li>'
				+ '<li><a id="changeUsr" href="javascript:void(0);" onclick="changeUser();" style="color:#000;margin-right:-25px;">切换 </a></li>'*/
				+ '</li>'
				+ '<li><a href="javascript:void(0);" onclick="logout();" style="color:#000;">退出</a></li>'
				+ '<li><a target="_blank" href="/srm/site/index/index.jsp" style="color: #fb6e39;">我的商城</a></li>'
				+ '</ul>';
		// 进行toolbar填充
		document.getElementById("ulMainMenu").innerHTML = (leftInfoMenu + subMenuHtml);
	}

	var modifyPanel = Ext.create('Ext.form.Panel', {
		bodyPadding : 20,
		width : 350,
		defaults : {
			anchor : '100%'
		},
		defaultType : 'textfield',
		items : [{
					fieldLabel : "新密码",
					id : 'firstPassowrd',
					minLength : 8,
					minLengthText : '密码不能少于8位',
					width : 80,
					inputType : 'password',
					allowBlank : false,
					blankText : '密码不能为空'
				}, {
					fieldLabel : '确认密码',
					id : 'lastPassowrd',
					inputType : 'password',
					minLength : 8,
					minLengthText : '密码不能少于8位',
					width : 80,
					allowBlank : false,
					blankText : '密码不能为空'
				}],
		buttons : [{
			id : 'confirmModify',
			text : '确认修改',
			formBind : true, // only enabled once the
			// form is valid
			disabled : true,
			listeners : {
				"click" : function() {
					var form = this.up('form').getForm();
					var fpsw = form.findField('firstPassowrd').getValue();
					var lpsw = form.findField('lastPassowrd').getValue();
					if (fpsw.length < 8 || lpsw.length < 8) {
						Ext.MessageBox.alert('系统提示', '密码长度必须大于8位！');
						form.findField('firstPassowrd').reset();
						form.findField('lastPassowrd').reset();
						return false;
					} else if (fpsw != lpsw) {
						Ext.MessageBox.alert('系统提示', '两次密码输入不一致！');
						form.findField('firstPassowrd').reset();
						form.findField('lastPassowrd').reset();
						return false;
					}
					Ext.Ajax.request({
								url : "user/firstModifyPsw.do",
								params : {
									newPsw : fpsw
								},
								method : 'POST',
								callback : function(options, success, response) {
									var result = JSON
											.parse(response.responseText);
									if (result.success) {
										modifyPassword.close();
										Ext.MessageBox.alert('系统提示',
												'初始密码重置成功！');
									} else {
										Ext.MessageBox.alert('系统提示',
												result.alertMessage.message);
									}
								}
							});

				}
			},
			handler : function() {
			}
		}, {
			text : '重置',
			handler : function() {
				this.up('form').getForm().reset();
			}
		}]
	});

	var modifyPassword = Ext.create('Ext.window.Window', {
				id : 'modifyPsw',
				title : '初始密码修改',
				height : 200,
				modal : true,
				closable : false,
				width : 300,
				layout : 'fit',
				resizable : false,
				items : [modifyPanel],
				listeners : {
					afterRender : function(thisForm, options) {
						this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
									enter : function(event) {
										var btn = Ext.getCmp('confirmModify');
										if (btn.disabled) {
											return false;
										}
										btn.fireEvent('click', this);
									},
									scope : this
								});
					}
				}
			});
	// 获取当前用户
	jQuery.ajax({
		url : "user/getCurrUser.do",
		type : "GET",
		timeout : 0,
		cache : false,
		data : "",
		dataType : "json",
		success : function(resultStr, textStatus) {
			var result = JSON.parse(resultStr);
			currUserId = result.userId;
			currUserName = result.userName;
			currUserType = result.userType;
			companyName = result.companyName;
			companyID = result.companyID;
			// 没有设置登录类型的,则返回选择登录类型界面
			if (!result.useType) {
				window.location = "selectPlatform.jsp";
			}
			currUseType = result.useType;
			//创建首页模板
			createTabPanel();
			//p:购物车传过来的参数
			if(p>0){
				getMerData();
			}
			//c:企业入驻跳转公司认证界面
			if(c>0){
				openNewTab("M000311", "公司认证", "web/ba/certificate/certificate.jsp");
			}
			informations = result.informations;
			unfinished = result.unfinished;
			
			var htmlStr = "您好,<span style='color:#0099cc'>"+ currUserName + "</span>";
			// 初始化完成，这不显示初始化按钮
			if (unfinished != 0){
				htmlStr = "<button id='initialbtn' class='btn btn-primary' title='点击进入初始化设置' " 
					+"style='background:"+(unfinished==0?"#0099cc":"#fb6e39")+";font-family: 微软雅黑;border:#fb6e39;font-size:14px;margin-top:-10px;padding-top:5px;padding-bottom:5px;' onclick=\"openNewTab(\'"
					+ (currUseType == 1 ? "M019999" : "MV019999")
					+ "\',\'初始化引导\')\">初始化引导<span id='unfinished' class='badge' style='margin-left:5px;color:#0099cc;font-weight:bold;'>"+(unfinished==0?"&nbsp;":unfinished)+"</span></button>&nbsp;&nbsp;" 
					+ htmlStr;
			}
			document.getElementById("divUser").innerHTML = htmlStr;
			document.getElementById("companyName").innerText = companyName;
			
			var currentStand = document.getElementById("currentStand");
			currentStand.innerHTML = "<button class='btn btn-primary'"
				+ "style='background:#fb6e39;font-family:微软雅黑;border:#fb6e39;font-size:14px;height:28px;margin-left:-10px;margin-top:-10px;padding-top:5px;padding-bottom:5px;'onclick='changeUser();'>"
				+(currUseType == 1 ? "采购平台" : "供应平台")+ "</button>";
			// 首次登陆,要求客户修改密码
			if (result.isFirstLogin) {
				modifyPassword.show();
			}
		}
	});
}
Array.prototype.remove = function(dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	this.splice(dx, 1);
};
var activatedTabPanelID = new Array();// 已加载完成界面
/**
 * 菜单点击打开界面
 * @param menuCode 菜单编码
 * @param menuText 菜单名称
 * @param url jsp路径
 * @param jsonParams json格式参数,查询页面默认查询条件,超链接传参
 */
function openNewTab(menuCode, menuText, url , jsonParams) {
	if (menuCode == 'M000111') {
		// 注销
		logout();
	} else {
		var tabID = 'tab_' + menuCode;
		var mUrl = 'template/tempLoad.do?menuCode=' + menuCode +"&";
		//如果jsp路径不为空,则加载jsp页面
		if(url){
			mUrl = url + "?";
		}
		//如果jsonParams不为空,则表示该菜单为超链接打开
		if(jsonParams != null){
			tabID = null;
			mUrl += ("jsonParams=" + encodeURIComponent(encodeURIComponent(jsonParams)) + "&");
		}else if (tabPanel.queryById(tabID) != null) {
			//菜单列表点击,如果存在已打开的菜单,激活该菜单
			tabPanel.setActiveTab(tabID);
			return;
		}
		var panel = Ext.create('Ext.panel.Panel', {
					id : tabID,
					title : menuText,
					closable : true,
					layout : 'fit',
			//		loadMask : '页面加载中...',
					html: '<iframe width="100%" height="100%" frameborder="0" src="' 
			            	+ mUrl
			            	+ 'ran='
			            	+ encodeURIComponent(Math.random())
			            	+'"></iframe>'
				});
		var atp = tabPanel.add(panel);
		tabPanel.setActiveTab(atp);
		Ext.get(atp.tab.id).dom.ondblclick = function (e) {  
             if(tabPanel.getActiveTab().title!='首页'){ //tab-1012
            	 var activeTab = tabPanel.activeTab;
                 activeTab.close();  
             }  
         };
	}
}
/**
 * 打开卡片
 * @param menuCode
 * @param menuText
 * @param id
 * @param msgType 1待办/2待阅
 */
function openCardTab(menuCode, menuText,id,msgType) {
		var mUrl = 'template/tempLoad.do?menuCode=' + menuCode +"&id="+id+"&";
		var panel = Ext.create('Ext.panel.Panel', {
					title : menuText,
					closable : true,
					layout : 'fit',
			//		loadMask : '页面加载中...',
					html: '<iframe width="100%" height="100%" frameborder="0" src="' 
			            	+ mUrl
			            	+ 'ran='
			            	+ encodeURIComponent(Math.random())
			            	+'"></iframe>'
				});
		var atp = tabPanel.add(panel);
		tabPanel.setActiveTab(atp);
		Ext.get(atp.tab.id).dom.ondblclick = function (e) {  
             if(tabPanel.getActiveTab().title!='首页'){ //tab-1012
            	 var activeTab = tabPanel.activeTab;
                 activeTab.close();  
             }  
         };
}

// 隐藏菜单
function hiddeToolbarMenu() {
	var J_subMenus = document.getElementById("J_subMenus");
	var childNodes = J_subMenus.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		var childNode = childNodes[i];
		childNode.className = "sub-menu";
	}
}

// 点击事件
function clickToolbarMenu(index) {
	hiddeToolbarMenu();
	var subMenu = document.getElementById("sub_menu_" + index);
	subMenu.className = "sub-menu show";
}

function logout() {
	Ext.MessageBox.show({
				title : '提示',
				msg : '确定退出？',
				buttons : Ext.MessageBox.YESNO,
				icon : Ext.MessageBox.QUESTION,
				fn : function(btn, text) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : 'user/logout.do',
									method : 'POST',
									success : function(response, options) {
										var responseJson = JSON
												.parse(response.responseText);
										if (responseJson.success) {
											window.location = "login.jsp";
											return;
										}
									}
								});
					}
				}
			});
}

/**
 * 切换采购/供应
 */
function changeUser() {
	var msg = currUseType == 1 ?  "供应商登录?" : "采购方登录?";
	Ext.MessageBox.show({
				title : '提示',
				msg : '确定切换为' +  msg,
				buttons : Ext.MessageBox.YESNO,
				icon : Ext.MessageBox.QUESTION,
				fn : function(btn, text) {
					if (btn == 'yes') {
						$.ajax({
							type : 'POST',
							headers:{Accept:"text/json"},
							url : "user/setUseType.do",
							data : {
								useType : currUseType == 1 ? 2:1
							},
							dataType : 'json',
							success : function(data) {
								var obj = data;
								if (obj.alertMessage != null) {
									if (obj.alertMessage.code == "") {
										window.location = "main.jsp";
										return;
									}
								}
							},
							error : function(msg) { // 若Ajax处理失败后返回的信息
							}
						});
					}
				}
			});
}
// 点击打开消息管理界面
function msgWarn_Click() {
	var menuCode = 'M000116';
	var tabPanel = window.parent.tabPanel;
	var panel = Ext.create('Ext.panel.Panel', {
				title : '消息管理',
				height : '100%',
				closable : true,
				html : '<iframe width="100%" height="100%" frameborder="0" src="'
						+ 'template/tempLoad.do?menuCode='
						+ menuCode
						+ '&irandom='
						+ encodeURIComponent(Math.random())
						+ '"></iframe>'
			});
	tabPanel.add(panel);
	tabPanel.setActiveTab(panel);
}
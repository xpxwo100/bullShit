Ext.Loader.setPath('Ext.ux', staticUrl+'/extjs/extend/ux');
Ext.require([ 'Ext.ux.form.APSearchField' ]);

if(cunrrentSourceData == ""){
	cunrrentSourceData ="[]";
}

$(function() {
		var tabPanel = window.parent.tabPanel;
		if(tabPanel != undefined){
		//设置为编辑状态
		tabPanel.activeTab.astatus = 1;
			var tabPanelBeforeclose = tabPanel.activeTab.events.beforeclose;
			if (tabPanelBeforeclose && tabPanelBeforeclose == true){
				// 此判断目的是避免右键--重新加载框架时，重复添加监听
				tabPanel.activeTab.addListener('beforeclose', conrirmTab);
			}
		}
		
		function conrirmTab(panel) {
			if (panel.astatus && panel.astatus != 0){
				if(window.confirm('表单正在修改，确定要关闭页签？')){
	                return true;
	            } else {
	                return false;
	            }
	    	}
		}
		
		$('#myflow')
				.myflow(
						{
							basePath : "",
							restore : eval("("
									+cunrrentSourceData
									//+ "{states:{rect1:{type:'start',text:{text:'开始'}, attr:{ x:391, y:11, width:48, height:50}, props:{text:{value:'开始'}}},rect4:{type:'end',text:{text:'结束'}, attr:{ x:363, y:1050, width:48, height:50}, props:{text:{value:'结束'}}},rect10:{type:'task',text:{text:'起草节点'}, attr:{ x:363, y:106, width:100, height:50}, props:{text:{value:'起草节点'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect12:{type:'fork',text:{text:'分支'}, attr:{ x:11, y:164, width:48, height:50}, props:{text:{value:'分支'}}},rect13:{type:'decision',text:{text:'判断'}, attr:{ x:388, y:231, width:48, height:50}, props:{text:{value:'判断'},condition:{value:'',conditionSource:[],submitValue:''},expr:{value:'',trueValue:'',falseValue:''}}},rect14:{type:'task',text:{text:'抄送节点清濛仓'}, attr:{ x:240, y:349, width:100, height:50}, props:{text:{value:'抄送节点清濛仓'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect15:{type:'task',text:{text:'抄送节点大宅仓'}, attr:{ x:476, y:346, width:100, height:50}, props:{text:{value:'抄送节点大宅仓'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect16:{type:'task',text:{text:'品保部成品检验组(清濛)'}, attr:{ x:208, y:452, width:148, height:50}, props:{text:{value:'品保部成品检验组(清濛)'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect17:{type:'task',text:{text:'品保部成品检验组(晋江)'}, attr:{ x:452, y:452, width:152, height:50}, props:{text:{value:'品保部成品检验组(晋江)'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect18:{type:'task',text:{text:'与SAP交互'}, attr:{ x:227, y:569, width:100, height:50}, props:{text:{value:'与SAP交互'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect19:{type:'task',text:{text:'与SAP交互'}, attr:{ x:483, y:569, width:100, height:50}, props:{text:{value:'与SAP交互'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect20:{type:'decision',text:{text:'判断'}, attr:{ x:252, y:688, width:48, height:50}, props:{text:{value:'判断'},condition:{value:'',conditionSource:[],submitValue:''},expr:{value:'',trueValue:'',falseValue:''}}},rect21:{type:'decision',text:{text:'判断'}, attr:{ x:511, y:685, width:48, height:50}, props:{text:{value:'判断'},condition:{value:'',conditionSource:[],submitValue:''},expr:{value:'',trueValue:'',falseValue:''}}},rect22:{type:'decision',text:{text:'判断'}, attr:{ x:236, y:798, width:48, height:50}, props:{text:{value:'判断'},condition:{value:'',conditionSource:[],submitValue:''},expr:{value:'',trueValue:'',falseValue:''}}},rect23:{type:'decision',text:{text:'判断'}, attr:{ x:510, y:803, width:48, height:50}, props:{text:{value:'判断'},condition:{value:'',conditionSource:[],submitValue:''},expr:{value:'',trueValue:'',falseValue:''}}},rect24:{type:'task',text:{text:'抄送节点'}, attr:{ x:210, y:922, width:100, height:50}, props:{text:{value:'抄送节点'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}},rect25:{type:'task',text:{text:'抄送节点'}, attr:{ x:484, y:920, width:100, height:50}, props:{text:{value:'抄送节点'},assignee:{value:'',dealValue:'user',submitValue:''},desc:{value:''}}}},paths:{path26:{from:'rect1',to:'rect10', dots:[],text:{text:'TO 起草节点'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path27:{from:'rect10',to:'rect13', dots:[],text:{text:'TO 判断'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path28:{from:'rect13',to:'rect15', dots:[],text:{text:'TO 抄送节点大宅仓'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path29:{from:'rect15',to:'rect17', dots:[],text:{text:'TO 品保部成品检验组(晋江)'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path30:{from:'rect17',to:'rect19', dots:[],text:{text:'TO 与SAP交互'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path31:{from:'rect19',to:'rect21', dots:[],text:{text:'TO 判断'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path32:{from:'rect21',to:'rect23', dots:[],text:{text:'TO 判断'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path33:{from:'rect23',to:'rect25', dots:[],text:{text:'TO 抄送节点'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path34:{from:'rect25',to:'rect4', dots:[],text:{text:'TO 结束'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path35:{from:'rect13',to:'rect14', dots:[],text:{text:'TO 抄送节点清濛仓'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path36:{from:'rect14',to:'rect16', dots:[],text:{text:'TO 品保部成品检验组(清濛)'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path37:{from:'rect16',to:'rect18', dots:[],text:{text:'TO 与SAP交互'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path38:{from:'rect18',to:'rect20', dots:[],text:{text:'TO 判断'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path39:{from:'rect20',to:'rect22', dots:[],text:{text:'TO 判断'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path40:{from:'rect22',to:'rect24', dots:[],text:{text:'TO 抄送节点'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path41:{from:'rect24',to:'rect4', dots:[],text:{text:'TO 结束'},textPos:{x:0,y:-10}, props:{text:{value:''}}},path42:{from:'rect22',to:'rect16', dots:[{x:399,y:479}],text:{text:'TO 品保部成品检验组(清濛)'},textPos:{x:-26,y:153}, props:{text:{value:'TO 品保部成品检验组(清濛)'}}},path43:{from:'rect23',to:'rect17', dots:[{x:656,y:477}],text:{text:'TO 品保部成品检验组(晋江)'},textPos:{x:4,y:146}, props:{text:{value:'TO 品保部成品检验组(晋江)'}}},path44:{from:'rect20',to:'rect16', dots:[{x:158,y:714},{x:160,y:476}],text:{text:'TO 品保部成品检验组(清濛)'},textPos:{x:0,y:-10}, props:{text:{value:'TO 品保部成品检验组(清濛)'}}},path45:{from:'rect21',to:'rect17', dots:[{x:423,y:711},{x:421,y:477}],text:{text:'TO 品保部成品检验组(晋江)'},textPos:{x:0,y:-10}, props:{text:{value:'TO 品保部成品检验组(晋江)'}}}},props:{props:{name:{value:'新建流程'},key:{value:''},desc:{value:''}}}}"
									+")"),
							tools : {
								save : {
									onclick : function(data) {
										//alert('save:\n' + data);
										//$("#sourceData").text(data);
										var sourceData = eval('(' + data + ')');
//										console.log(sourceData);
//										return ;
										var flowXml = '<?xml version="1.0" encoding="UTF-8"?><process key="'+id+'" name="'+id+'" xmlns="http://jbpm.org/4.4/jpdl">';
										var tempText = '';
										var processConfigItemDtos = [];
										var stateNames = [];
										var errMsg = "";
										for(var rectKey in sourceData.states){
											var rect = sourceData.states[rectKey];
											var stateName = rect.props.text.value;
											var type = rect.type;
											if(stateNames.length > 0 && Ext.Array.contains(stateNames, stateName)){
								    			Ext.MessageBox.alert('提示', '任务名称违反唯一性规则：' + stateName);
								    			return;
											}else{
												stateNames.push(stateName);
											}
											tempText = ' name="'+stateName+'" g="'+
											rect.attr.x+','+rect.attr.y+','+rect.attr.width+','+rect.attr.height
											+'" ';
											if(type == 'task'){
												tempText += ('assignee="'+rect.props.assignee.dealValue +"@"+rect.props.assignee.submitValue + '" ');
												processConfigItemDtos.push({"taskName":stateName,"taskAssignee":rect.props.assignee.dealValue +"@"+rect.props.assignee.submitValue,"isJudgeNode":0,"isDeploy":0,
													"acTaskData" : rect.acTaskData?rect.acTaskData:""});
												//如果处理人为空,提示
												if(!rect.props.assignee.submitValue){
													errMsg += (stateName +"：处理人为空，请设置！<br>");
												}
											}else if(type == 'decision'){
												var num = GetRandomNum(1,100000);
												var conditionNum = 'condition'+num;
												tempText += ('expr="\#{'+conditionNum+'==true \? \''+rect.props.expr.trueValue+'\' : \''+rect.props.expr.falseValue+'\'}" ');
												processConfigItemDtos.push({"taskName":stateName,"judgeExpression":conditionNum +"#"+rect.props.condition.submitValue,"isJudgeNode":1,"isDeploy":0});
												//如果条件或表达式为空,提示
												if(!rect.props.condition.submitValue || !rect.props.expr.trueValue){
													errMsg += (stateName +"：条件或表达式为空，请设置！<br>");
												}
											}else if(type == 'acTask'){
												tempText += ('assignee="acTask" ');
												type = 'task';
											}else if(type == 'firstTask'){
												tempText += ('assignee="creator" ');
												processConfigItemDtos.push({"taskName":stateName,"taskAssignee":"creator","isJudgeNode":0,"isDeploy":0,
													"acTaskData" : rect.acTaskData?rect.acTaskData:""});
												type = 'task';
											}else if(type == 'sendMsgTask'){
												tempText += ('assignee="sendMsgTask" ');
												processConfigItemDtos.push({"taskName":stateName,"isJudgeNode":0,"isDeploy":0,
													"sendMsgUserIds" : rect.props.moreUserSelect.dealValue +"@"+rect.props.moreUserSelect.submitValue});
												type = 'task';
												//如果抄送人为空,提示
												if(!rect.props.moreUserSelect.submitValue || rect.props.moreUserSelect.submitValue =='undefined'){
													errMsg += (stateName +"：抄送人为空，请设置！<br>");
												}
											}
											flowXml+=('<' + type + tempText +'>');
											for(var pathKey in sourceData.paths){
												var path = sourceData.paths[pathKey];
												if(rectKey == path.from){
													var pathText = path.text.text;
													tempText = '';
													if(pathText){
														tempText = ' name="'+pathText+'"';
													}
													tempText += ' to="'+sourceData.states[path.to].props.text.value+'"';
													var g='';
													if(path.dots.length > 0){
														for(var d=0;d<path.dots.length;d++){
															var dot = path.dots[d];
															g+= (dot.x + ',' + dot.y);
															if((d+1) != path.dots.length){
																g += ';'
															}else{
																g += ':'
															}
														}
													}
													g += (path.textPos.x+','+path.textPos.y);
													flowXml+=('<transition' + tempText + ' g="'+g +'" />');
												}
											}
											flowXml+=('</' + type + '>');
										}
										if(errMsg.length > 0){
							    			Ext.MessageBox.alert('错误提示', errMsg);
							    			return;
										}
										flowXml+='</process>';
										if(processConfigItemDtos.length == 0){
											flowXml = "";
											data = "";
										}
										//$("#sourceData2").text(flowXml);
//										console.log(processConfigItemDtos);
//										return;
										 var mask = comm.getMask('保存中,请稍后...');
							                mask.show();
							                try {
							                    Ext.Ajax.request({
							                        url: "system/processConfig/saveWorkFlowData.do",
							                        params: {
							                            id: id,
							                            sourceData: data,
							                            xmlData: flowXml,
							                            processConfigItemJson: JSON.stringify(processConfigItemDtos)
							                        },
							                        method: 'post',
							                        callback: function(options, success, response) {
							                            var result = Ext.JSON.decode(response.responseText);
							                            if (result.alertMessage.type != "ERROR") {
							                                mask.hide();
							                                Ext.example.msg('系统提示', result.alertMessage.message);
							                                //保存后刷新
							                                var iframe = $("iframe[src*='M000204C&id=" + id + "']",window.parent.document);
							                                if(iframe.length > 0){
								                                var refresh = iframe.contents().find("#btn_M000204C_9-btnWrap");
								                                if(refresh.length > 0){
								                                	refresh.click();
									                             }
								                            }
							                            } else {
							                                mask.hide();
							                                Ext.MessageBox.alert('系统提示', result.alertMessage.message);
							                            }
							                        }
							                    });
							                } catch(err) {
							                    mask.hide();
							                    Ext.MessageBox.alert('操作失败', '失败原因：' + err);
							                }
									}
								}
							}
						});

	});
	
/**
 * 重写参照控件submit方法
 */
function customDevelopSubmitFunction(){
		var me = this;
		var config = me.config;
		var mask = comm.getMask('请稍后...');
		mask.show();
		var saveVStr = '';
		var vStr = '';
		var sourceGrid = null;
		if(me.referGrid){
			sourceGrid = me.referGrid;
			sourceGrid.getSelectionModel().selectAll();  
		}else{
			sourceGrid = me.mainGrid;
		}
		var rs = sourceGrid.getSelectionModel().getSelection();
		if(rs.length == 0){
            Ext.example.msg('提示', '请选择记录！');
            mask.hide();
            return;
		}
		//判断是否多选
		if(config.multiSelect == true){
			Ext.each(rs, function() {
				if(setMoreUserSelectValue(this.get(config.valueField),this.get(config.displayField)) == false){
					return false;
				}
			});
		}else{
			Ext.each(rs, function() {
				saveVStr += this.get(config.valueField) + ',';
				vStr += this.get(config.displayField) + ',';
			});
			
			if (saveVStr.length > 0) {
				saveVStr = saveVStr.substr(0, saveVStr.length - 1);
			}
			if (vStr.length > 0) {
				vStr = vStr.substr(0, vStr.length - 1);
			}
			
			var field = Ext.getCmp(config.fieldId);
			field.submitValue = saveVStr;
			field.selection = true;
			field.setValue(vStr);
		}
		
		mask.hide();
        isCanSubmit = true;
        currentRefId = '';
		me.winClose();
}

function getOptionProperty(target,selectId) {
	var options = $('#'+selectId+' option');
	var val = [];
	options.each(function(index, option){
		if(target=='value'){
			val.push(option.value);
		}else{
			val.push(option.text);
		}
	});
	return val.join(',');
}

/**
 * 设置下拉框的值
 * @param {} valueField
 * @param {} displayField
 */
function setMoreUserSelectValue(valueFieldValue,displayFieldValue){
	var options = $('#moreUserSelect option');
	var val = "";
	for(var i = 0; i < options.length; i++){
		if(options[i].value == valueFieldValue){
			Ext.MessageBox.alert('系统提示',displayFieldValue +' 数据已存在，请重新选择！');
			return false;
		}
	}
	$("#moreUserSelect").append("<option title='"+displayFieldValue+"' value='"+valueFieldValue+"'>"+displayFieldValue+"</option>");
	var userIdObj = $('#userIds');
	var userNameObj = $('#userNames');
	var userIds = userIdObj.val();
	var userNames = userNameObj.val();
	if(userIds && userNames){
		userIdObj.val(userIds+","+ valueFieldValue);
		userNameObj.val(userNames+","+ displayFieldValue);
	}else{
		userIdObj.val(valueFieldValue);
		userNameObj.val(displayFieldValue);
	}
	return true;
}

/**
 * 获取随机数
 * @param {} Min
 * @param {} Max
 * @return {}
 */
function GetRandomNum(Min,Max){
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}

/**
 * 快捷键设置,Shift+R切换选择和流转
 */
$(document).keypress(function(e){
        if (e.shiftKey && e.which==82) {
        	var pointer = $("#pointer"), path = $("#path"), pointerClass = pointer.attr('class');
        	if(pointerClass.indexOf("selected") != -1){
        		path.click();
        	}else{
        		pointer.click();
        	}
       }
}) 
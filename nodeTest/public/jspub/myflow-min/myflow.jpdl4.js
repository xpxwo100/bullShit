(function($){
var myflow = $.myflow;

$.extend(true,myflow.config.rect,{
	attr : {
	r : 8,
	fill : '#F6F7FF',
	stroke : '#03689A',
	"stroke-width" : 2
}
});

$.extend(true,myflow.config.props.props,{
	name : {name:'name', label:'名称', value:'新建流程', editor:function(){return new myflow.editors.inputEditor();}},
	key : {name:'key', label:'标识', value:'', editor:function(){return new myflow.editors.inputEditor();}},
	desc : {name:'desc', label:'描述', value:'', editor:function(){return new myflow.editors.inputEditor();}}
});


$.extend(true,myflow.config.tools.states,{
	start : {
				showType: 'image',
				type : 'start',
				name : {text:'<<start>>'},
				text : {text:'开始'},
				img : {src : 'jspub/myflow-min/img/48/start_event_empty.png',width : 48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text',label: '显示',readonly : true, value:'', editor: function(){return new myflow.editors.textEditor();}, value:'开始'}
				}},
			end : {showType: 'image',type : 'end',
				name : {text:'<<end>>'},
				text : {text:'结束'},
				img : {src : 'jspub/myflow-min/img/48/end_event_terminate.png',width : 48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text',label: '显示',readonly : true,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'结束'}
				}},
			'end-cancel' : {showType: 'image',type : 'end-cancel',
				name : {text:'<<end-cancel>>'},
				text : {text:'取消'},
				img : {src : 'jspub/myflow-min/img/48/end_event_cancel.png',width : 48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text',label: '显示',readonly : true,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'取消'},
					temp1: {name:'temp1', label : '文本',readonly : true,  value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : '选择',readonly : true,  value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			'end-error' : {showType: 'image',type : 'end-error',
				name : {text:'<<end-error>>'},
				text : {text:'错误'},
				img : {src : 'jspub/myflow-min/img/48/end_event_error.png',width : 48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text',label: '显示',readonly : true,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'错误'},
					temp1: {name:'temp1', label : '文本',readonly : true,  value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : '选择',readonly : true,  value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			state : {showType: 'text',type : 'state',
				name : {text:'<<state>>'},
				text : {text:'状态'},
				img : {src : 'jspub/myflow-min/img/48/task_empty.png',width : 48, height:48},
				props : {
					text: {name:'text',label: '显示',readonly : true,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'状态'},
					temp1: {name:'temp1', label : '文本',readonly : true,  value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : '选择',readonly : true,  value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			decision : {showType: 'image',type : 'decision',
				name : {text:'<<decision>>'},
				text : {text:'判断'},
				img : {src : 'jspub/myflow-min/img/48/gateway_exclusive.png',width : 48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text',label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'判断'},
					condition: {name:'condition', label : '条件',readonly : true,  value:'' , submitValue : '' , conditionSource : '', editor: function(){return new myflow.editors.conditionEditor();}},
					expr: {name:'expr', label : '表达式',readonly : true,  value:'', trueValue:'',falseValue:'', editor: function(){return new myflow.editors.selectTaskEditor();}}
				}},
			fork : {showType: 'image',type : 'fork',
				name : {text:'<<fork>>'},
				text : {text:'分支'},
				img : {src : 'jspub/myflow-min/img/48/gateway_parallel.png',width :48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text', label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'分支'}
				}},
			join : {showType: 'image',type : 'join',
				name : {text:'<<join>>'},
				text : {text:'合并'},
				img : {src : 'jspub/myflow-min/img/48/gateway_parallel.png',width :48, height:48},
				attr : {width:48 ,heigth:48 },
				props : {
					text: {name:'text', label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'合并'}
				}},
			task : {showType: 'text',type : 'task',
				name : {text:'<<task>>'},
				text : {text:'任务'},
				img : {src : 'jspub/myflow-min/img/48/task_empty.png',width :48, height:48},
				props : {
					text: {name:'text', label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'任务'},
					assignee: {name:'assignee', label : '处理人',readonly : false,dealValue:'user',submitValue:'', value:'', editor: function(){return new myflow.editors.radioGroupEditor();}},
					desc: {name:'desc', label : '描述',readonly : false, value:'', editor: function(){return new myflow.editors.inputEditor();}}
				}},
			firstTask : {showType: 'text',type : 'firstTask',
				name : {text:'<<task>>'},
				text : {text:'起草节点'},
				img : {src : 'jspub/myflow-min/img/48/task_empty.png',width :48, height:48},
				props : {
					text: {name:'text', label: '显示',readonly : true,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'起草节点'},
					assignee: {name:'assignee', label: '处理人',readonly : true,submitValue:'self', value:'创建人', editor: function(){return new myflow.editors.inputEditor();}},
					desc: {name:'desc', label : '描述',readonly : false, value:'', editor: function(){return new myflow.editors.inputEditor();}}
				}},
			acTask : {showType: 'text',type : 'acTask',
				name : {text:'<<task>>'},
				text : {text:'人工决策'},
				img : {src : 'jspub/myflow-min/img/48/task_empty.png',width :48, height:48},
				props : {
					text: {name:'text', label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'人工决策'},
					desc: {name:'desc', label : '描述',readonly : false, value:'', editor: function(){return new myflow.editors.inputEditor();}}
				}},
			sendMsgTask : {showType: 'text',type : 'sendMsgTask',
				name : {text:'<<task>>'},
				text : {text:'抄送节点'},
				img : {src : 'jspub/myflow-min/img/48/task_empty.png',width :48, height:48},
				props : {
					text: {name:'text', label: '显示',readonly : false,  value:'', editor: function(){return new myflow.editors.textEditor();}, value:'抄送节点'},
					moreUserSelect: {name:'moreUserSelect', label: '抄送人', dealValue:'user', value:'', editor: function(){return new myflow.editors.moreUserSelectEditor();}},
					desc: {name:'desc', label : '描述',readonly : false, value:'', editor: function(){return new myflow.editors.inputEditor();}}
				}}
});
})(jQuery);
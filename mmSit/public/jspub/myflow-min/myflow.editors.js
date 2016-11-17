(function($){
var myflow = $.myflow;

$.extend(true, myflow.editors, {
	inputEditor : function(){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;
			var strInput = '<input  style="width:100%;"/>';
			if(props[_k].readonly){
				strInput = '<input  style="width:100%;background:#DDD;" readonly ="'+props[_k].readonly+'"/>';
			}
			$(strInput).val(props[_k].value).change(function(){
				props[_k].value = $(this).val();
			}).appendTo('#'+_div);
			
			$('#'+_div).data('editor', this);
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	},
	selectEditor : function(arg){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;

			var sle = $('<select  style="width:100%;"/>').val(props[_k].value).change(function(){
				props[_k].value = $(this).val();
			}).appendTo('#'+_div);
			
			if(typeof arg === 'string'){
				$.ajax({
				   type: "GET",
				   url: arg,
				   async: false,
				   success: function(data){
					  var opts = eval(data);
					 if(opts && opts.length){
						for(var idx=0; idx<opts.length; idx++){
							sle.append('<option value="'+opts[idx].value+'">'+opts[idx].name+'</option>');
						}
						sle.val(_props[_k].value);
					 }
				   }
				});
			}else {
				for(var idx=0; idx<arg.length; idx++){
					sle.append('<option value="'+arg[idx].value+'">'+arg[idx].name+'</option>');
				}
				sle.val(_props[_k].value);
			}
			
			$('#'+_div).data('editor', this);
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	},	
	radioGroupEditor : function(){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r,isFirst = true;
			
			Ext.create('Ext.form.Panel', {
			    width: 'auto',
			    height: 'auto',
			    bodyPadding: 10,
			    renderTo: _div,
			    items:[{
			        xtype: 'radiogroup',
			        id: 'radiogroupDeal',
			        columns: 2,
			        vertical: false,
			        items: [
			            { boxLabel: '用户', name: 'dealValue', inputValue: 'user', checked: true },
			            { boxLabel: '角色', name: 'dealValue', inputValue: 'role'}
			        ],
			     listeners:{
			    	 'change':function(field,newValue,oldValue,eOpts){
			    		 if(isFirst==false){
				    		 var role = Ext.getCmp("referfield_role");
				    		 var user = Ext.getCmp("referfield_user");
			    			 _props[_k].dealValue = newValue.dealValue;
			    			 _props[_k].submitValue = '';
			    			 _props[_k].value = '';
				    		 if(newValue.dealValue == 'user'){
				    			 role.setValue("");
				    			 role.hide();
				    			 user.show();
				    		 }else{
				    			 user.setValue("");
				    			 user.hide();
				    			 role.show();
				    		 }
			    		 }else{
			    			 isFirst = false;
			    		 }
			    	 }
			       }
			    },
	            {
	    			xtype : 'referfield',
	    			id : 'referfield_user',
	    			name : 'userName',
	    			width : 'auto',
	    			allowBlank : true,
	    			emptyText : '',
	    			readOnly : false,
	    			hidden : false,
	    			enableKeyEvents : true,
	    			blankText : '此项不能为空',
	    			displayField:'name',
	    			valueField:'code',
	    			submitName:'code',
	    			referCode:'Ref00010',
	    			multiSelect:false
	    		},
	            {
	    			xtype : 'referfield',
	    			id : 'referfield_role',
	    			name : 'roleName',
	    			width : 'auto',
	    			allowBlank : true,
	    			emptyText : '',
	    			readOnly : false,
	    			hidden : false,
	    			enableKeyEvents : true,
	    			blankText : '此项不能为空',
	    			displayField:'name',
	    			valueField:'code',
	    			submitName:'code',
	    			referCode:'Ref00028',
	    			multiSelect:false
	    		}]
			});

	   		Ext.getCmp("radiogroupDeal").setValue({dealValue : _props[_k].dealValue});
	   		isFirst = false;
	   		 var user = Ext.getCmp("referfield_user");
	   		 var role = Ext.getCmp("referfield_role");
			 if(_props[_k].dealValue == 'user'){
				 role.hide();
				 role.setValue('');
				 role.submitValue = '';
				 user.show();
				 user.setValue(_props[_k].value);
				 user.submitValue = _props[_k].submitValue;
			 }else{
				 user.hide();
				 user.setValue('');
				 user.submitValue = '';
				 role.show();
				 role.setValue(_props[_k].value);
				 role.submitValue = _props[_k].submitValue;
			 }
			 $('#'+_div).data('editor', this);
		};
		this.destroy = function(){
	   		if(_props[_k].dealValue == 'user'){
		   		 var user = Ext.getCmp("referfield_user");
				 _props[_k].submitValue = user.submitValue;
				 _props[_k].value = user.getValue();
	   		}else{
		   		 var role = Ext.getCmp("referfield_role");
				 _props[_k].submitValue = role.submitValue;
				 _props[_k].value = role.getValue();
	   		}
		};
	},
	selectTaskEditor : function(){
		var _props,_k,_div,_src,_r,selectForm,selectWin,selectTaskObj;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;selectTaskObj = props[_k];
			var currentTrueValue = '无',currentFalseValue = '无',newTrueValue = selectTaskObj.trueValue,newFalseValue = selectTaskObj.falseValue;
			if(newTrueValue != '' && newTrueValue){
				currentTrueValue = newTrueValue;
			}
			if(newFalseValue != '' && newFalseValue){
				currentFalseValue = newFalseValue;
			}
			var strInput = '<input id="expr" style="width:100%;"/><br><div id="selectTask"></div>';
			if(selectTaskObj.readonly){
				strInput = '<input id="expr" style="width:100%;background:#DDD;" readonly ="'+selectTaskObj.readonly+'"/><br><div id="selectTask"></div>';
			}
			$(strInput).val(selectTaskObj.value).change(function(){
				selectTaskObj.value = $(this).val();
			}).appendTo('#'+_div);
			
			$('#'+_div).data('editor', this);
			
			Ext.create('Ext.Button', {
			    text: '选择任务',
			    renderTo: 'selectTask',
			    handler: function() {
			    	 if (!selectWin) {
				    	 var taskData = getTaskBydecision(_src);
			    			selectForm = Ext.widget('form', {
			    				id: 'selectTaskForm',
			    				width : 500,
			    				border : false,
			    				bodyPadding : '10 10 0',
			    				defaults : {
			    					anchor : '100%',
			    					allowBlank : false,
			    					msgTarget : 'side',
			    					labelWidth : 50
			    				},
			    				items : [ {
									xtype : 'fieldset',
									width : 500,
									border : false,
									fieldDefaults : {
										labelAlign : 'right',
										labelSeparator:'',
										msgTarget : 'side'
									},
									items : [{
				    					id: 'container',
				    					xtype : 'fieldcontainer',
				    					labelStyle : 'font-weight:bold;padding:0;',
				    					layout : 'hbox',
				    					defaultType : 'textfield',
				    					width : 500,
				    					height : 100,
				    					fieldDefaults : {
				    						labelAlign : 'right',
				    						labelWidth : 80,
				    						msgTarget : 'side'
				    					},
				    					items : [ new Ext.form.ComboBox({
				    						id : 'trueComboBox',
				    						fieldLabel : '条件为真时',
				    						flex : 1,
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : taskData
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						value : currentTrueValue, //默认选择的项
				    						handelHeight : 10,//下拉列表中拖动手柄的高度
				    					    lastQuery: '',
				    						listeners:{
				    						  	change:function(combo){
				    									var value = combo.getValue();
				    									var filterData = [];
				    									for(var i=0;i < taskData.length; i++){
				    										var data = taskData[i];
				    										if(data.filedLabel == '无' || value != data.filedValue ){
				    											filterData.push(data);
				    										}
				    									}
				    							       	var falseComboBoxStore = Ext.getCmp("falseComboBox").getStore();
				    							       	falseComboBoxStore.loadData(filterData,false);
				    							   }
				    						  }
				    					}), new Ext.form.ComboBox({
				    						id : 'falseComboBox',
				    						fieldLabel : '条件为假时',
				    						flex : 1,
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : taskData
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						value : currentFalseValue, //默认选择的项
				    						handelHeight : 10,//下拉列表中拖动手柄的高度
				    					    lastQuery: '',
				    						listeners:{
				    						  	change:function(combo){
				    									var value = combo.getValue();
				    									var filterData = [];
				    									for(var i=0;i < taskData.length; i++){
				    										var data = taskData[i];
				    										if(data.filedLabel=='无' || value != data.filedValue ){
				    											filterData.push(data);
				    										}
				    									}
				    							       	var trueComboBoxStore = Ext.getCmp("trueComboBox").getStore();
				    							       	trueComboBoxStore.loadData(filterData,false);
				    							  }
				    						  }
				    					}) ]
				    				}]
								  }],
			    				buttons : [ {
			    					text : '确定',
			    					handler : function() {
			    						var trueComboBox = Ext.getCmp("trueComboBox"),falseComboBox = Ext.getCmp("falseComboBox"),
			    						trueValue =trueComboBox.getValue(), falseValue = falseComboBox.getValue(),
			    						expr;
			    						if(!trueValue || !falseValue || trueValue == '无' || falseValue == '无'){
			                                Ext.MessageBox.alert('系统提示', "请选择正确的任务!");
			                                return ;
			    						}
			    						expr = "condition==true ? "+ trueValue + " : " + falseValue;
			    						$("#expr").val(expr);
			    						_props[_k].value = expr;
			    						_props[_k].trueValue = trueValue;
			    						_props[_k].falseValue = falseValue;
			    						selectForm.getForm().reset();
			    						selectWin.hide();
			    					}
			    				}, {
			    					text : '取消',
			    					handler : function() {
			    	                    this.up('form').getForm().reset();
			    	                    this.up('window').hide();
			    	                }
			    				} ]
			    			});
			    			selectWin = Ext.create('Ext.window.Window', {
			    				id : 'selectTaskWindow',
			    				title : '选择任务',
			    				closeAction : 'hide',
			    				height : 150,
			    				modal : true,
			    				width : 600,
			    				layout : 'fit',
			    				resizable : true,
			    				items : [ selectForm ]
			    			});
			    	 }
			    	 selectWin.show();
			    }
			});
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				selectTaskObj.value = $(this).val();
			});
			if(selectWin){
				selectWin.destroy();
				selectWin = null;
			}
		};
	},
	conditionEditor : function(){
		var editor=this,_props,_k,_div,_src,_r,conditionForm,conditionWin,conditionComboxData=[],displayValue,submitValue,sourceLogicalList=[{"filedLabel" : "=" ,"filedValue" : "=="},{"filedLabel" : "<" ,"filedValue" : "<"},{"filedLabel" : "<=" ,"filedValue" : "<="}];
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r,displayValue=props[_k].value,submitValue = props[_k].submitValue,conditionComboxData=props[_k].conditionSource;
			if(conditionComboxData && Ext.isString(conditionComboxData)){
				conditionComboxData = eval("("+_props[_k].conditionSource+")");
			}else if(conditionComboxData == ""){
				conditionComboxData=[];
			}
			var strInput = '<input id="condition" style="width:100%;"/><br><div id="editCondition"></div>';
			if(props[_k].readonly){
				strInput = '<input id="condition" style="width:100%;background:#DDD;" readonly ="'+props[_k].readonly+'"/><br><div id="editCondition"></div>';
			}
			$(strInput).val(displayValue).change(function(){
				props[_k].value = $(this).val();
			}).appendTo('#'+_div);
			
			$('#'+_div).data('editor', this);
			
			Ext.create('Ext.Button', {
			    text: '编辑条件',
			    renderTo: 'editCondition',
			    handler: function() {
			    	 if (!conditionWin) {
			    			conditionForm = Ext.widget('form', {
			    				id: 'editConditionForm',
								width : 'auto',
			    				border : false,
			    				bodyPadding : '10 10 0',
			    				defaults : {
			    					anchor : '100%',
			    					allowBlank : false,
			    					msgTarget : 'side',
			    					labelWidth : 50
			    				},
			    				items : [ {
									xtype : 'fieldset',
									width : 'auto',
									border : false,
									fieldDefaults : {
										labelAlign : 'right',
										labelSeparator:'',
										msgTarget : 'side'
									},
									items : [{
			    						id : 'displayConditionId',
			    				        xtype: 'textfield',
			    				        name: 'name',
			    				        fieldLabel: 'condition =',
			    		    			readOnly : true,
										width : 540,
			    				        allowBlank: true,
			    				        value: displayValue
			    				    }]
								},{
									xtype : 'fieldset',
									width : 'auto',
									border : false,
									fieldDefaults : {
										labelAlign : 'right',
										labelSeparator:'',
										msgTarget : 'side'
									},
									items : [{
				    					xtype : 'fieldcontainer',
				    					labelStyle : 'font-weight:bold;padding:0;',
				    					layout : 'hbox',
				    					defaultType : 'textfield',
				    					width : 'auto',
				    					height : 'auto',
				    					fieldDefaults : {
				    						labelAlign : 'right',
				    						labelWidth : 80,
				    						msgTarget : 'side'
				    					},
				    					items : [ new Ext.form.ComboBox({
				    						id : 'conditionObjComboBox',
											width : 190,
				    						fieldLabel : '条件对象',
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : [
			    							        		{"filedLabel" : "部门" ,"filedValue" : "department"},
				    							        	{"filedLabel" : "战略/非采" ,"filedValue" : "applyType"},
				    							        	{"filedLabel" : "PLM已建档" ,"filedValue" : "isPlmAdd"},
				    							        	{"filedLabel" : "准入结果" ,"filedValue" : "isPassed"},
				    							        	{"filedLabel" : "数值总和" ,"filedValue" : "totalQty"}
//				    							        	{"filedLabel" : "采购类型" ,"filedValue" : "billType"},
//				    							        	{"filedLabel" : "明细条件结果" ,"filedValue" : "processCondition"}
				    							        ]
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						value : 'department', //默认选择的项
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: '',
				    						listeners:{
				    						  	change:function(combo){
				    									var value = combo.getValue(),
					    									billType = Ext.getCmp("referfield_billType"),
					    									department = Ext.getCmp("referfield_department"),
					    									totalQtyForm = Ext.getCmp("totalQtyForm"),
					    									processConditionField = Ext.getCmp("processConditionField"),
					    									applyTypeComboBox = Ext.getCmp("applyTypeComboBox"),
					    									isPlmAddComboBox = Ext.getCmp("isPlmAddComboBox"),
					    									isPassedComboBox = Ext.getCmp("isPassedComboBox");
				    									
				    									if(value == 'billType'){
				    										department.hide().setValue("");
				    										totalQtyForm.hide().getForm().reset();
				    										processConditionField.hide().setValue("");
				    										isPlmAddComboBox.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										billType.show();
				    									}else if(value == 'department'){
				    										totalQtyForm.hide().getForm().reset();
				    										billType.hide().setValue("");
				    										processConditionField.hide().setValue("");
				    										isPlmAddComboBox.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										department.show();
				    									}else if(value == 'totalQty'){
				    										department.hide().setValue("");
				    										billType.hide().setValue("");
				    										processConditionField.hide().setValue("");
				    										isPlmAddComboBox.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										totalQtyForm.show();
				    									}else if(value == 'processCondition'){
				    										department.hide().setValue("");
				    										totalQtyForm.hide().getForm().reset();
				    										billType.hide().setValue("");
				    										isPlmAddComboBox.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										processConditionField.show();
				    									}else if(value == 'applyType'){
				    										department.hide().setValue("");
				    										totalQtyForm.hide().getForm().reset();
				    										billType.hide().setValue("");
				    										processConditionField.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.show();
				    									}else if(value == 'isPlmAdd'){
				    										department.hide().setValue("");
				    										totalQtyForm.hide().getForm().reset();
				    										billType.hide().setValue("");
				    										processConditionField.hide().setValue("");
				    										isPassedComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										isPlmAddComboBox.show();
				    									}else if(value == 'isPassed'){
				    										department.hide().setValue("");
				    										totalQtyForm.hide().getForm().reset();
				    										billType.hide().setValue("");
				    										processConditionField.hide().setValue("");
				    										isPlmAddComboBox.hide().setValue("");
				    										applyTypeComboBox.hide().setValue("");
				    										isPassedComboBox.show();
				    									}
				    							   }
				    						  }
				    					}), {
				    		    			xtype : 'referfield',
				    		    			id : 'referfield_department',
				    		    			name : 'departmentName',
											width : 150,
				    		    			allowBlank : true,
				    		    			emptyText : '',
				    		    			readOnly : false,
				    		    			enableKeyEvents : true,
				    		    			blankText : '此项不能为空',
				    		    			displayField:'name',
				    		    			valueField:'id',
				    		    			submitName:'id',
				    		    			hidden:false,
				    		    			enableKeyEvents:true,
				    		    			referCode:'Ref00025',
				    		    			multiSelect:false
				    		    		}, {
				    		    			xtype : 'referfield',
				    		    			id : 'referfield_billType',
				    		    			name : 'billTypeName',
											width : 150,
				    		    			allowBlank : true,
				    		    			emptyText : '',
				    		    			readOnly : false,
				    		    			enableKeyEvents : true,
				    		    			blankText : '此项不能为空',
				    		    			displayField:'name',
				    		    			valueField:'code',
				    		    			submitName:'code',
				    		    			hidden:true,
				    		    			enableKeyEvents:true,
				    		    			referCode:'Ref00001#BT',
				    		    			multiSelect:false
				    		    		},Ext.widget('form', {
						    				id: 'totalQtyForm',
											width : 'auto',
						    				border : false,
				    		    			hidden: true,
						    				defaults : {
						    					anchor : '100%',
						    					allowBlank : false,
						    					msgTarget : 'side',
						    					labelWidth : 50
						    				},
						    				items : [{
						    					xtype : 'fieldcontainer',
						    					labelStyle : 'font-weight:bold;padding:0;',
						    					layout : 'hbox',
						    					defaultType : 'textfield',
						    					width : 'auto',
						    					height : 'auto',
						    					fieldDefaults : {
						    						labelAlign : 'right',
						    						labelWidth : 80,
						    						msgTarget : 'side'
						    					},
						    					items : [{
						    		    	        xtype: 'numberfield',
						    		    	        id:'lessThanValue',
													width : 90,
						    		    	        anchor: '100%',
						    		    	        name: 'lessThanValue'
						    		    	    },new Ext.form.ComboBox({
						    						id : 'lessThanComboBox',
						    						name: 'lessThanLogical',
						    						width: 55,
						    						triggerAction : 'all', //单击触发按钮显示全部数据
						    						store : new Ext.data.Store({
						    							autoLoad : true,
						    							autoSync : true,
						    							fields : [ 'filedLabel', 'filedValue' ],
						    							data : sourceLogicalList
						    						}),//设置数据源
						    						displayField : 'filedLabel', //定义要显示的字段
						    						valueField : 'filedValue', //定义值字段
						    						queryMode : 'local', //本地模式
						    						forceSelection : true, //要求输入的值必须在列表中存在
						    						resizable : false, //允许改变下拉列表大小
						    						typeAhead : false, //允许自动选择剩余部分文本
						    						handelHeight : 10,//下拉列表中拖动手柄的高度,
						    					    lastQuery: '',
						    						listeners:{
						    						  	change:function(combo){
					    									var value = combo.getValue(),greaterThanComboBox = Ext.getCmp("greaterThanComboBox"),
					    									greaterThanValue = Ext.getCmp("greaterThanValue");
					    									var filterData = [];
					    									if(value == '=='){
					    										greaterThanComboBox.setValue("").setReadOnly(true);
					    										greaterThanValue.setValue("").setReadOnly(true);
					    									}else{
					    										greaterThanComboBox.setReadOnly(false);
					    										greaterThanValue.setReadOnly(false);
					    										var equalData = combo.findRecordByValue("==");
					    										if(equalData){
					    											filterData = [{"filedLabel" : "<" ,"filedValue" : "<"},
										    							        	{"filedLabel" : "<=" ,"filedValue" : "<="}];
					    										}else{
					    											filterData = sourceLogicalList;
					    										}
					    									}
					    									greaterThanComboBox.getStore().loadData(filterData,false);
						    						  	}
						    						  }
						    					}), {
						    		    	        xtype: 'label',
						    		    	        forId: 'myFieldId',
						    		    	        text: '数值总和',
						    		    	        margin: '0 10 0 10'
						    		    	    },new Ext.form.ComboBox({
						    						id : 'greaterThanComboBox',
						    						name : 'greaterThanLogical',
						    						width: 55,
						    						triggerAction : 'all', //单击触发按钮显示全部数据
						    						store : new Ext.data.Store({
						    							autoLoad : true,
						    							autoSync : true,
						    							fields : [ 'filedLabel', 'filedValue' ],
						    							data : sourceLogicalList
						    						}),//设置数据源
						    						displayField : 'filedLabel', //定义要显示的字段
						    						valueField : 'filedValue', //定义值字段
						    						queryMode : 'local', //本地模式
						    						forceSelection : true, //要求输入的值必须在列表中存在
						    						resizable : false, //允许改变下拉列表大小
						    						typeAhead : false, //允许自动选择剩余部分文本
						    						handelHeight : 10,//下拉列表中拖动手柄的高度,
						    					    lastQuery: '',
						    						listeners:{
						    						  	change:function(combo){
					    									var value = combo.getValue(),lessThanComboBox = Ext.getCmp("lessThanComboBox"),
					    									lessThanValue = Ext.getCmp("lessThanValue");
					    									var filterData = [];
					    									if(value == '=='){
					    										lessThanComboBox.setValue("").setReadOnly(true);
					    										lessThanValue.setValue("").setReadOnly(true);
					    									}else{
					    										lessThanComboBox.setReadOnly(false);
					    										lessThanValue.setReadOnly(false);
					    										var equalData = combo.findRecordByValue("==");
					    										if(equalData){
					    											filterData = [{"filedLabel" : "<" ,"filedValue" : "<"},
										    							        	{"filedLabel" : "<=" ,"filedValue" : "<="}];
					    										}else{
					    											filterData = sourceLogicalList;
					    										}
					    									}
					    									lessThanComboBox.getStore().loadData(filterData,false);
						    						  	}
						    						  }
						    					}),{
						    		    	        xtype: 'numberfield',
						    		    	        id:'greaterThanValue',
													width : 90,
						    		    	        anchor: '100%',
						    		    	        name: 'greaterThanValue'
						    		    	    }]
						    				}]
				    		    		}),{
				    						id : 'processConditionField',
				    				        xtype: 'textfield',
				    				        name: 'name',
				    		    			readOnly : false,
				    		    			hidden: true,
											width : 150,
				    				        allowBlank: true  
				    				    },
				    				    new Ext.form.ComboBox({
				    						id : 'applyTypeComboBox',
				    						name: 'applyType',
				    						width: 100,
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : [{"filedLabel" : "战略" ,"filedValue" : "0"},
				    							        {"filedLabel" : "非采" ,"filedValue" : "1"}]
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: '',
				    		    			hidden: true
				    					}),
				    				    new Ext.form.ComboBox({
				    						id : 'isPlmAddComboBox',
				    						name: 'isPlmAdd',
				    						width: 100,
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : [{"filedLabel" : "是" ,"filedValue" : "1"},
			    							        	{"filedLabel" : "否" ,"filedValue" : "0"}]
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: '',
				    		    			hidden: true
				    					}),
				    					new Ext.form.ComboBox({
				    						id : 'isPassedComboBox',
				    						name: 'isPassed',
				    						width: 100,
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : [{"filedLabel" : "准入" ,"filedValue" : "1"},
			    							        	{"filedLabel" : "不准入" ,"filedValue" : "0"}]
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: '',
					    		    		hidden: true
				    					})
				    				    ]
				    				}]
								},{
									xtype : 'fieldset',
									width : 'auto',
									border : false,
									fieldDefaults : {
										labelAlign : 'right',
										labelSeparator:'',
										msgTarget : 'side'
									},
									items : [{
				    					xtype : 'fieldcontainer',
				    					labelStyle : 'font-weight:bold;padding:0;',
				    					layout : 'hbox',
				    					defaultType : 'textfield',
				    					width : 'auto',
				    					height : 'auto',
				    					fieldDefaults : {
				    						labelAlign : 'right',
				    						labelWidth : 80,
				    						msgTarget : 'side'
				    					},
				    					items : [new Ext.form.ComboBox({
				    						id : 'logicalOperatorComboBox',
											width : 190,
				    						fieldLabel : '逻辑符',
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : [
				    							        	{"filedLabel" : "与" ,"filedValue" : "&&"},
				    							        	{"filedLabel" : "或" ,"filedValue" : "||"}
				    							        ]
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						readOnly : true,
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: ''
				    					}),new Ext.form.ComboBox({
				    						id : 'conditionComboBox',
											width : '350',
				    						triggerAction : 'all', //单击触发按钮显示全部数据
				    						store : new Ext.data.Store({
				    							autoLoad : true,
				    							autoSync : true,
				    							fields : [ 'filedLabel', 'filedValue' ],
				    							data : []
				    						}),//设置数据源
				    						displayField : 'filedLabel', //定义要显示的字段
				    						valueField : 'filedValue', //定义值字段
				    						queryMode : 'local', //本地模式
				    						forceSelection : true, //要求输入的值必须在列表中存在
				    						resizable : false, //允许改变下拉列表大小
				    						typeAhead : false, //允许自动选择剩余部分文本
				    						readOnly : true,
				    						handelHeight : 10,//下拉列表中拖动手柄的高度,
				    					    lastQuery: ''
				    					})]
									}]
								} ],
			    				buttons : [  {
			    					text : '添加',
			    					handler : function() {
			    						var logicalOperatorComboBox = Ext.getCmp("logicalOperatorComboBox"),conditionComboBox = Ext.getCmp("conditionComboBox"),
			    						conditionObjComboBox = Ext.getCmp("conditionObjComboBox"),referfieldBillType = Ext.getCmp("referfield_billType"),referfieldDepartment = Ext.getCmp("referfield_department"),
			    						totalQtyForm = Ext.getCmp("totalQtyForm"),processConditionField = Ext.getCmp("processConditionField"),applyTypeComboBox = Ext.getCmp("applyTypeComboBox"),
			    						isPlmAddComboBox = Ext.getCmp("isPlmAddComboBox"),isPassedComboBox = Ext.getCmp("isPassedComboBox"),
			    						conditionObjValue = conditionObjComboBox.getValue(),conditionObjDisplayValue = conditionObjComboBox.getDisplayValue(),
			    						logicalOperatorValue = logicalOperatorComboBox.getValue(),logicalOperatorDisplayValue = logicalOperatorComboBox.getDisplayValue(),
			    						conditionValue = conditionComboBox.getValue(),conditionDisplayValue = conditionComboBox.getDisplayValue(),
			    						currentDisplayValue = "",currentSubmitValue = "";
			    						
			    						if(conditionComboxData.length > 0){
			    							if(!logicalOperatorValue || !conditionValue){
			    								Ext.MessageBox.alert('系统提示', "请选择逻辑符和其他条件!");
    			                                return ;
			    							}
			    						}
    									if(conditionObjValue == 'billType'){
    										var billTypeValue = referfieldBillType.getValue(),billTypeSubmitValue = referfieldBillType.submitValue;
    										if(billTypeValue && billTypeSubmitValue){
        										currentDisplayValue = conditionObjDisplayValue + "=" + billTypeValue;
        										currentSubmitValue = "@"+conditionObjValue + "@==@" + billTypeSubmitValue+"@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请输入采购类型的值!");
    			                                return ;
    										}
    										referfieldBillType.reset();
    									}else if(conditionObjValue == 'department'){
    										var departmentValue = referfieldDepartment.getValue(),departmentSubmitValue = referfieldDepartment.submitValue;
    										if(departmentValue && departmentSubmitValue){
        										currentDisplayValue = conditionObjDisplayValue + "=" + departmentValue;
        										currentSubmitValue = "@"+conditionObjValue + "@==@" + departmentSubmitValue+"@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请输入部门的值!");
    			                                return ;
    										}
    										referfieldDepartment.reset();
    									}else if(conditionObjValue == 'totalQty'){
    										var formValue = totalQtyForm.getForm().getValues();
    										if(formValue.lessThanValue =="" || formValue.lessThanLogical == ""){
    											formValue.lessThanValue = "";
    											formValue.lessThanLogical = "";
    										}
    										if(formValue.greaterThanValue == "" || formValue.greaterThanLogical == ""){
    											formValue.greaterThanValue = "";
    											formValue.greaterThanLogical = "";
    										}
    										if(formValue.lessThanValue == "" && formValue.greaterThanValue == ""){
    											Ext.MessageBox.alert('系统提示', "请输入数值总和的逻辑符和值!");
    			                                return ;
    										}
    										if(formValue.lessThanValue != "" && formValue.greaterThanValue != ""){
    											if(parseFloat(formValue.lessThanValue) >= parseFloat(formValue.greaterThanValue)){
        											Ext.MessageBox.alert('系统提示', "最小值不能大于等于最大值!");
        			                                return ;
    											}
    										}
    										if(formValue.lessThanLogical == '==' || formValue.greaterThanLogical == '=='){
    											currentDisplayValue = conditionObjDisplayValue + "=" + (formValue.lessThanValue + formValue.greaterThanValue);
        										currentSubmitValue = conditionObjValue + "==" + (formValue.lessThanValue + formValue.greaterThanValue);
    										}else{
    											currentDisplayValue = formValue.lessThanValue + formValue.lessThanLogical + conditionObjDisplayValue + formValue.greaterThanLogical + formValue.greaterThanValue;
        										currentSubmitValue = formValue.lessThanValue + formValue.lessThanLogical + conditionObjValue +"&&"+ conditionObjValue + formValue.greaterThanLogical + formValue.greaterThanValue;
    										}
    										totalQtyForm.getForm().reset();
    									}else if(conditionObjValue == 'processCondition'){
    										var processConditionFieldValue = processConditionField.getValue();
    										if(processConditionFieldValue && processConditionFieldValue.length > 0){
    											currentDisplayValue = conditionObjDisplayValue + "=" + processConditionFieldValue;
        										currentSubmitValue = "@" + conditionObjValue + "@==@" + processConditionFieldValue + "@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请输入明细条件结果的值!");
    			                                return ;
    										}
    										processConditionField.reset();
    									}else if(conditionObjValue == 'applyType'){
    										var applyTypeValue = applyTypeComboBox.getValue(),
    										applyTypeText = applyTypeComboBox.getRawValue();
    										if(applyTypeValue){
    											currentDisplayValue = conditionObjDisplayValue + "=" + applyTypeText;
        										currentSubmitValue = "@" + conditionObjValue + "@==@" + applyTypeValue + "@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请选择战略/非采的值!");
    			                                return ;
    										}
    										applyTypeComboBox.setValue("");
    									}else if(conditionObjValue == 'isPlmAdd'){
    										var isPlmAddValue = isPlmAddComboBox.getValue(),
    										isPlmAddText = isPlmAddComboBox.getRawValue();
    										if(isPlmAddValue){
    											currentDisplayValue = conditionObjDisplayValue + "=" + isPlmAddText;
        										currentSubmitValue = "@" + conditionObjValue + "@==@" + isPlmAddValue + "@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请选择PLM已建档的值!");
    			                                return ;
    										}
    										isPlmAddComboBox.setValue("");
    									}else if(conditionObjValue == 'isPassed'){
    										var isPassedValue = isPassedComboBox.getValue(),
    										isPassedText = isPassedComboBox.getRawValue();
    										if(isPassedValue){
    											currentDisplayValue = conditionObjDisplayValue + "=" + isPassedText;
        										currentSubmitValue = "@" + conditionObjValue + "@==@" + isPassedValue + "@";
    										}else{
    											Ext.MessageBox.alert('系统提示', "请选择准入结果的值!");
    			                                return ;
    										}
    										isPassedComboBox.setValue("");
    									}
    									
			    						if(conditionComboxData.length == 0){
				    						logicalOperatorComboBox.setReadOnly(false);
				    						conditionComboBox.setReadOnly(false);
				    						displayValue = currentDisplayValue;
				    						submitValue = currentSubmitValue;
				    						conditionComboxData.push({"filedLabel" : currentDisplayValue ,"filedValue" : currentSubmitValue});
			    						}else{
			    							if(conditionComboBox.findRecordByValue(currentSubmitValue)){
			    								Ext.MessageBox.alert('系统提示', "已存在相同的条件,请重新输入!");
    			                                return ;
			    							}
			    							displayValue = displayValue.replace(conditionDisplayValue, "(" + conditionDisplayValue + logicalOperatorDisplayValue + currentDisplayValue + ")");
			    							submitValue = submitValue.replace(conditionValue, "(" + conditionValue + logicalOperatorValue + currentSubmitValue + ")"); 
				    						conditionComboxData.push({"filedLabel" : currentDisplayValue ,"filedValue" : currentSubmitValue});
				    						conditionComboxData.push({"filedLabel" : displayValue ,"filedValue" : submitValue});
				    						logicalOperatorComboBox.reset();
			    						}
			    						conditionComboBox.getStore().loadData(conditionComboxData,false);
			    						conditionComboBox.reset();
			    						Ext.getCmp("displayConditionId").setValue(displayValue);
			    	                }
			    				} , {
			    					text : '清空',
			    					handler : function() {
			    						Ext.getCmp("logicalOperatorComboBox").setReadOnly(true),
			    						Ext.getCmp("conditionComboBox").setReadOnly(true);
			    						displayValue = "";
			    						submitValue = "";
			    						conditionComboxData = [];
			    						
			    						Ext.getCmp("conditionComboBox").getStore().loadData(conditionComboxData,false);
			    	                    this.up('form').getForm().reset();
			    						Ext.getCmp("displayConditionId").setValue("");
			    	                }
			    				}, {
			    					text : '确定',
			    					handler : function() {
			    						$("#condition").val(displayValue);
			    						_props[_k].value = displayValue;
			    						_props[_k].submitValue = submitValue;
			    						_props[_k].conditionSource = editor.getConditionSource();
			    						conditionForm.getForm().reset();
			    						Ext.getCmp("displayConditionId").setValue("");
			    						conditionWin.hide();
			    					}
			    				}, {
			    					text : '取消',
			    					handler : function() {
			    	                    this.up('form').getForm().reset();
			    	                    this.up('window').hide();
			    	                }
			    				} ]
			    			});
			    			conditionWin = Ext.create('Ext.window.Window', {
			    				id : 'editConditionWindow',
			    				title : '编辑条件',
			    				closeAction : 'hide',
			    				height : 220,
			    				modal : true,
			    				width : 600,
			    				layout : 'fit',
			    				resizable : true,
			    				items : [ conditionForm ]
			    			});
			    	 }
			    	 if(displayValue){
			    		Ext.getCmp("logicalOperatorComboBox").setReadOnly(false);
 						var conditionComboBox = Ext.getCmp("conditionComboBox");
 						conditionComboBox.setReadOnly(false);
 						conditionComboBox.getStore().loadData(conditionComboxData,false);
						Ext.getCmp("displayConditionId").setValue(displayValue);
			    	 }
			    	 conditionWin.show();
			    }
			});
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
				_props[_k].submitValue = submitValue;
				if(conditionComboxData){
					_props[_k].conditionSource = editor.getConditionSource();
				}
			});
			if(conditionWin){
				conditionWin.destroy();
				conditionWin = null;
			}
		};
		this.getConditionSource = function(){
			var conditionSource = "[";
			for(var i = 0;i < conditionComboxData.length; i++){
				conditionSource += ("{filedLabel : '" + conditionComboxData[i].filedLabel + "' ,filedValue : '"+ conditionComboxData[i].filedValue +"'}");
				if((i + 1) !=  conditionComboxData.length){
					conditionSource += ",";
				}
			}
			conditionSource += "]";
			return conditionSource;
		};
	},
	moreUserSelectEditor : function(){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r,displayValue=props[_k].value,submitValue = props[_k].submitValue,isFirst = true;
			
			var strInput = '<div id="moreUser" style="width:100%;"/><br><div id="deleteBtn"/><select id="moreUserSelect" style="width: 200px;" multiple="true"/><input id="userIds" style="display: none;" /><input id="userNames" style="display: none;" />';
			$(strInput).appendTo('#'+_div);
			Ext.create('Ext.form.Panel', {
			    width: 'auto',
			    height: 110,
			    bodyPadding: 10,
			    renderTo: 'moreUser',
			    items:[{
			        xtype: 'radiogroup',
			        id: 'radiogroupDeal',
			        columns: 2,
			        vertical: false,
			        items: [
			            { boxLabel: '用户', name: 'dealValue', inputValue: 'user', checked: true },
			            { boxLabel: '角色', name: 'dealValue', inputValue: 'role'}
			        ],
			     listeners:{
			    	 'change':function(field,newValue,oldValue,eOpts){
			    		 if(isFirst==false){
				    		 var role = Ext.getCmp("referfield_role");
				    		 var user = Ext.getCmp("referfield_user");
			    			 _props[_k].dealValue = newValue.dealValue;
			    			 _props[_k].submitValue = '';
			    			 _props[_k].value = '';
				    		 if(newValue.dealValue == 'user'){
				    			 role.hide();
				    			 user.show();
				    		 }else{
				    			 user.hide();
				    			 role.show();
				    		 }
				    		$('#moreUserSelect option').remove();
							$('#userIds').val("");
							$('#userNames').val("");
			    		 }else{
			    			 isFirst = false;
			    		 }
			    	 }
			       }
			    },{
	    			xtype : 'referfield',
	    			id : 'referfield_user',
	    			name : 'userName',
	    			width : 'auto',
	    			allowBlank : true,
	    			emptyText : '',
	    			readOnly : false,
	    			hidden : false,
	    			enableKeyEvents:true,
	    			blankText : '此项不能为空',
	    			displayField:'name',
	    			valueField:'id',
	    			submitName:'id',
	    			referCode:'Ref00010',
	    			multiSelect:true
				},
	            {
	    			xtype : 'referfield',
	    			id : 'referfield_role',
	    			name : 'roleName',
	    			width : 'auto',
	    			allowBlank : true,
	    			emptyText : '',
	    			readOnly : false,
	    			hidden : false,
	    			enableKeyEvents : true,
	    			blankText : '此项不能为空',
	    			displayField:'name',
	    			valueField:'id',
	    			submitName:'id',
	    			referCode:'Ref00028',
	    			multiSelect: true
	    		}]
			});
			Ext.create('Ext.Button', {
			    text: '移除',
			    renderTo: 'deleteBtn',
			    handler : function(){
			    		var options = $('#moreUserSelect option:selected');
						if(options.length>0)
						{
							options.remove();
							$('#userIds').val(getOptionProperty("value","moreUserSelect"));
							$('#userNames').val(getOptionProperty("text","moreUserSelect"));
						}else
						{
							 Ext.MessageBox.alert('系统提示','请先选中要删除的值！');
						}
			    }
			});

			//设置值
	   		Ext.getCmp("radiogroupDeal").setValue({dealValue : _props[_k].dealValue});
	   		isFirst = false;
		   	 var user = Ext.getCmp("referfield_user");
	   		 var role = Ext.getCmp("referfield_role");
			 if(_props[_k].dealValue == 'user'){
				 role.hide();
				 user.show();
			 }else{
				 user.hide();
				 role.show();
			 }
			if(displayValue && submitValue){
				var displayValues = displayValue.split(",");
				var submitValues = submitValue.split(",");
				var optionStr = "";
				$.each(displayValues, function(i,val){
					optionStr += "<option title='"+val+"' value='"+submitValues[i]+"'>"+val+"</option>";
				});
				$("#moreUserSelect").append(optionStr);
				$('#userIds').val(submitValue);
				$('#userNames').val(displayValue);
			}

			$('#'+_div).data('editor', this);
		};
		this.destroy = function(){
			_props[_k].submitValue = $('#userIds').val();
			_props[_k].value = $('#userNames').val();
		};
	}
});

function getTaskBydecision(rect){
	var paths = rect.getNextPaths(),taskData = [{"filedLabel":"无","filedValue": "无"}];
	for(var i=0;i<paths.length;i++){
		var textPath = paths[i].text();
		var toRect = paths[i].to();
		if(toRect){
			var toRectText = toRect.text();
			taskData[i+1] = {"filedLabel": toRectText ,"filedValue": textPath};
		}
	}
	return taskData;
}

})(jQuery);
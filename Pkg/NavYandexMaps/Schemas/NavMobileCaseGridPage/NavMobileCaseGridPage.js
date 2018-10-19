Terrasoft.LastLoadedPageData = {
	controllerName: "CaseGridPage.Controller",
	viewXType: "casegridpage"
};

Ext.define("CaseGridPage.Store", {
	extend: "Terrasoft.store.BaseStore",
	config: {
		model: "Case",
		controller: "CaseGridPage.Controller"
	}
});

Ext.define("CaseGridPage.View", {
	extend: "Terrasoft.view.BaseGridPage.View",
	xtype: "casegridpage",
	config: {
		id: "CaseGridPage",
		grid: {
			store: "CaseGridPage.Store"
		}
	},
	
	constructor: function(){
		this.callParent(arguments);
		var ctx = this;
		var button = Ext.create('Ext.Button', {
			text: 'Мои места',
			handler: function(){
				if (!CaseGridPage.isFiltered) {
					Terrasoft.sdk.Module.addFilter("Case", Ext.create("Terrasoft.Filter", {
						compareType: Terrasoft.ComparisonTypes.Equal,
						property: "Number",
						value: "SR00000007"
					}));
					this.addCls("pressed");
					CaseGridPage.isFiltered = true;
				}
				else {
					Terrasoft.sdk.Module.removeFilter("Case");
					this.removeCls("pressed");
					CaseGridPage.isFiltered = false;
				}
				ctx.controller.loadData();
			}
		});

		var navPanel=this.items.items.find(item=>item.$className=="Terrasoft.controls.NavigationPanel");
		navPanel.addButton(button);
		
		if (CaseGridPage.isFiltered)
			button.addCls("pressed");
	}
});

Ext.define("CaseGridPage.Controller", {
	extend: "Terrasoft.controller.BaseGridPage",
	statics: {
		Model: Case
	},
	config: {
		refs: {
			view: "#CaseGridPage"
		}
	},
	onStoreLoad: function(){
		this.callParent(arguments);
		CaseGridPage.CurrentController = this;
		
		var v=this.getView();
		v.controller = this;
	}

	
});
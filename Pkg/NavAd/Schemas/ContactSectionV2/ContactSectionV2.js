define("ContactSectionV2", ["GridUtilitiesV2", "RightUtilities", "ConfigurationConstants", "ServiceHelper",
		"GoogleIntegrationUtilitiesV2"],
	function(gridUtilitiesV2, RightUtilities, ConfigurationConstants, ServiceHelper) {
		return {
			methods: {
				/**
				 * 
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection}
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Click": {"bindTo": "syncLdap"},
						"Caption": "Запустить синхронизацию с AD",
						// "Enabled": {"bindTo": "isAnySelected"}
					}));
					return actionMenuItems;
				},
				
				syncLdap: function() {
					this.showInformationDialog("Началась синхронизация с AD");
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "NavAdLog"
					});
					
					var d = new Date();
					var curr_date = d.getDate();
					var curr_month = d.getMonth() + 1;
					var curr_year = d.getFullYear();
					insert.setParameterValue("Name", "Интеграция с LDAP вручную: " + this.toDoubleChars(curr_date) + "." + this.toDoubleChars(curr_month) + "." + curr_year, Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("NavStartSynchronization", true, Terrasoft.DataValueType.BOOLEAN);
					insert.setParameterValue("NavWithMessageWindow", true, Terrasoft.DataValueType.BOOLEAN);
					insert.execute();
				},
				toDoubleChars: function(v) {
					return v/10 >= 1 ? v.toString() : "0"+v;
				}
			}
		}
		
	});
define("LDAPServerSettings", ["terrasoft", "LDAPServerSettingsResources", "ServiceHelper", "BusinessRuleModule",
		"SecurityUtilities", "ContextHelpMixin", "css!DetailModuleV2"],
	function(Terrasoft, resources, ServiceHelper, BusinessRuleModule) {
		return {
			diff: [
				{
				"operation": "insert",
				"name": "LDAPUsersRequestText",
				"parentName": "FilteringCondition_GridLayout",
				"propertyName": "items",
				"values": {
					"layout": {
							"column": 0,
						"row": 3,
						"colSpan": 18
					},
					"bindTo": "LDAPUsersRequestText",
					"labelConfig": {
						"visible": true,
						"caption": "Список контактов"
					}
				}
			},
                {
                    "operation": "insert",
                    "name": "LDAPContactAttribute",
                    "parentName": "UserAttributes_GridLayout",
                    "propertyName": "items",
                    "values": {
                        "layout": {
                            "column": 10,
                            "row": 4,
                            "colSpan": 8
                        },
                        "enabled": false,
                        "bindTo": "LDAPContactAttribute",
                        "labelConfig": {
                            "visible": true,
                            "caption": "Поле идентификатора контакта в ActiveDirectory"
                        }
                    }
                },
                {
                    "operation": "insert",
                    "name": "LDAPContactAttributeButton",
                    "parentName": "UserAttributes_GridLayout",
                    "propertyName": "items",
                    "values": {
                        "layout": {
                            "column": 18,
                            "row": 4,
                            "colSpan": 1
                        },
                        "itemType": Terrasoft.ViewItemType.BUTTON,
                        "controlConfig": {
                            "menu": {
                                "items": {
                                    "bindTo": "ContactAttributes"
                                }
                            }
                        },
                        
                    }
                },
                {
                    "operation": "merge",
                    "name": "LDAPLastSynchDate",
                    "values": {
                        "visible": false
                    }
                }
				],
			methods: {

				init: function() {
					this.callParent(arguments);
					this.Terrasoft.require(["Contact"], this.initContactAttributes, this);

				},
				
				initContactAttributes: function() {
					var contactAttributes = this.get("ContactAttributes")
					var contactColumns = this.Terrasoft.Contact.columns;
					for(column in contactColumns) {
						if(contactColumns[column].dataValueType == Terrasoft.DataValueType.TEXT) {
							contactAttributes.addItem(this.getButtonMenuItem({
								"Caption": column,
									"Click": {
										"bindTo": "contactAttributeChanged"
									},
									"Tag": column
							}));
						}
					}
				},
				
				contactAttributeChanged: function(value) {
					this.set("LDAPContactAttribute", value || "");
				},
				
                /**
                 * ######## ######## ####### # ######### ######### JSON ########.
                 * @protected
                 * @virtual
                 * @overridden
                 */
                collectValuesOfLDAPSettings: function() {
                    var columnsCollection = this.columns;
                    var filteredColumnsCollection = this.filterForColumns(columnsCollection);
                    var prepareListColumnName = this.get("LDAPEnumFieldName");
                    var ldapLastSynchDateName = this.get("LDAPLastSynchDateName");
                    var LDAPSettingsCollection = [];
                    for (var item in filteredColumnsCollection) {
                        var key = filteredColumnsCollection[item].name;
                        var value = this.get(filteredColumnsCollection[item].name);
                        if (key === prepareListColumnName) {
                            value = value.value ? value.value : value;
                        }
                        var KeyValuePairs = {
                            "Key": key,
                            "Value": value
                        };
                        if (key !== prepareListColumnName + "List") {
                            LDAPSettingsCollection.push(KeyValuePairs);
                        }
                    }
                    return LDAPSettingsCollection;
                },

					/**
				 * LDAP
				 * @protected
				 * @overridden
				 */
				save: function() {
					if (this.validate()) {
						this.callLDAPService("SetSysSettingValues", function(response) {
							if (response && response.success) {
								var message = resources.localizableStrings.StartImportMessage;

                                ServiceHelper.callService("NavAdIntegrationService", "SetContactIntegrationShedule", function(response) {
									
									if (response.SetContactIntegrationSheduleResult == "Ok") {
										this.showInformationDialog(message);
								this.sandbox.publish("BackHistoryState");
									}
									else{
										this.showInformationDialog(response.SetContactIntegrationSheduleResult);
									}
								}, {}, this);
								
								
							} else {
								this.showInformationDialog(response.errorInfo.message);
							}
						});
					}
				},
			},
			
			attributes: {
					LDAPUsersRequestText: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					value: ""
				},
                LDAPContactAttribute: {
                    dataValueType: Terrasoft.DataValueType.TEXT,
                    type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                    isRequired: true,
                    value: ""
                },
                ContactAttributes: {
                	dataValueType: this.Terrasoft.DataValueType.COLLECTION,
                	value: this.Ext.create("Terrasoft.BaseViewModelCollection")
                	
                },
			}
		}
		
	});
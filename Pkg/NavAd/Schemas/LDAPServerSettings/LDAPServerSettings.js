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
                        "bindTo": "LDAPContactAttribute",
                        "labelConfig": {
                            "visible": true,
                            "caption": "Поле идентификатора контакта в ActiveDirectory"
                        }
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
                /**
                 * LDAP
                 * @protected
                 * @overridden
                 */
                onGetSysSettingValues: function(response) {
                	window[this.name] = this;
                    var sysSettingsCollection = response.GetSysSettingValuesResult;
                    if (!sysSettingsCollection) {
                        return;
                    }
                    var ldapLastSynchDateName = this.get("LDAPLastSynchDateName");
                    this.Terrasoft.SysSettings.querySysSettingsItem(ldapLastSynchDateName, function(date) {
                        var lDAPEnumFieldName = this.get("LDAPEnumFieldName");
                        sysSettingsCollection.forEach(function(item) {
                            var key = item.Key;
                            var value = item.Value;
                            if (key !== lDAPEnumFieldName) {
                                if (key === "LDAPServerPassword" || key === ldapLastSynchDateName) {
                                    value = null;
                                }
                                this.set(key, value);
                            } else {
                                this.getColumnByName(key).referenceSchemaName = key;
                                var esq = this.getLookupQuery(null, key, false);
                                esq.enablePrimaryColumnFilter(value);
                                esq.getEntityCollection(function(result) {
                                    if (result.success && result.collection.getCount()) {
                                        var entity = result.collection.getByIndex(0);
                                        var enumConfig = {
                                            value: entity.values.value,
                                            displayValue: entity.values.displayValue
                                        };
                                        this.set(key, enumConfig);
                                    }
                                }, this);
                            }
                        }, this);
                    }, this);
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
			}
		}
		
	});
define("BasePageV2", ["NavRoleCheckHelper", "NavReportMasterConsts"],
	function(NavRoleCheckHelper, NavReportMasterConsts) {
        return {
        	methods: {
        		onEntityInitialized: function () {
					this.callParent(arguments);
					NavRoleCheckHelper.setupUserRoles.call(this);
                },

                onRolesSetup: function () {
					this.addCreateReportButton();
                },

                addCreateReportButton: function () {
                    var isInRole = NavRoleCheckHelper.checkIsUserInRole.call(this, [NavReportMasterConsts.Roles.ReportsEditor]);

                    window.cts = this;
                        var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
                            rootSchemaName: "NavCustomisableReport"
                        });
                        esq.allColumns = true;

                        var filterGroup = Terrasoft.createFilterGroup();
                        filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;


                        var NavSourceEntity = this.get("NavSourceEntity");
                        filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
                            Terrasoft.ComparisonType.EQUAL,
                            "NavCardPage.[SysModule:CardSchemaUId:UID].SysModuleEntity.SysEntitySchemaUId", this.entitySchema.uId));


                        filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
                            Terrasoft.ComparisonType.EQUAL,
                            "NavCardPage.[SysModuleEdit:CardSchemaUId:UId].SysModuleEntity.SysEntitySchemaUId", this.entitySchema.uId));
                        esq.filters.addItem(filterGroup);

                        esq.getEntityCollection(function (response) {
                            var sectionId = this.sandbox.publish("GetHistoryState").state.moduleId;
                            this.sandbox.publish("UpdatePrintButton", {response: response, isInRole: isInRole, cardName: this.name }, [sectionId]);

                            var printButtonItems = this.get("CardPrintMenuItems");

                            if (printButtonItems){
                                if (isInRole) {
                                    var createOption = this.getButtonMenuItem({
                                        Caption: "Создать ПФ",
                                        Click: {"bindTo": "createAutoReport"}
                                    });
                                    printButtonItems.addItem(createOption);
                                }
                            }
                        }, this);



                },
                createAutoReport: function () {
                    debugger;
                }
			},
            messages: {
                "UpdatePrintButton": {
                    mode: this.Terrasoft.MessageMode.PTP,
                    direction: this.Terrasoft.MessageDirectionType.PUBLISH
                }
            }
		}
    });
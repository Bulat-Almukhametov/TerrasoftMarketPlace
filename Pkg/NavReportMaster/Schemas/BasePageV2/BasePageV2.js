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

                        }, this);
                },
			},
            messages: {
                "UpdatePrintButton": {
                    mode: this.Terrasoft.MessageMode.PTP,
                    direction: this.Terrasoft.MessageDirectionType.PUBLISH
                }
            }
		}
    });
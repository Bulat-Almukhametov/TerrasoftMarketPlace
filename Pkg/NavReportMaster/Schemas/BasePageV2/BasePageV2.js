define("BasePageV2", ["RightUtilities"],
	function(RightUtilities) {
        return {
        	methods: {
        		onEntityInitialized: function () {
					this.callParent(arguments);
                    if (this.get("CanManageCustomisableReports") != null) {
                        this.navigateToSysOperationAuditSection();
                    } else {
                        RightUtilities.checkCanExecuteOperation({
                            operation: "CanManageCustomisableReports"
                        }, function(result) {
                            if (result) {
                                this.addCreateReportButton();
                            }
                        }, this);
                    }
                },

                addCreateReportButton: function () {

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
                            this.sandbox.publish("UpdatePrintButton", {response: response, cardName: this.name }, [sectionId]);

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
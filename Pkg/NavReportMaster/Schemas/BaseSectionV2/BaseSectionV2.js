define("BaseSectionV2", ["RightUtilities"],
    function (RightUtilities) {
        return {
            methods: {
                init: function () {
                    this.callParent(arguments);
                    window.ctx = this;

                    this.sandbox.subscribe("UpdatePrintButton", this.updatePrintButton, this, [this.sandbox.id]);
                },

                onGridDataLoaded: function() {
                    this.callParent(arguments);
                    if (this.get("CanManageCustomisableReports") != null) {
                        this.navigateToSysOperationAuditSection();
                    } else {
                        RightUtilities.checkCanExecuteOperation({
                            operation: "CanManageCustomisableReports"
                        }, function(result) {
                            if (result) {
                                this.initPrintButtonItems();
                            }
                        }, this);
                    }
                },

                initPrintButtonItems: function() {
                    var createdOption  = this.getCreateReportButton();
                    var printMenuItems = this.preparePrintButtonCollection(this.moduleSectionPrintFormsCollectionName);
                    printMenuItems.addItem(createdOption);
                    this.set(this.moduleSectionPrintFormsCollectionName, printMenuItems);
                    this.getSectionPrintButtonVisible();
                },

                updatePrintButton: function (cfg) {
                    var printButtonItems =  this.preparePrintButtonCollection(this.moduleCardPrintFormsCollectionName);
                    if (!cfg.response || !cfg.response.success) return;
                    cfg.response.collection.each(function(item) {
                        var id = item.get("Id");
                        if (!printButtonItems.contains(id)){
                            var loadItemOption = this.getButtonMenuItem({
                                Caption: item.get("NavName"),
                                Click: {"bindTo": "downloadAutoReport"}
                            });
                            loadItemOption.set("Tag", id);
                            printButtonItems.add(id, loadItemOption);
                        }
                    }, this);
                    var hasNewReportButton;
                    printButtonItems.collection.items.forEach(function(item) {
                        if (item.get("Click")  && item.get("Click").bindTo == "createAutoReport")
                        {
                            hasNewReportButton = true;
                        }
                    }, this) ;
                    if (!hasNewReportButton) {
                        var createOption = this.getCreateReportButton();
                        createOption.set("Tag", cfg.cardName);
                        printButtonItems.addItem(createOption);
                    }
                    this.set(this.moduleCardPrintFormsCollectionName, printButtonItems);
                    this.getCardPrintButtonVisible();
                },

                getCreateReportButton: function() {
                	return this.getButtonMenuItem({
                        Caption: {"bindTo": "Resources.Strings.NewCustomReportCaption"},
                        Click: {"bindTo": "createAutoReport"}
                    });
                },

                createAutoReport: function (cardName) {
                    var historyState = this.sandbox.publish("GetHistoryState");

                    var esq = Ext.create(Terrasoft.EntitySchemaQuery, {
                        rootSchemaName: "SysSchema"
                    });
                    esq.addColumn("Id");
                    esq.filters.add("NameFilter", Terrasoft.createColumnFilterWithParameter(
                        Terrasoft.ComparisonType.EQUAL, "Name", cardName));
                    esq.filters.add("TopFilter", Terrasoft.createColumnFilterWithParameter(
                        Terrasoft.ComparisonType.EQUAL, "ExtendParent", false));

                    esq.getEntityCollection(function (response) {
                        var cardSchema = response.collection.first();

                        var stateObj = {
                            isSeparateMode: true,
                            schemaName: "NavCustomisableReport1Page",
                            entitySchemaName: "NavCustomisableReport",
                            operation: "add",
                            valuePairs: [
                                {
                                    name: "NavCardPage",
                                    value: cardSchema.get("Id")
                                },
                            ],
                            isInChain: true
                        };

                        this.sandbox.publish("PushHistoryState", {
                            hash: historyState.hash.historyState,
                            stateObj: stateObj
                        });
                        var moduleName = "CardModuleV2";

                        var pageId = this.sandbox.id + "NavCustomisableReport1Page" + "_SubscribedByDeveloper";
                        var moduleParams = {
                            renderTo: "centerPanel",
                            id: pageId,
                            keepAlive: true
                        };

                        this.sandbox.loadModule(moduleName, moduleParams);
                        this.sandbox.subscribe("CardModuleResponse", function (result) {
                            var printButtonItems = this.get("CardPrintMenuItems");
                            if (printButtonItems){
                                var loadNewItemOption = this.getButtonMenuItem({
                                    Caption: result.primaryDisplayColumnValue,
                                    Click: {"bindTo": "downloadAutoReport"}
                                });
                                loadNewItemOption.set("Tag", result.primaryColumnValue);
                                printButtonItems.add(result.primaryColumnValue, loadNewItemOption, printButtonItems.getCount()-1)
                            }
                        }, this, [pageId]);
                    }, this);
                },

                downloadAutoReport: function (reportId) {
                    var entityId = this.getActiveRow().get("Id");
                    var report = document.createElement("a");
                    report.href = "../rest/NavAutoReportService/GetReportFile/" + reportId + "/" + entityId;
                    document.body.appendChild(report);
                    report.click();
                    document.body.removeChild(report);
                }
            },
            messages: {
                "UpdatePrintButton": {
                    mode: this.Terrasoft.MessageMode.PTP,
                    direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
                }
            }
        }
    });
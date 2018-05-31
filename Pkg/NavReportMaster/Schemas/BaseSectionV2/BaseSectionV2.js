define("BaseSectionV2", [],
    function () {
        return {
            methods: {
                init: function () {
                    this.callParent(arguments);
                    window.ctx = this;

                    this.sandbox.subscribe("UpdatePrintButton", this.updatePrintButton, this, [this.sandbox.id]);
                },
                updatePrintButton: function (cfg) {
                    var printButtonItems = this.get("CardPrintMenuItems");
                    if (printButtonItems){
                        if (cfg.response && cfg.response.success){
                            cfg.response.collection.each(function(item){
                                var loadItemOption = this.getButtonMenuItem({
                                    Caption: item.get("NavName"),
                                    Click: {"bindTo": "downloadAutoReport"}
                                });
                                loadItemOption.set("Tag", item.get("Id"));
                                printButtonItems.add(item.get("Id"), loadItemOption);
                            }, this);
                            this.set("IsCardPrintButtonVisible", true);
                        }

                        if (cfg.isInRole) {
                            var createOption = this.getButtonMenuItem({
                                Caption: {"bindTo": "Resources.Strings.NewCustomReportCaption"},
                                Click: {"bindTo": "createAutoReport"}
                            });
                            createOption.set("Tag", cfg.cardName);
                            printButtonItems.addItem(createOption);
                            this.set("IsCardPrintButtonVisible", true);
                        }
                    }
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
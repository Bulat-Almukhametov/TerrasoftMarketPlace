define("NavCustomisableReport1Section", ['ConfigurationEnums'], function (ConfigurationEnums) {
    return {
        entitySchemaName: "NavCustomisableReport",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        methods: {
            /** Переопределение метода добавления записи  */
            addRecord: function (typeColumnValue) {
                var guid = Terrasoft.generateGUID();

                this.showBodyMask();
                var stateObj = {
                    isSeparateMode: true,
                    schemaName: "NavCustomisableReport1Page",
                    entitySchemaName: "NavCustomisableReport",
                    operation: ConfigurationEnums.CardStateV2.ADD,
                    primaryColumnValue: guid,
                    valuePairs: [
                        {
                            name: "Id",
                            value: guid
                        }
                    ],
                    isInChain: true
                };
                this.sandbox.publish("PushHistoryState", {
                    hash: "CardModuleV2/NavCustomisableReport1Page/edit/" + guid,
                    silent: true,
                    stateObj: stateObj
                });
                var moduleName = "CardModuleV2";
                var moduleParams = {
                    renderTo: this.renderTo,
                    id: this.getChainCardModuleSandboxId(typeColumnValue) + "_Nav",
                    keepAlive: true
                };
                this.sandbox.loadModule(moduleName, moduleParams);
            }
        }
    };
});
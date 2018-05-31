define("NavQueryEditModalBoxLoader", ["BaseSchemaModuleV2"], function() {

             Ext.define("Terrasoft.configuration.NavQueryEditModalBoxLoader", {
                    alternateClassName: "Terrasoft.NavQueryEditModalBoxLoader",
                    extend: "Terrasoft.BaseSchemaModule",

                    constructor: function () {
                        this.callParent(arguments);
                    },
                    initSchemaName: function() {
                        this.schemaName = "NavQueryEditModalBox";
                    },

                    initHistoryState: Ext.emptyFn,

                    createViewModel: function(){
                        var viewModel = this.callParent(arguments);
                        return viewModel;
                    }
                });
                return Terrasoft.NavQueryEditModalBoxLoader;
});
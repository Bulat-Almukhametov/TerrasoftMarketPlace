define("NavGMarkerPage", ["BusinessRuleModule"], function (BusinessRuleModule) {
    return {
        entitySchemaName: "NavGMarker",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        modules: /**SCHEMA_MODULES*/{
           
        }/**SCHEMA_MODULES*/,
        diff: /**SCHEMA_DIFF*/[

        ]/**SCHEMA_DIFF*/,
        methods: {
            init: function () {
                this.callParent(arguments);
                window.cts = this;
            },
            NavObjectValueOnChange: function () {
                this.setValidationInfo("NavObjectValue", false, "TODO");
            },

        },
        attributes: {
            "NavObject": {
                lookupListConfig: {
                    columns: ["Name", "UId"],
                    filter: function () {

                        var existsFilter = Terrasoft.createExistsFilter("[SysModuleEntity:SysEntitySchemaUId:UId].Id");
                        var subFilter = Terrasoft.createIsNotNullFilter(
                            Ext.create("Terrasoft.ColumnExpression", {
                                columnPath: "[SysModule:SysModuleEntity:Id].CardSchemaUId"
                            }));
                        existsFilter.subFilters.addItem(subFilter);
                        return existsFilter;
                    }
                }
            },
        },
        rules: {

        },
        businessRules: /**SCHEMA_BUSINESS_RULES*/{}, /**SCHEMA_BUSINESS_RULES*/
        messages: {
            
        }
    };
});

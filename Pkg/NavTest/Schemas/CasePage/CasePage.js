define("CasePage", [], function () {
    return {
        entitySchemaName: "Case",
        attributes: {
            // NavIgnoreFilter: {
            //     "dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
            //     "type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
            //     "value": true
            // }
        },
        details: /**SCHEMA_DETAILS*/{
            "NavGMapDetail526bd221": {
                "schemaName": "NavGMapDetail",
                "entitySchemaName": "NavGMarker",
                filter: {
                    masterColumn: "Id",
                    detailColumn: "NavCase"
                },
            }
        }/**SCHEMA_DETAILS*/,
        modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "NavGMapDetail526bd221",
                "values": {
                    "itemType": 2,
                    "markerValue": "added-detail"
                },
                "parentName": "ProcessingTab",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "merge",
                "name": "SatisfactionLevelComment",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 1
                    }
                }
            },
            {
                "operation": "move",
                "name": "ResoluitonContainer",
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "move",
                "name": "ServiceItem",
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 5
            },
            {
                "operation": "move",
                "name": "SolutionCaptionProfile",
                "parentName": "ResolutionGridLayout",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "move",
                "name": "ParentCase",
                "parentName": "SolutionTab_gridLayout",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "move",
                "name": "FirstSolutionProvidedOn",
                "parentName": "TermsControlGroup_GridLayout",
                "propertyName": "items",
                "index": 3
            }
        ]/**SCHEMA_DIFF*/,
        methods: {},
        rules: {},
        businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
    };
});

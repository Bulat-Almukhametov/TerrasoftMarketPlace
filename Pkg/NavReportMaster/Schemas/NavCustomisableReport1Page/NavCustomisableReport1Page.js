define("NavCustomisableReport1Page", ["BusinessRuleModule", "StructureExplorerUtilities"], function (BusinessRuleModule, StructureExplorerUtilities) {
    return {
        entitySchemaName: "NavCustomisableReport",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        modules: /**SCHEMA_MODULES*/{
            "NavColumnMasterModule": {
                "config": {
                    "schemaName": "NavColumnMasterModule",
                    "isSchemaConfigInitialized": true,
                    "useHistoryState": false
                }
            }
        }/**SCHEMA_MODULES*/,
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "NavName9ee7b3e5-365e-43e6-af40-6b35bb9f98b5",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 0,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "NavName"
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "NavSourceEntity",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 1,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "NavSourceEntity",
                    "enabled": true,
                    "contentType": 5
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "LOOKUPf11f0249-b5d0-438f-857f-52e3da3d127b",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 2,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "NavCardPage",
                    "enabled": true,
                    "contentType": 5
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 2
            },
            {
                "operation": "insert",
                "name": "Tab9a795b56TabLabel",
                "values": {
                    "caption": { "bindTo": "Resources.Strings.MainTabCaption" },
                    "items": []
                },
                "parentName": "Tabs",
                "propertyName": "tabs",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "Tab9a795b56TabLabelGroupbe95f834",
                "values": {
                    "caption": {
                        "bindTo": "Resources.Strings.Tab9a795b56TabLabelGroupbe95f834GroupCaption"
                    },
                    "itemType": 15,
                    "markerValue": "added-group",
                    "items": []
                },
                "parentName": "Tab9a795b56TabLabel",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "Tab9a795b56TabLabelGridLayoute882fea4",
                "values": {
                    "itemType": 0,
                    "items": []
                },
                "parentName": "Tab9a795b56TabLabelGroupbe95f834",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "STRINGa5397b45-bfb2-4635-a5f2-0fa48a6f07b5",
                "values": {
                    "layout": {
                        "colSpan": 18,
                        "rowSpan": 2,
                        "column": 3,
                        "row": 0,
                        "layoutName": "Tab9a795b56TabLabelGridLayoute882fea4"
                    },
                    "bindTo": "NavCaption",
                    "enabled": true,
                    "contentType": 0
                },
                "parentName": "Tab9a795b56TabLabelGridLayoute882fea4",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "STRING2c7cb715-f09a-4f95-96cf-fd803e5c2393",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 3,
                        "column": 0,
                        "row": 3,
                        "layoutName": "Tab9a795b56TabLabelGridLayoute882fea4"
                    },
                    "bindTo": "NavDescription",
                    "enabled": true,
                    "contentType": 0
                },
                "parentName": "Tab9a795b56TabLabelGridLayoute882fea4",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "STRINGe92c6055-43db-4cc8-af30-5a421e078a88",
                "values": {
                    "layout": {
                        "colSpan": 13,
                        "rowSpan": 2,
                        "column": 0,
                        "row": 7,
                        "layoutName": "Tab9a795b56TabLabelGridLayoute882fea4"
                    },
                    "bindTo": "NavFooter",
                    "enabled": true,
                    "contentType": 0
                },
                "parentName": "Tab9a795b56TabLabelGridLayoute882fea4",
                "propertyName": "items",
                "index": 2
            },
            {
                "operation": "insert",
                "name": "ReferenceToCardGroup",
                "values": {
                    "caption": { "bindTo": "ReferenceToCardGroupCaption" },
                    "itemType": 15,
                    "markerValue": "added-group",
                    "items": []
                },
                "parentName": "Tab9a795b56TabLabel",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "ReferenceToCardGroupGridLayout",
                "values": {
                    "itemType": 0,
                    "items": []
                },
                "parentName": "ReferenceToCardGroup",
                "propertyName": "items"
            },
            {
                "operation": "insert",
                "name": "ReferenceToCard",
                "parentName": "ReferenceToCardGroupGridLayout",
                "propertyName": "items",
                "values": {
                    "layout": {
                        "colSpan": 8,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 0,
                    },
                    "bindTo": "ReferenceToCard",
                    "className": 'Terrasoft.TextEdit',
                    "itemType": Terrasoft.ViewItemType.TEXT,
                    "caption": { "bindTo": "Resources.Strings.ReferenceToCardCaption"},
                    "showValueAsLink": true,
                    "onLinkClick": function (ev, el) {
                        ev.stopEvent();
                        this.model.onReferenceToCardClick.call(this.model, this, ev, el);
                        this.reRender();
                    },
                    "getInputType": function() {
                        this.model.set("LinkControl", this);
                        return this.callParent(arguments);
                    },
                    "href": {"bindTo": "getReferenceToCardLink"},
                    "enabled": false,
                },
            },
            {
                "operation": "insert",
                "name": "ClearReferenceToCardButton",
                "parentName": "ReferenceToCardGroupGridLayout",
                "propertyName": "items",
                "values": {
                    "layout": {
                        "colSpan": 3,
                        "rowSpan": 1,
                        "column": 9,
                        "row": 0,
                    },
                    "itemType": this.Terrasoft.ViewItemType.BUTTON,
                    "caption": "X",
                    "style": this.Terrasoft.controls.ButtonEnums.style.RED,
                    "classes": {
                        "textClass": ["actions-button-margin-right"],
                        "wrapperClass": ["actions-button-margin-right"]
                    },
                    "click": {"bindTo": "onClearReferenceToCardButtonClick"},
                    "visible": {
                        "bindTo": "NavReferenceToCardCaption",
                        "bindConfig": {
                            "converter": function(value) {
                                return !!value;
                            }
                        }
                    }
                }
            },
            {
                "operation": "insert",
                "name": "NavColumnMasterModule",
                "values": {
                    "itemType": 4
                },
                "parentName": "Tab9a795b56TabLabel",
                "propertyName": "items",
                "index": 2
            }
        ]/**SCHEMA_DIFF*/,
        methods: {

            init: function () {
                this.callParent(arguments);
                this.sandbox.subscribe("GetColumnsValues", this.onGetColumnsValues, this, ["NavColumnMasterModule"]);
                this.sandbox.subscribe("SaveGridSettings", this.onSaveGridSettings, this, ["NavColumnMasterModule"]);
                this.sandbox.subscribe("OnFiltersChanged", this.onFiltersChanged, this, ["NavReportExtendedFilterEditModule"]);
                this.sandbox.subscribe("GetFilterModuleConfig", this.getFilterModuleConfig, this, ["NavReportExtendedFilterEditModule"]);

                this.on("change:NavSourceEntity", function () {
                    var entity = this.get("NavSourceEntity");
                    this.sandbox.publish("RenderGridSettings", entity, ["NavColumnMasterModule"]);
                    if (this.model.attributes.IsEntityInitialized) {
                    	this.onClearReferenceToCardButtonClick();
                    }
                }, this);

                window.cts = this;
            },

            onEntityInitialized: function () {
                this.callParent(arguments);
                this.setReferenceToCardCaption();
            },


            onClearReferenceToCardButtonClick: function () {
                this.set("NavReferenceToCardCaption", "");
                this.set("NavReferenceToCardPath", "");
                var control = this.get("LinkControl");
                control.reRender();
            },

            getReferenceToCardLink: function () {
                var href = {};
                var value = this.get("NavReferenceToCardCaption");

                href.url = "#";
                href.caption = value || this.get("Resources.Strings.AddReferenceToCardLinkCaption");

                return href;
            },

            onReferenceToCardClick: function (control, ev, el) {
                var entity = this.get("NavSourceEntity");
                var card = this.get("NavCardPage");
                if (!card)
                    return;

                var schemaBuilder = this.Ext.create("Terrasoft.SchemaBuilder");
                var config = {
                    schemaName: card.Name
                };
                schemaBuilder.requireAllSchemaHierarchy(config, function(baseHierarchy) {
                    var schema = baseHierarchy.find(item => !!item.entitySchemaName);

                    var structureExplorerConfig = {
                        schemaName: entity.Name,
                        lookupsColumnsOnly: true,
                        useBackwards: false,
                        allowedReferenceSchemas: [schema.entitySchemaName]
                    };
                    StructureExplorerUtilities.Open(this.sandbox, structureExplorerConfig, this.onGetLinkToCard,
                        null, this);


                }, this);
            },

            onGetLinkToCard: function (args) {
                this.set("NavReferenceToCardCaption", args.leftExpressionCaption || "");
                this.set("NavReferenceToCardPath", args.leftExpressionColumnPath || "");
                var control = this.get("LinkControl");
                control.reRender();
            },

            onSaveGridSettings: function (profile) {
                var conf = JSON.parse(profile.listedConfig);
                var result = [];
                for (item of conf.items) {
                    result.push({path: item.path, caption: item.caption, width: item.position.colSpan});
                }
                this.set("NavColumns", JSON.stringify(result));
                this.set("NavGridSettings", JSON.stringify(profile));
            },

            onFiltersChanged: function (args) {
                // var emptyFilter = Ext.create("Terrasoft.FilterGroup").serialize();
                // if (emptyFilter === args.serializedFilter) {
                //     return;
                // }
                this.set("NavFilters", args.serializedFilter);
            },

            getFilterModuleConfig: function () {
                return {
                    rootSchemaName: this.get("NavSourceEntity").Name,
                    filters: this.get("NavFilters")
                };
            },
            setReferenceToCardCaption: function () {
                var caption = this.get("NavReferenceToCardCaption");
                this.set("ReferenceToCard", caption || "Добавить");
            }
        },
        attributes: {
            "NavSourceEntity": {
                lookupListConfig: {
                    columns: ["Name", "UId"],
                    filter: function () {

                        var filterGroup = Terrasoft.createFilterGroup();
                        filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;

                        filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
                            "ManagerName", "EntitySchemaManager"));
                        filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
                            "ExtendParent", 0));

                        return filterGroup;
                    }
                }
            },
            "NavCardPage": {
                lookupListConfig: {
                    columns: ["Name"],
                    filter: function () {
                        var filterGroup = Terrasoft.createFilterGroup();
                        filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;

                        filterGroup.addItem(Terrasoft.createIsNotNullFilter(
                            Ext.create("Terrasoft.ColumnExpression", {
                                columnPath: "[SysModule:CardSchemaUId:UID].SysModuleEntity.SysEntitySchemaUId"
                            })));

                        filterGroup.addItem(Terrasoft.createIsNotNullFilter(
                            Ext.create("Terrasoft.ColumnExpression", {
                                columnPath: "[SysModuleEdit:CardSchemaUId:UId].SysModuleEntity.SysEntitySchemaUId"
                            })));


                        return filterGroup;
                    }
                }
            },
            "ReferenceToCard": {
                dataValueType: Terrasoft.DataValueType.TEXT,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                "dependencies": [
                    {
                        "columns": ["NavReferenceToCardCaption"],
                        "methodName": "setReferenceToCardCaption"
                    }
                ]
            },
        },
        rules: {

        },
        businessRules: /**SCHEMA_BUSINESS_RULES*/{}, /**SCHEMA_BUSINESS_RULES*/
        messages: {
            "RenderGridSettings": {
                mode: this.Terrasoft.MessageMode.PTP,
                direction: this.Terrasoft.MessageDirectionType.PUBLISH
            },
            "SaveGridSettings": {
                mode: this.Terrasoft.MessageMode.PTP,
                direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "OnFiltersChanged": {
                mode: Terrasoft.MessageMode.BROADCAST,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "GetFilterModuleConfig": {
                mode: Terrasoft.MessageMode.BROADCAST,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "StructureExplorerInfo": {
                mode: Terrasoft.MessageMode.PTP,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "ColumnSelected": {
                mode: Terrasoft.MessageMode.PTP,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            }
        }
    };
});

define("NavColumnMasterModule", ["css!NavColumnMasterModule"], function () {
    return {
        diff: /**SCHEMA_DIFF*/ [
            {
                "operation": "insert",
                "name": "ColumnControlGroup",
                "values": {
                    "caption": {"bindTo": "Resources.Strings.ColumnControlGroupCaption"},
                    "itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
                    "items": []
                }
            },
            {
                "operation": "insert",
                "name": "FiltersControlGroup",
                "values": {
                    "caption": {"bindTo": "Resources.Strings.FiltersControlGroupCaption"},
                    "itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
                    "items": []
                }
            },
            {
                "operation": "insert",
                "parentName": "ColumnControlGroup",
                "propertyName": "items",
                "name": "GridSettings",
                "values": {
                    "itemType": this.Terrasoft.ViewItemType.CONTAINER,
                    "id": "NavColumnMasterModuleGridSettings",
                    "items": []
                }
            },
            {
                "operation": "insert",
                "parentName": "FiltersControlGroup",
                "propertyName": "items",
                "name": "FilterProperties",
                "values": {
                    "id": "FilterProperties",
                    "itemType": this.Terrasoft.ViewItemType.CONTAINER,
                    "items": []
                }
            },
            {
                "operation": "insert",
                "parentName": "FiltersControlGroup",
                "propertyName": "items",
                "name": "TextEdit",
                "values": {
                    "bindTo": "TextColumn"
                }
            },
        ] /**SCHEMA_DIFF*/,
        methods: {
            init: function () {
                this.callParent(arguments);
                window[this.name]=this;
                this.sandbox.subscribe("RenderGridSettings", this.rerenderGridSettings, this, ["NavColumnMasterModule"]);
            },

            rerenderGridSettings: function () {
                this.unloadGridSettings();
                this.unloadFilterModule();
                var masterValues = this.sandbox.publish("GetColumnsValues", ["NavSourceEntity"], ["NavColumnMasterModule"]);

                if (masterValues.NavSourceEntity) {
                    this.openGridSettings();
                    this.loadFilterModule();
                }
            },

            onRender: function () {
                this.callParent(arguments);
                window.dtl = this;
                var masterValues = this.sandbox.publish("GetColumnsValues", ["NavSourceEntity"], ["NavColumnMasterModule"]);

                if (masterValues.NavSourceEntity) {
                    this.openGridSettings();
                    this.loadFilterModule()
                }
            },

            openGridSettings: function () {
                var gridSettingsId = this.sandbox.id + "_NavGridSettings";
                this.sandbox.subscribe("GetGridSettingsInfo", this.getGridSettingsInfo, this, [gridSettingsId]);

                this.set("gridSettingsId", gridSettingsId);
                this.sandbox.loadModule("NavGridSettings", {
                    renderTo: "NavColumnMasterModuleGridSettings",
                    keepAlive: true,
                    id: gridSettingsId
                });

            },

            loadFilterModule: function () {
                var moduleId = "NavReportExtendedFilterEditModule";
                this.set("FilterModuleId", moduleId);
                this.sandbox.loadModule("FilterEditModule", {
                    renderTo: "FilterProperties",
                    id: moduleId,
                    keepAlive: true
                });
                var masterValues = this.sandbox.publish("GetColumnsValues", ["NavSourceEntity", "NavFilters"], ["NavColumnMasterModule"]);
                var scope = this;
                setTimeout(function () {
                    scope.sandbox.publish("SetFilterModuleConfig", {
                        rootSchemaName: masterValues.NavSourceEntity.Name,
                        filters: masterValues.NavFilters
                    }, [moduleId]);
                }, 200);
            },

            unloadFilterModule: function () {
                var filterModuleId = this.get("FilterModuleId");
                if (filterModuleId)
                    this.sandbox.unloadModule(filterModuleId, "FilterProperties", true);
            },

            onDestroy: function () {
                this.unloadGridSettings();
                this.unloadFilterModule();

                this.callParent(arguments);
            },

            unloadGridSettings: function () {
                var gridSettingsId = this.get("gridSettingsId");
                if (gridSettingsId)
                    this.sandbox.unloadModule(gridSettingsId, "NavColumnMasterModuleGridSettings", true);
            },

            getGridSettingsInfo: function () {
                var masterValues = this.sandbox.publish("GetColumnsValues", ["NavSourceEntity", "NavGridSettings"], ["NavColumnMasterModule"]);

                // var entitySchema = Terrasoft[masterValues.NavSourceEntity.Name];

                var profile = masterValues.NavGridSettings ? JSON.parse(masterValues.NavGridSettings) : {
                        isTiled: false,
                        listedConfig: "",
                        tiledConfig: "{\"grid\":{\"rows\":3,\"columns\":24},\"items\":[]}",
                        type: Terrasoft.GridType.LISTED
                    };

                var gridSettingsInfo = {};
                gridSettingsInfo.isSingleTypeMode = true;
                gridSettingsInfo.entitySchemaName = masterValues.NavSourceEntity.Name;
                gridSettingsInfo.baseGridType = Terrasoft.GridType.LISTED;
                gridSettingsInfo.profile = profile;
                gridSettingsInfo.hideButtons = true;
                gridSettingsInfo.isTiled = false;
                gridSettingsInfo.isNested = false;
                gridSettingsInfo.hideAllUsersSaveButton = true;
                gridSettingsInfo.useProfileField = true;

                return gridSettingsInfo;
            },
        },
        messages: {
            "RenderGridSettings": {
                mode: Terrasoft.MessageMode.PTP,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "GetGridSettingsInfo": {
                mode: Terrasoft.MessageMode.PTP,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            "GetColumnsValues": {
                mode: Terrasoft.MessageMode.PTP,
                direction: Terrasoft.MessageDirectionType.PUBLISH
            },
            "SetFilterModuleConfig": {
                mode: Terrasoft.MessageMode.BROADCAST,
                direction: Terrasoft.MessageDirectionType.PUBLISH
            }
        },
        attributes: {
            TextColumn: {
                dataValueType: this.Terrasoft.DataValueType.TEXT,
                type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                caption: "Text",
                //isRequired: true,
                value: "some text"
            }
        }

    }
});
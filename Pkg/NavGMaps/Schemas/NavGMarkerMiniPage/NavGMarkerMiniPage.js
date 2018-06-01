define("NavGMarkerMiniPage", ["MiniPageResourceUtilities", "css!NavGMarkerCss"], function () {
    return {
        entitySchemaName: "NavGMarker",
        messages: {
        },
        attributes: {
            "MiniPageModes": {
                "value": [this.Terrasoft.ConfigurationEnums.CardOperation.VIEW,
                    this.Terrasoft.ConfigurationEnums.CardOperation.EDIT,
                    this.Terrasoft.ConfigurationEnums.CardOperation.ADD]
            },
            "ReferenceObject": {
                "dataValueType": Terrasoft.DataValueType.LOOKUP,
                "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                dependencies: [
                    {
                        columns: ["NavObject"],
                        methodName: "onNavObject"
                    },
                    {
                        columns: ["ReferenceObject"],
                        methodName: "onReferenceObject"
                    }
                ]
            },
            "NavObject": {
                lookupListConfig: {
                    columns: ["Name", "UId"],
                    filter: function () {

                        var existsFilter = Terrasoft.createExistsFilter("[SysModuleEntity:SysEntitySchemaUId:UId].Id");
                        var filterGroup = Terrasoft.createFilterGroup();
                        filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;


                        filterGroup.addItem(Terrasoft.createIsNotNullFilter(
                            Ext.create("Terrasoft.ColumnExpression", {
                                columnPath: "[SysModule:SysModuleEntity:Id].CardSchemaUId"
                            })));

                        filterGroup.addItem(Terrasoft.createIsNotNullFilter(
                            Ext.create("Terrasoft.ColumnExpression", {
                                columnPath: "[SysModuleEdit:SysModuleEntity:Id].Id"
                            })));

                        existsFilter.subFilters.addItem(filterGroup);
                        return existsFilter;
                    },
                },

                "ObjectContainerVisible": {
                    "dataValueType": Terrasoft.DataValueType.BOOLEAN,
                    "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                    "value": false
                }
            },
        },
        methods: {
            onEntityInitialized: function () {
                window[this.name] = this;
                this.callParent(arguments);

                var refId = this.get("NavObjectValue");
                if (refId)
                    this.loadLookupDisplayValue("ReferenceObject", refId, Terrasoft.emptyFn);
            },

            showLinkObject: function (event) {
                event.stopPropagation();
                this.set("ObjectContainerVisible", !this.get("ObjectContainerVisible"));
            },

            onNavObject: function () {
                var value = this.get("NavObject");
                if (value) {
                    Terrasoft.require([value], Terrasoft.emptyFn);
                }

                this.set("ReferenceObject", null);
            },

            onReferenceObject: function () {
                var referenceObject = this.get("ReferenceObject");
                var result = referenceObject ? referenceObject.value : "";

                this.set("NavObjectValue", result);
            },

            getLookupQuery: function (filterValue, columnName) {

                var entitySchemaQuery;
                if (columnName == "ReferenceObject") {
                    var entityName = this.get("NavObject").Name;
                    var entity = Terrasoft[entityName];

                    var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
                        rootSchemaName: entityName,
                        rowCount: Terrasoft.SysSettings.lookupRowCount,
                        isPageable: true
                    });
                    entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
                    var primaryDisplayColumn = entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN,
                        "displayValue");
                    primaryDisplayColumn.orderPosition = 1;
                    primaryDisplayColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                    var comparisonType = this.getLookupComparisonType();
                    var lookupFilter = entitySchemaQuery.createPrimaryDisplayColumnFilterWithParameter(
                        comparisonType, filterValue, Terrasoft.DataValueType.TEXT);
                    entitySchemaQuery.filters.add("LookupFilter", lookupFilter);
                    lookupFilter.isEnabled = Boolean(filterValue);
                    var pagingParams = this.pagingParams;
                    if (pagingParams) {
                        this.addPagingParameters(entitySchemaQuery, pagingParams);
                        pagingParams = null;
                    }
                }
                else {
                    entitySchemaQuery = this.callParent([filterValue, columnName]);
                }

                return entitySchemaQuery;
            },

            save: function () {
                var parentMethod = this.getParentMethod();
                var parentMethodArguments = arguments;
                var context = this;

                var geocoder = new google.maps.Geocoder();
                var country = this.get("NavCountry");
                var city = this.get("NavCity");
                var addressString = this.get("NavAddress");

                var address = "";
                if (country) address += country.displayValue + " ";
                if(city) address += city.displayValue + " ";
                if (addressString) address += addressString;

                var longitude = this.get("NavLongitude");
                var latitude = this.get("NavLatitude");

                if (address && !longitude && !latitude) {
                    geocoder.geocode({'address': address}, function (results, status) {
                        if (status == "OK") {
                            var location = results[0].geometry.location;

                            context.set("NavLongitude", location.lng().toString());
                            context.set("NavLatitude", location.lat().toString());

                            parentMethod.apply(context, parentMethodArguments);
                        }
                        else {
                            var caption = "Возникла ошибка при получении координат маркера: ";
                            var message = "неизвестная ошибка.";
                            switch (status) {
                                case "ZERO_RESULTS": {
                                    message = "геокодирование успешно выполнено, однако результаты не найдены. Это может произойти, если геокодировщику был передан несуществующий адрес";
                                    break;
                                }

                                case "OVER_QUERY_LIMIT": {
                                    message = "превышение квоты.";
                                    break;
                                }

                                case "REQUEST_DENIED": {
                                    message = "отклонение запроса.";
                                    break;
                                }

                                case "INVALID_REQUEST": {
                                    message = "INVALID_REQUEST. Как правило, ошибка возникает из-за отсутствия в запросе адреса.";
                                    break;
                                }

                                case "UNKNOWN_ERROR": {
                                    message = "запрос не удалось обработать из-за ошибки сервера. Если повторить попытку, запрос может оказаться успешным.";
                                    break;
                                }
                            }



                            Terrasoft.showInformation(caption + message);
                        }
                    });
                }
                else if (!longitude && !latitude) {
                    this.set("NavLongitude", this.get("defLongitude"));
                    this.set("NavLatitude", this.get("defLatitude"));
                    parentMethod.apply(this, parentMethodArguments);

                }
                else if (longitude && latitude) {
                    parentMethod.apply(this, parentMethodArguments);

                }


            },

            ReferenceObjectVisible: function () {
                return !!this.get("NavObject");
            },

        },
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "remove",
                "name": "OpenCurrentEntityPage"
            },
            {
                "operation": "insert",
                "name": "Name",
                "parentName": "MiniPage",
                "propertyName": "items",
                "values": {
                    "isMiniPageModelItem": true,
                    "layout": {
                        "column": 0,
                        "row": 1,
                        "colSpan": 24
                    }
                }
            },
            {
                "operation": "insert",
                "parentName": "MiniPage",
                "propertyName": "items",
                "name": "ColorButtonCaption",
                "values": {
                    "caption": "Цвет",
                    "itemType": this.Terrasoft.ViewItemType.LABEL,
                    "isMiniPageModelItem": true,
                    "layout": {
                        "column": 0,
                        "row": 2,
                        "colSpan": 4
                    }
                }
            },
            {
                "operation": "insert",
                "parentName": "MiniPage",
                "propertyName": "items",
                "name": "ColorButton",
                "values": {
                    "caption": "Цвет",
                    "itemType": this.Terrasoft.ViewItemType.COLOR_BUTTON,
                    "value": { "bindTo": "NavMarkerColor" },
                    "layout": {
                        "column": 4,
                        "row": 2,
                        "colSpan": 4
                    }
                }
            },
            {
                "operation": "insert",
                "name": "NavCountry",
                "parentName": "MiniPage",
                "propertyName": "items",
                "values": {
                    "isMiniPageModelItem": true,
                    "layout": {
                        "column": 0,
                        "row": 3,
                        "colSpan": 24
                    }
                }
            },

            {
                "operation": "insert",
                "name": "NavCity",
                "parentName": "MiniPage",
                "propertyName": "items",
                "values": {
                    "isMiniPageModelItem": true,
                    "layout": {
                        "column": 0,
                        "row": 4,
                        "colSpan": 24
                    }
                }
            },
            {
                "operation": "insert",
                "name": "NavAddress",
                "parentName": "MiniPage",
                "propertyName": "items",
                "values": {
                    "isMiniPageModelItem": true,
                    "layout": {
                        "column": 0,
                        "row": 5,
                        "colSpan": 24
                    },
                    "controlConfig": {
                        "className": "Terrasoft.controls.MemoEdit",
                        "height": "100px",
                    }
                }
            },
            {
                "operation": "insert",
                "parentName": "MiniPage",
                "propertyName": "items",
                "name": "LinkCaption",
                "values": {
                    "itemType": Terrasoft.ViewItemType.HYPERLINK,
                    "caption": "Ссылка на объект",
                    // "classes": {"labelClass": ["nav-link-labelClass"]},
                    "layout": {
                        "column": 3,
                        "row": 6,
                        "colSpan": 21
                    },
                    "tpl": [
                        '<a id={id} name="{name}"" ',
                        'target="{target}" class="nav-link-labelClass" style="display:inline;" title="{hint}" type="{type}">{caption}',
                        '</a>'
                    ],
                    "click": { "bindTo": "showLinkObject"}


                }
            },
            {
                "operation": "insert",
                "name": "ObjectContainer",
                "parentName": "MiniPage",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "visible": {"bindTo": "ObjectContainerVisible"},
                    "items": [],
                    "layout": {
                        "column": 0,
                        "row": 7,
                        "colSpan": 24
                    }
                }
            },
            {
                "operation": "insert",
                "name": "NavObject",
                "parentName": "ObjectContainer",
                "propertyName": "items",
                "values": {
                    "isMiniPageModelItem": true,

                }
            },
            {
                "operation": "insert",
                "name": "ReferenceObject",
                "parentName": "ObjectContainer",
                "propertyName": "items",
                "values": {
                    "visible": {"bindTo": "ReferenceObjectVisible"},
                    "isMiniPageModelItem": true,

                }
            },


        ]/**SCHEMA_DIFF*/
    };
});
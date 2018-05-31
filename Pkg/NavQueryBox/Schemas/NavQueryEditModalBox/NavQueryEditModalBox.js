define("NavQueryEditModalBox", ["ModalBox", "NavEsqBlocks", "NavToolBox", "NavQueryEditModalBoxResources", "AceEdit",
    "jQuery", "NavJQGrid", "css!NavQueryEditModalBox"], function (ModalBox, Blockly, ToolBox, Resources) {
    return {
        schemaName: "MSPRefuse1ModalBox",
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "Closer",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "",
                    "classes": {
                        "wrapperClass": ["close"]
                    },
                    "click": {"bindTo": "onClose"}
                }
            },
            {
                "operation": "insert",
                "name": "WrapContainer",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "index": 0
                }
            },
            {
                "operation": "insert",
                "name": "HeaderContainer",
                "parentName": "WrapContainer",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "styles": {
                        "height": "40px"
                    },
                    "width": "450px"
                }

            },
            {
                "operation": "insert",
                "name": "HeaderCaption",
                "parentName": "HeaderContainer",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.LABEL,
                    "caption": Resources.localizableStrings.Caption

                }

            },
            {
                "operation": "insert",
                "name": "BlocklyContainer",
                "parentName": "WrapContainer",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "index": 1
                }
            },
            {
                "operation": "insert",
                "name": "SwitchCode",
                "values": {
                    "itemType": 5,
                    "caption": Resources.localizableStrings.SwitchCode,
                    "click": {
                        "bindTo": "onCode"
                    },
                    "style": "green",
                    "pressed": {
                        "bindTo": "CodeMode"
                    }
                },
                "parentName": "WrapContainer",
                "propertyName": "items"
            },
            {
                "operation": "insert",
                "name": "SwitchTable",
                "values": {
                    "itemType": 5,
                    "caption": Resources.localizableStrings.SwitchTable,
                    "click": {
                        "bindTo": "onTable"
                    },
                    "style": "green",
                    "pressed": {
                        "bindTo": "TableMode"
                    }
                },
                "parentName": "WrapContainer",
                "propertyName": "items"
            },
            {
                "operation": "insert",
                "name": "GridWrap",
                "parentName": "WrapContainer",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "index": 2
                }
            },
            {
                "operation": "insert",
                "name": "MyGridContainer",
                "parentName": "GridWrap",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "index": 0,
                    "visible": {
                        "bindTo": "TableMode"
                    }
                }
            },
            {
                "operation": "insert",
                "name": "ExecuteButton",
                "values": {
                    "itemType": 5,
                    "caption": Resources.localizableStrings.ExecuteButton,
                    "click": {
                        "bindTo": "onExecute"
                    },
                    "style": "blue",
                    "visible": {
                        "bindTo": "TableMode"
                    }
                },
                "parentName": "WrapContainer",
                "propertyName": "items"
            },
            {
                "operation": "insert",
                "name": "CopyButton",
                "values": {
                    "itemType": 5,
                    "caption": Resources.localizableStrings.CopyButton,
                    "click": {
                        "bindTo": "copyToClipBoard"
                    },
                    "style": "default",
                    "visible": {
                        "bindTo": "CodeMode"
                    }
                },
                "parentName": "WrapContainer",
                "propertyName": "items"
            },
            {
                "operation": "insert",
                "name": "SourceCode",
                "parentName": "GridWrap",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "items": [],
                    "visible": {
                        "bindTo": "CodeMode"
                    },
                    // "bindTo": "CodeText",
                }
            }

        ]/**SCHEMA_DIFF*/,
        methods: {
            init: function () {
                this.callParent(arguments);
                window.Blockly = Blockly;
                window.queryEditor = this;
                this.on("CodeMode", this.setCodeText, this);
            },

            onTable: function () {
                this.set("TableMode", true);
                this.set("CodeMode", false);
                this.createTable();
            },

            onCode: function () {
                this.set("TableMode", false);
                this.set("CodeMode", true);
                this.setCodeText()
            },

            onExecute: function () {
                var workspace = this.get("workspace");
                var text = Blockly.JavaScript.workspaceToCode(workspace);
                eval(text);
            },

            getMainBlocks: function () {
                return [
                    "select_block",
                    "insert_block",
                    "update_block",
                    "delete_block"
                ];
            },

            onRender: function () {
                this.callParent(arguments);
                var options = {
                    toolbox: ToolBox,
                    collapse: true,
                    comments: true,
                    disable: true,
                    maxBlocks: Infinity,
                    trashcan: true,
                    zoom: {
                        controls: true,
                        wheel: false,
                        startScale: 1,
                        maxScale: 3,
                        minScale: 0.3,
                        scaleSpeed: 1.2
                    }
                };

                var workspace = Blockly.inject("NavQueryEditModalBoxBlocklyContainerContainer", options);
                window.wspc = workspace;


                this.set("workspace", workspace);

                var context = this;
                workspace.addChangeListener(function () {
                    context.setCodeText();
                });
                var qBlocks = this.getMainBlocks();
                workspace.addChangeListener(function (event) {
                    if (event.type == Blockly.Events.BLOCK_MOVE) {
                        var block = workspace.getBlockById(event.blockId);

                        if (block && qBlocks.filter(function (el) {
                                return el == block.type;
                            }).length == 0) {
                            context.setDisabledForBlockAndChilds(block);
                        }

                    }

                    if (event.type == Blockly.Events.BLOCK_CREATE || Blockly.Events.BLOCK_DELETE) {
                        var topBlocks = workspace.topBlocks_.filter(block => qBlocks.indexOf(block.type != -1));
                        if (topBlocks.length > 0) {
                            topBlocks[0].setDisabled(false);
                            for (let i = 1; i < topBlocks.length; i++) {
                                topBlocks[i].setDisabled(true);
                            }
                        }
                    }
                });

                this.createTable();


            },

            setDisabledForBlockAndChilds: function (block) {
                block.setDisabled(!block.parentBlock_ || block.parentBlock_.disabled);

                for (i in block.childBlocks_) {
                    var item = block.childBlocks_[i];
                    arguments.callee(item);
                }

            },

            setCodeText: function () {
                if (this.get("CodeMode")) {
                    var workspace = this.get("workspace");
                    var id = $("#NavQueryEditModalBoxSourceCodeContainer").first().attr("Id");
                    var editor = ace.edit(id);
                    editor.setTheme("ace/theme/crimson_editor");
                    editor.getSession().setMode("ace/mode/javascript");
                    var text = Blockly.JavaScript.workspaceToCode(workspace);
                    editor.setValue(text, -1);
                }
            },

            createTable: function () {
                var gridContainer = $("#NavQueryEditModalBoxMyGridContainerContainer");
                if (gridContainer) {
                    gridContainer.html('<table id="jqtable"></table><div id="jqpager"></div>');
                    var options = {
                        datatype: "local",
                        width: 780,
                        height: 100,
                        rowNum: 6,
                        pager: '#jqpager',
                        viewrecords: true,
                        data: this.get("JGridData"),
                        colModel: this.get("ColModel"),
                        caption: Resources.localizableStrings.TableCaption
                    };

                    var colNames = this.get("ColNames");
                    if (colNames)
                        options.colNames = colNames;

                    var grid = $("#jqtable").jqGrid(options);
                }
            },

            onClose: function () {
                ModalBox.close();
            },

            getEntitySchemaColumnInfo: function (entitySchemaName, callback, scope) {
                var entitySchema = Terrasoft[entitySchemaName];
                if (entitySchema) {
                    var cols = entitySchema.columns;
                    cols.displayValue = entitySchema;
                    callback.call(scope, cols);
                } else {
                    Terrasoft.require([entitySchemaName], function (schema) {
                        var cols = schema.columns;
                        cols.displayValue = schema;
                        callback.call(scope, cols);
                    }, this);
                }
            },

            onSelectCallback: function (esq, callback) {
                var context = this;
                esq.getEntityCollection(function (response) {
                    if (response.success) {
                        context.getEntitySchemaColumnInfo(esq.rootSchemaName, function (columns) {

                            var resultCollection = response.collection;
                            var colNames = [];
                            var colModel = this.getColsModel(resultCollection, columns, colNames);

                            var myData = this.parseToJQGridData(resultCollection);

                            this.set("ColModel", colModel);
                            this.set("ColNames", colNames);
                            this.set("JGridData", myData);
                            this.createTable();

                            if (Ext.isFunction(callback))
                                callback.call(context);
                        }, context);
                    }
                })
            },

            onDeleteCallback: function (delQuery) {
                this.getEntitySchemaColumnInfo(delQuery.rootSchemaName, function (columns) {
                    var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                        rootSchemaName: delQuery.rootSchemaName
                    });

                    esq.filters = delQuery.filters;

                    if (columns.displayValue.primaryDisplayColumn)
                        esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
                    this.onSelectCallback(esq, function () {
                        delQuery.execute(function (response) {
                            if (response.errorInfo)
                                Terrasoft.showInformation(response.errorInfo.message);
                        });
                    });
                }, this);
            },

            onInsertCallback: function (insertQuery) {
                insertQuery.execute(function (response) {
                    if (response.errorInfo) {
                        Terrasoft.showInformation(response.errorInfo.message);
                    }
                    else {

                        var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                            rootSchemaName: insertQuery.rootSchemaName
                        });
                        esq.filters.add(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id", response.id));


                        var cols = insertQuery.columnValues.collection.keys;
                        for (var i in cols) {
                            esq.addColumn(cols[i]);
                        }

                        this.onSelectCallback(esq);

                    }

                }, this);
            },

            onUpdateCallback: function (updateQuery) {
                updateQuery.execute(function (response) {
                    if (response.errorInfo) {
                        Terrasoft.showInformation(response.errorInfo.message);
                    }
                    else {
                        this.getEntitySchemaColumnInfo(updateQuery.rootSchemaName, function (columns) {
                            var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                                rootSchemaName: updateQuery.rootSchemaName
                            });

                            esq.filters = updateQuery.filters;

                            if (columns.displayValue.primaryDisplayColumn) // отображаемая колонка, если есть
                                esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
                            var cols = updateQuery.columnValues.collection.keys;
                            for (var i in cols) {
                                esq.addColumn(cols[i]);
                            }

                            this.onSelectCallback(esq);

                        }, this);
                    }

                }, this);
            },

            withoutLastRow: function (x) {
                if (x.lastIndexOf("\n") > 0) {
                    return x.substring(0, x.lastIndexOf("\n"));
                } else {
                    return x;
                }
            },

            copyToClipBoard: function () {
                var $temp = $("<textarea>");
                $("body").append($temp);
                var workspace = this.get("workspace");
                var text = Blockly.JavaScript.workspaceToCode(workspace);

                var selectBlocks = workspace.topBlocks_.filter(block => block.type == "select_block" && !block.disabled);
                if (selectBlocks.length == 0) {
                    text = this.withoutLastRow(text);
                    text = this.withoutLastRow(text);
                }

                $temp.val(text).select();
                document.execCommand("copy");
                $temp.remove();
            },

            getColsModel: function (collection, columns, colNames) {
                var colModel = [];
                Object.keys(collection.rowConfig).forEach(function (i) {

                    colModel.push({
                        name: i,
                        index: i
                    });


                    if (colNames) {
                        var colInfo = columns[i];
                        colNames.push(colInfo ? colInfo.caption : i);
                    }

                });

                return colModel;
            },

            parseToJQGridData: function (collection) {
                var myData = [];
                for (var i = 0; i < collection.getCount(); i++) {
                    var entity = collection.collection.items[i].values;
                    var item = {};

                    Object.keys(collection.rowConfig).forEach(function (col) {
                        if (entity[col])  // если значение не пустое, то для лукапов вытаскиваем отоброжаемое значение, а для обычных значение поля
                            item[col] = entity[col].hasOwnProperty("displayValue") ? // проверяем поле лукапное или нет
                                (entity[col].displayValue || entity[col].value) : // для лукапа, если отображаемое поле пустое, то показываем id
                                entity[col];
                        else
                            item[col] = entity[col]; // null, undefined, 0, ""

                        if (Ext.isDate(item[col])) {
                            item[col] = item[col].toLocaleDateString();
                        }
                    });

                    myData.push(item);

                }

                return myData;

            }
        },
        attributes: {
            "TableMode": {
                dataValueType: Terrasoft.DataValueType.BOOLEAN,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: true
            },
            "CodeMode": {
                dataValueType: Terrasoft.DataValueType.BOOLEAN,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: false
            },
            "ColModel": {
                dataValueType: Terrasoft.DataValueType.BLOB,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: []
            },
            "JGridData": {
                dataValueType: Terrasoft.DataValueType.BLOB,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: []
            },
            "CodeText": {
                dataValueType: Terrasoft.DataValueType.TEXT,
                customConfig: {
                    "className": 'Terrasoft.controls.MemoEdit'
                },
                value: ""
            }
        }
    }
});
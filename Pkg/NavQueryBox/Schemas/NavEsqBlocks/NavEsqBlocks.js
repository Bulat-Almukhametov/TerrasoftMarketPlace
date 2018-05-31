define("NavEsqBlocks", ["NavBlockly", "ServiceHelper", "NavEsqBlocksResources", "jQuery", "css!NavEsqBlocks"], function (Blockly, ServiceHelper, resources) {

    // выпадающий список с выбором
    function NavAutoComplete(name, block) {
        Blockly.FieldTextInput.call(this, name);
        this._block = block;
        this.minLength = 0;
    };
    NavAutoComplete.prototype = Object.create(Blockly.FieldTextInput.prototype);

    var oldDislpose = Blockly.FieldTextInput.prototype.dispose;
    NavAutoComplete.prototype.dispose = function () {
        $(Blockly.FieldTextInput.htmlInput_).autocomplete("destroy");
        oldDislpose.call(this);
    };


    var oldShowEditor_ = Blockly.FieldTextInput.prototype.showEditor_;
    NavAutoComplete.prototype.showEditor_ = function (opt_quietInput) {
        var pthis = this;
        oldShowEditor_.call(this, opt_quietInput);
        // добавляем автозаполнение
        var appendTo = $(Blockly.FieldTextInput.htmlInput_).autocomplete({
            minLength: pthis.minLength,
            source: function (request, response) {

                if (pthis.getSourceAsync)
                    pthis.getSourceAsync(request, response);
                else
                    response([]);

            },
            open: function () {
                $(".ui-autocomplete").css("position", "absolute");
                $(".ui-autocomplete").css("z-index", "9999");
            },
            select: function (event, ui) {
                pthis.setValue(ui.item.label);
                pthis._block.schema_name_value = ui.item.name;
            }
        })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div><span class='ui-menu-item-caption'>" + item.label + "</span><br><span class='ui-menu-item-name'>" + item.name + "</span></div>" )
                .appendTo( ul );
        };
    };


    // выпадающий список для имени таблицы
    Terrasoft.NavBlockCache = Ext.create("Terrasoft.MemoryStore"); // для кэширования
    function NavSchemaAutocomplete(name, block) {
        NavAutoComplete.apply(this, arguments);
        this.minLength = 2;
    };
    NavSchemaAutocomplete.prototype = Object.create(NavAutoComplete.prototype);

    NavSchemaAutocomplete.prototype.getSourceAsync = function (request, response) {
        var item = Terrasoft.NavBlockCache.getItem(request.term);
        if (item) {
            response(item);
        }
        else {
            ServiceHelper.callService({
                serviceName: "NavSchemaService",
                methodName: "FindSchemas",
                data: {
                    "Caption": request.term,
                    "Top": 4
                },
                callback: function (dataResult) {
                    var data = [];
                    for (var i in dataResult) {
                        data.push({
                            label: dataResult[i].Caption,
                            value: dataResult[i].Caption,
                            name: dataResult[i].Name
                        })
                    }

                    Terrasoft.NavBlockCache.setItem(request.term, data);
                    response(data);
                },
                scope: this,
                timeout: 12000
            });
        }
    };

    // выпадающий список для имени колонки
    function NavColumnAutocomplete(name, block) {
        NavAutoComplete.apply(this, arguments);
    };
    NavColumnAutocomplete.prototype = Object.create(NavAutoComplete.prototype);

    NavColumnAutocomplete.prototype.getSourceAsync = function (request, response) {
        var block = this._block;
        block.getThisSchema(function (schema) {

            var data = [];
            for (var i in schema.columns) {
                var sourceCaption = schema.columns[i].caption.toLowerCase();
                var sourceName = schema.columns[i].name.toLowerCase();
                var substr = request.term.toLowerCase();

                if (sourceCaption.search(substr) != -1 || sourceName.search(substr) != -1) {
                    data.push({
                        label: schema.columns[i].caption,
                        value: schema.columns[i].caption,
                        name: schema.columns[i].name
                    });
                }
            }
            response(data);
        });
    };

    // выпадающий список для имени колонки
    function NavLookupAutocomplete(name, block) {
        NavAutoComplete.apply(this, arguments);
    };
    NavLookupAutocomplete.prototype = Object.create(NavAutoComplete.prototype);

    NavLookupAutocomplete.prototype.getSourceAsync = function (request, response) {
        var block = this._block;
        getParentColumnInfo.call(block, (function (schema) {
            var data = [];
            for (var i in schema.columns) {
                var sourceCaption = schema.columns[i].caption.toLowerCase();
                var sourceName = schema.columns[i].name.toLowerCase();
                var substr = request.term.toLowerCase();

                if ((sourceCaption.search(substr) != -1 || sourceName.search(substr) != -1) && schema.columns[i].isLookup) {
                    data.push({
                        label: schema.columns[i].caption,
                        value: schema.columns[i].caption,
                        name: schema.columns[i].name
                    });
                }
            }
            response(data);
        }));
    };


    function getEntitySchemaColumnInfo(callback, scope) {
        var block = this;
        var entitySchemaName = block.schema_name_value;
        if (entitySchemaName) {

            var entitySchema = Terrasoft[entitySchemaName];
            if (entitySchema) {
                callback.call(scope, entitySchema);
            }
            else {
                Terrasoft.require([entitySchemaName], function (schema) {
                    callback.call(scope, schema);
                });
            }
        }
    };

    function getParentColumnInfo(callback, scope) {
        var block = this;
        var parent = block.parentBlock_;
        if (parent && parent.getThisSchema) {
            parent.getThisSchema(callback, scope);
        }
    };

    function getLookupColumnInfo(callback, scope) {
        var block = this;
        var parent = block.parentBlock_;
        if (parent && parent.getThisSchema) {
            parent.getThisSchema(function (entitySchema) {
                if (block.schema_name_value) {
                    var entitySchemaName = entitySchema.columns[block.schema_name_value].referenceSchemaName;
                    var entitySchema = Terrasoft[entitySchemaName];
                    if (entitySchema) {
                        callback.call(scope, entitySchema);
                    }
                    else {
                        Terrasoft.require([entitySchemaName], function (schema) {
                            callback.call(scope, schema);
                        });
                    }
                }

            }, scope);
        }
    };

    /***********************************************************            Мои блоки              **************************************************************/


    /* Выбрать */
    Blockly.Blocks['select_block'] = {
        init: function () {

            var fieldTextInput = new NavSchemaAutocomplete(resources.localizableStrings.SchemaName, this);

            this.appendDummyInput()
                .appendField(resources.localizableStrings.Select)
                .appendField(fieldTextInput, "schema_name");


            this.appendStatementInput("columns")
                .setCheck("column_type")
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(resources.localizableStrings.Columns);
            this.appendStatementInput("filters")
                .setCheck("filter_type")
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(resources.localizableStrings.Where);
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(new Blockly.FieldDropdown([[resources.localizableStrings.And, "AND"], [resources.localizableStrings.Or, "OR"]]), "NAME");
            this.setInputsInline(true);
            this.setColour(105);
            this.setTooltip(resources.localizableStrings.SelectTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getEntitySchemaColumnInfo;
        }
    };

    /* все колонки */
    Blockly.Blocks['all_columns'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.AllColumns);
            this.setPreviousStatement(true, "column_type");
            this.setNextStatement(true, "column_type");
            this.setColour(285);
            this.setTooltip(resources.localizableStrings.AllColumnsTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    /* значение колонки */
    Blockly.Blocks['parameter_filter'] = {
        init: function () {
            var fieldInput = new NavColumnAutocomplete(resources.localizableStrings.ColumnName, this);

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField(resources.localizableStrings.ColumnValue)
                .appendField(fieldInput, "colName");
            this.appendValueInput("condition")
                .setCheck("comparator_type")
                .setAlign(Blockly.ALIGN_CENTRE);
            this.setInputsInline(false);
            this.setPreviousStatement(true, "filter_type");
            this.setNextStatement(true, "filter_type");
            this.setColour(63);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    /* строго равно */
    Blockly.Blocks['equal_comparasion'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.Equal)
                .appendField(new Blockly.FieldTextInput(resources.localizableStrings.Value), "val");
            this.setOutput(true, "comparator_type");
            this.setColour(63);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };


    /* пустое */
    Blockly.Blocks['empty_comparassion'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.Empty);
            this.setOutput(true, "comparator_type");
            this.setColour(63);
            this.setTooltip(resources.localizableStrings.EmptyComparationTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    /* не пустое */
    Blockly.Blocks['notempty_comparasion'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.NotEmpty);
            this.setOutput(true, "comparator_type");
            this.setColour(63);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['simple_column'] = {
        init: function () {
            var fieldInput = new NavColumnAutocomplete(resources.localizableStrings.ColumnName, this);

            this.appendDummyInput()
                .appendField(resources.localizableStrings.Column)
                .appendField(fieldInput, "COLUMN");
            this.setPreviousStatement(true, "column_type");
            this.setNextStatement(true, "column_type");
            this.setColour(285);
            this.setTooltip(resources.localizableStrings.SimpleColumnTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['lookups_columns'] = {
        init: function () {
            var fieldInput = new NavLookupAutocomplete(resources.localizableStrings.ColumnName, this);
            this.appendValueInput("SUB_COL")
                .setCheck("column_type")
                .appendField("из колонки")
                .appendField(fieldInput, "PARENT_COL")
                .appendField("выбираем");
            this.setPreviousStatement(true, "column_type");
            this.setNextStatement(true, "column_type");
            this.setColour(285);
            this.setTooltip("Выбирает из справочного поля значения этого справочника.");
            this.setHelpUrl("");

            this.getThisSchema = getLookupColumnInfo;
        }
    };

    Blockly.Blocks['column_from_lookup'] = {
        init: function () {
            var fieldInput = new NavColumnAutocomplete("колонка_справочника", this);

            this.appendDummyInput()
                .appendField("колонку")
                .appendField(fieldInput, "COLUMN");
            this.setOutput(true, "column_type");
            this.setColour(285);
            this.setTooltip("Для колонки из справочного поля объекта.");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['delete_block'] = {
        init: function () {
            var fieldTextInput = new NavSchemaAutocomplete(resources.localizableStrings.SchemaName, this);

            this.appendDummyInput()
                .appendField("Удалить");
            this.appendDummyInput()
                .appendField(" из")
                .appendField(fieldTextInput, "SCHEMA_NAME");
            this.appendStatementInput("FILTERS")
                .setCheck("filter_type")
                .appendField("где");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["и", "AND"], ["или", "OR"]]), "LOGICAL_OPERATOR");
            this.setColour(4);
            this.setTooltip("Удаляет выбранные записи из таблицы.");
            this.setHelpUrl("");

            this.getThisSchema = getEntitySchemaColumnInfo;
        }
    };

    Blockly.Blocks['sub_filter'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("блок");
            this.appendDummyInput()
                .appendField("условий");
            this.appendStatementInput("FILTERS")
                .setCheck("filter_type");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["и", "AND"], ["или", "OR"]]), "LOGICAL_OPERATOR");
            this.setPreviousStatement(true, "filter_type");
            this.setNextStatement(true, "filter_type");
            this.setColour(63);
            this.setTooltip("Подфильтр, объединяющий условия с и\\или.");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['insert_block'] = {
        init: function () {
            var fieldTextInput = new NavSchemaAutocomplete(resources.localizableStrings.SchemaName, this);

            this.appendDummyInput()
                .appendField(resources.localizableStrings.Insert);
            this.appendDummyInput()
                .appendField("в ")
                .appendField(fieldTextInput, "SCHEMA_NAME");
            this.appendStatementInput("COLUMNS")
                .setCheck("set_column");
            this.setColour(230);
            this.setTooltip(resources.localizableStrings.InsertTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getEntitySchemaColumnInfo;
        }
    };

    Blockly.Blocks['set_column'] = {
        init: function () {
            var fieldInput = new NavColumnAutocomplete(resources.localizableStrings.ColumnName, this);

            this.appendDummyInput()
                .appendField(resources.localizableStrings.Set)
                .appendField(fieldInput, "COL_NAME");
            this.appendDummyInput()
                .appendField(resources.localizableStrings.Value)
                .appendField(new Blockly.FieldTextInput(resources.localizableStrings.Value), "VAL")
                .appendField(resources.localizableStrings.Type)
                .appendField(new Blockly.FieldDropdown([[resources.localizableStrings.Text, "TEXT"], [resources.localizableStrings.Bool, "BOOLEAN"], [resources.localizableStrings.Guid, "GUID"], [resources.localizableStrings.Int, "INTEGER"], [resources.localizableStrings.Float, "FLOAT"], [resources.localizableStrings.Time, "DATE_TIME"], [resources.localizableStrings.Money, "MONEY"]]), "TYPE");
            this.setPreviousStatement(true, "set_column");
            this.setNextStatement(true, "set_column");
            this.setColour(285);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['update_block'] = {
        init: function () {
            var fieldTextInput = new NavSchemaAutocomplete(resources.localizableStrings.SchemaName, this);

            this.appendDummyInput()
                .appendField(resources.localizableStrings.Update)
                .appendField(fieldTextInput, "SCHEMA_NAME");
            this.appendStatementInput("COLUMNS")
                .setCheck("set_column");
            this.appendStatementInput("FILTERS")
                .setCheck("filter_type")
                .appendField(resources.localizableStrings.Where);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([[resources.localizableStrings.And, "AND"], [resources.localizableStrings.Or, "OR"]]), "LOGICAL_OPERATOR");
            this.setColour(230);
            this.setTooltip(resources.localizableStrings.UpdateTooltip);
            this.setHelpUrl("");

            this.getThisSchema = getEntitySchemaColumnInfo;
        }
    };


    Blockly.Blocks['contains_comparasion'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.Contains)
                .appendField(new Blockly.FieldTextInput(resources.localizableStrings.Value), "VALUE");
            this.setOutput(true, "comparator_type");
            this.setColour(63);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };

    Blockly.Blocks['notequal_comparasion'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(resources.localizableStrings.NotEqual)
                .appendField(new Blockly.FieldTextInput(resources.localizableStrings.Value), "val");
            this.setOutput(true, "comparator_type");
            this.setColour(63);
            this.setTooltip("");
            this.setHelpUrl("");

            this.getThisSchema = getParentColumnInfo;
        }
    };


    /**********************************************************        Кодогенератор             **************************************************************/

    function getBlockItemCode(block) {
        if (!block)
            return '';

        return Blockly.JavaScript[block.type].call(block, block);
    }

    function attachFilters(filterGroupName, root) {

        var filters_code = "";

        for (var block = root, i = 1; !!block; block = block.getNextBlock(), i++) {

            var cur_filter = getBlockItemCode(block);
            if (cur_filter) {
                var filterName = "filter" + i;
                cur_filter = cur_filter.replace("%filter_i", filterName);

                filters_code += cur_filter + "\n";
                filters_code += filterGroupName + ".addItem(" + filterName + ");\n";

            }
        }


        return filters_code;
    };

    Blockly.JavaScript['select_block'] = function (block) {
        var text_schema_name = block.schema_name_value || "";
        var logicalOperation = block.getFieldValue('NAME');
        window.selectBlock = block;


        var code = ' this.getEntitySchemaColumnInfo("' + text_schema_name + '", function (columns) { // получаем информацию о схеме, чтобы узнать, есть ли отображаемое значение\n\n' +
            'var esq = Ext.create("Terrasoft.EntitySchemaQuery", {\n' +
            ' rootSchemaName: "%schema_name"\n' +
            ' });\n' +
            'if(columns.displayValue.primaryDisplayColumn)\n' +
            '   esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");\n\n';

        var cols = Blockly.JavaScript.statementToCode(block, "columns");
        var cols_code = "";

        if (cols) {
            cols = cols.split(";");

            for (var i in cols) {
                var cur_col = cols[i];
                if (cur_col) {
                    cols_code += cur_col + ";\n";
                }
            }
        }
        code += cols_code;


        code += 'esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.%logicalOperation;\n\n';
        code = code.replace("%schema_name", text_schema_name);

        var firstFilter = block.getInputTargetBlock("filters");

        code += attachFilters("esq.filters", firstFilter);


        code = code.replace("%logicalOperation", logicalOperation);

        code += '\n if (Ext.isFunction(this.onSelectCallback)) this.onSelectCallback(esq);\n'; // callback для обработки созданного запроса

        code += '}, this);\n';

        return code;
    };

    Blockly.JavaScript['all_columns'] = function (block) {


        var code = 'esq.allColumns = true;';
        return code;
    };

    Blockly.JavaScript['parameter_filter'] = function (block) {
        var text_colname = block.schema_name_value || block.data || "";
        var value_condition = Blockly.JavaScript.valueToCode(block, 'condition');

        if (!value_condition || !text_colname) {
            return "";
        }
        else {
            var code = 'var %filter_i = %comparasion;';
            code = code.replace("%comparasion", value_condition);
            code = code.replace("%colName", text_colname);

            return code;
        }

    };

    Blockly.JavaScript['notempty_comparasion'] = function (block) {
        var code = 'Terrasoft.createColumnIsNotNullFilter("%colName")';

        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['equal_comparasion'] = function (block) {
        var text_val = block.getFieldValue('val');
        if (!text_val) {
            return "";
        }
        else {
            var code = 'Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "%colName", "%val")';
            code = code.replace("%val", text_val);


            return [code, Blockly.JavaScript.ORDER_NONE];
        }
    };

    Blockly.JavaScript['contains_comparasion'] = function (block) {
        var text_val = block.getFieldValue('VALUE');
        if (!text_val) {
            return "";
        }
        else {
            var code = 'Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.CONTAIN, "%colName", "%val")';
            code = code.replace("%val", text_val);


            return [code, Blockly.JavaScript.ORDER_NONE];
        }
    };


    Blockly.JavaScript['notequal_comparasion'] = function (block) {


        var text_val = block.getFieldValue('val');
        if (!text_val) {
            return "";
        }
        else {
            var code = 'Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "%colName", "%val")';
            code = code.replace("%val", text_val);


            return [code, Blockly.JavaScript.ORDER_NONE];
        }
    };

    Blockly.JavaScript['empty_comparassion'] = function (block) {


        var code = 'Terrasoft.createColumnIsNullFilter("%colName")';

        // Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['simple_column'] = function (block) {
        var text_column = block.schema_name_value || "";
        if (!text_column) return "";

        var code = 'esq.addColumn("%col");\n';

        code = code.replace('%col', text_column);

        return code;
    };

    Blockly.JavaScript['lookups_columns'] = function (block) {


        var text_parent_col = block.schema_name_value || "";
        var value_sub_col = Blockly.JavaScript.valueToCode(block, 'SUB_COL');

        if (!text_parent_col || !value_sub_col)
            return "";

        var code = 'esq.addColumn("%col.%sub_col");\n';
        code = code.replace('%col', text_parent_col);
        code = code.replace('%sub_col', value_sub_col);


        return code;
    };

    Blockly.JavaScript['column_from_lookup'] = function (block) {
        var text_column = block.schema_name_value || "";

        return [text_column, Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.JavaScript['delete_block'] = function (block) {
        var text_schema_name = block.schema_name_value || "";
        var dropdown_logical_operator = block.getFieldValue('LOGICAL_OPERATOR');


        var code = 'var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {\r\n' +
            '        rootSchemaName: "' + text_schema_name + '"\r\n' +
            '     });\r\n';

        var firstFilter = block.getInputTargetBlock("FILTERS");

        code += attachFilters("deleteQuery.filters", firstFilter);


        code += '\r\n deleteQuery.execute(); // раскомментируйте, чтобы выполнить запрос\r\n' +
            '\r\n if (Ext.isFunction(this.onDeleteCallback)) this.onDeleteCallback(deleteQuery);\r\n'; // callback для обработки созданного запроса

        return code;
    };

    Blockly.JavaScript['sub_filter'] = function (block) {

        var dropdown_logical_operator = block.getFieldValue('LOGICAL_OPERATOR');

        var code = 'var %filter_i = (function(){\r\n' +
            'var filterGroup = Terrasoft.createFilterGroup();\r\n' +
            'filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.' + dropdown_logical_operator + ';\r\n';

        var firstFilter = block.getInputTargetBlock("FILTERS");
        var subfilters = attachFilters("filterGroup", firstFilter);

        code += subfilters;

        code += 'return filterGroup;\r\n' +
            '})();';


        return code;
    };

    Blockly.JavaScript['insert_block'] = function (block) {
        var text_schema_name = block.schema_name_value || "";
        var statements_columns = Blockly.JavaScript.statementToCode(block, 'COLUMNS');


        var code = ' var insert = Ext.create("Terrasoft.InsertQuery", {\n' +
            'rootSchemaName: "' + text_schema_name + '"\n' +
            '});\n';

        code += statements_columns.replace(/%query/g, "insert") + '\n';
        code += '\n // insert.execute(); // раскомментируйте, чтобы выполнить запрос\n' +
            '\n if (Ext.isFunction(this.onInsertCallback)) this.onInsertCallback(insert);\n'; // callback для обработки созданного запроса

        return code;
    };

    Blockly.JavaScript['set_column'] = function (block) {
        var text_col_name = block.schema_name_value || "";
        var text_val = block.getFieldValue('VAL');
        var dropdown_type = block.getFieldValue('TYPE');

        var code = '%query.setParameterValue("' + text_col_name + '", "' + text_val + '", Terrasoft.DataValueType.' + dropdown_type + ');\n';
        return code;
    };

    Blockly.JavaScript['update_block'] = function (block) {
        var text_schema_name = block.schema_name_value || "";
        var statements_columns = Blockly.JavaScript.statementToCode(block, 'COLUMNS');
        var statements_filters = Blockly.JavaScript.statementToCode(block, 'FILTERS');
        var dropdown_logical_operator = block.getFieldValue('LOGICAL_OPERATOR');


        var code = 'var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {\n' +
            'rootSchemaName: "' + text_schema_name + '"\n' +
            '});\n';

        code += statements_columns.replace(/%query/g, "updateQuery") + '\n';

        var firstFilter = block.getInputTargetBlock("FILTERS");
        code += attachFilters("updateQuery.filters", firstFilter);


        code += '\n // updateQuery.execute(); // раскомментируйте, чтобы выполнить запрос\n' +
            '\n if (Ext.isFunction(this.onUpdateCallback)) this.onUpdateCallback(updateQuery);\n'; // callback для обработки созданного запроса

        return code;
    };


    /**********************************************                   Конец                     *****************************************************/

    return Blockly;

});
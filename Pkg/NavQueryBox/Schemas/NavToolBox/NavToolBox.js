define("NavToolBox", ["NavToolBoxResources"], function (resources) {
    return `
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="` + resources.localizableStrings.SelectMenu + `" colour="#6da55b">
    <block type="select_block">
      <field name="schema_name">` + resources.localizableStrings.SchemaName + `</field>
      <field name="NAME">AND</field>
      <statement name="columns">
      </statement>
    </block>
    <block type="all_columns"></block>
    <block type="simple_column">
      <field name="COLUMN">` + resources.localizableStrings.ColumnName + `</field>
    </block>
    <block type="lookups_columns">
      <field name="PARENT_COL">` + resources.localizableStrings.ColumnName + `</field>
    </block>
    <block type="column_from_lookup">
      <field name="COLUMN">` + resources.localizableStrings.LookupColumn + `</field>
    </block>
  </category>
  <category name="` + resources.localizableStrings.UpdateMenu + `" colour="#5b80a5">
    <block type="update_block">
      <field name="SCHEMA_NAME">` + resources.localizableStrings.SchemaName + `</field>
      <field name="LOGICAL_OPERATOR">AND</field>
      <statement name="COLUMNS">
        <block type="set_column">
          <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
          <field name="VAL">` + resources.localizableStrings.Text + `</field>
          <field name="TYPE">TEXT</field>
        </block>
      </statement>
      <statement name="FILTERS">
        <block type="parameter_filter">
          <field name="colName">Id</field>
          <data>Id</data>
          <value name="condition">
            <block type="equal_comparasion">
              <field name="val">` + resources.localizableStrings.Value + `</field>
            </block>
          </value>
        </block>
      </statement>
    </block>
    <block type="set_column">
      <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
      <field name="VAL">` + resources.localizableStrings.Text + `</field>
      <field name="TYPE">TEXT</field>
    </block>
  </category>
  <category name="` + resources.localizableStrings.InsertMenu + `" colour="#5ba593">
    <block type="insert_block">
      <field name="SCHEMA_NAME">` + resources.localizableStrings.SchemaName + `</field>
      <statement name="COLUMNS">
        <block type="set_column">
          <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
          <field name="VAL">` + resources.localizableStrings.Text + `</field>
          <field name="TYPE">TEXT</field>
          <next>
            <block type="set_column">
              <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
              <field name="VAL">` + resources.localizableStrings.Text + `</field>
              <field name="TYPE">TEXT</field>
              <next>
                <block type="set_column">
                  <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
                  <field name="VAL">` + resources.localizableStrings.Text + `</field>
                  <field name="TYPE">TEXT</field>
                </block>
              </next>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="set_column">
      <field name="COL_NAME">` + resources.localizableStrings.ColumnName + `</field>
      <field name="VAL">` + resources.localizableStrings.Text + `</field>
      <field name="TYPE">TEXT</field>
    </block>
  </category>
  <category name="` + resources.localizableStrings.DeleteMenu + `" colour="#a55b5b">
    <block type="delete_block">
      <field name="SCHEMA_NAME">` + resources.localizableStrings.SchemaName + `</field>
      <field name="LOGICAL_OPERATOR">AND</field>
      <statement name="FILTERS">
        <block type="parameter_filter">
          <field name="colName">Id</field>
          <data>Id</data>
          <value name="condition">
            <block type="equal_comparasion">
              <field name="val">` + resources.localizableStrings.Value + `</field>
            </block>
          </value>
        </block>
      </statement>
    </block>
  </category>
  <sep></sep>
  <category name="` + resources.localizableStrings.FiltersMenu + `" colour="#a5a55b">
    <block type="parameter_filter">
      <field name="colName">` + resources.localizableStrings.ColumnName + `</field>
    </block>
    <block type="equal_comparasion">
      <field name="val">` + resources.localizableStrings.Value + `</field>
    </block>
    <block type="contains_comparasion">
      <field name="VALUE">` + resources.localizableStrings.Value + `</field>
    </block>
    <block type="notequal_comparasion">
      <field name="val">` + resources.localizableStrings.Value + `</field>
    </block>
    <block type="empty_comparassion"></block>
    <block type="notempty_comparasion"></block>
    <block type="sub_filter">
      <field name="LOGICAL_OPERATOR">AND</field>
    </block>
  </category>
</xml>
`;
});
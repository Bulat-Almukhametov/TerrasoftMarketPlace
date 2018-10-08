define("NavSubdivision1Page", [], function() {
	return {
		entitySchemaName: "NavSubdivision",
		attributes: {},
		details: /**SCHEMA_DETAILS*/{
			"NavSubdivisionEmployeeDetail3af0c4b1": {
				"schemaName": "NavSubdivisionEmployeeDetail",
				"entitySchemaName": "NavSubdivisionEmployee",
				"filter": {
					"detailColumn": "NavSubdivision",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
		{
			"operation": "insert",
			"name": "NavNamec8e9aea6-ab60-41a3-a87b-b38d7da5bf34",
			"values": {
				"layout": {
					"colSpan": 24,
					"rowSpan": 1,
					"column": 0,
					"row": 0,
					"layoutName": "Header"
				},
				"bindTo": "NavName"
			},
			"parentName": "Header",
			"propertyName": "items",
			"index": 0
		},
		{
			"operation": "insert",
			"name": "Tabc6013b2dTabLabel",
			"values": {
				"caption": "Сотрудники",
				"items": []
			},
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 1
		},
		{
			"operation": "insert",
			"name": "NavSubdivisionEmployeeDetail3af0c4b1",
			"values": {
				"itemType": 2,
				"markerValue": "added-detail"
			},
			"parentName": "Tabc6013b2dTabLabel",
			"propertyName": "items",
			"index": 2
		}]/**SCHEMA_DIFF*/,
		methods: {
			init: function() {
				this.callParent(arguments);
				var tabs = this.get("TabsCollection");
				tabs.collection.items.reverse();
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});

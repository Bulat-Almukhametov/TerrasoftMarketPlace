define("NavOffice1Page", [], function() {
	return {
		entitySchemaName: "NavOffice",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
	{
		"operation": "insert",
		"name": "NavName8d851edd-1469-46a7-acb5-eb92d0c8b945",
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
		"name": "STRING31d4bd6f-166b-464d-910c-f611fbf19efd",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 3,
				"column": 0,
				"row": 1,
				"layoutName": "ProfileContainer"
			},
			"bindTo": "NavDescription",
			"labelConfig": {
				"caption": {
					"bindTo": "Resources.Strings.STRING31d4bd6f166b464d910cf611fbf19efdLabelCaption"
				}
			},
			"enabled": true,
			"contentType": 0
		},
		"parentName": "ProfileContainer",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "NavType31ae1325-56bb-4e0e-8dac-71418b53b4a9",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 4,
				"layoutName": "ProfileContainer"
			},
			"bindTo": "NavType"
		},
		"parentName": "ProfileContainer",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "merge",
		"name": "ESNTab",
		"values": {
			"caption": "Лента"
		}
	}
]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});

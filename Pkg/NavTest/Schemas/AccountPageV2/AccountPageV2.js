define("AccountPageV2", [], function() {
	return {
		entitySchemaName: "Account",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
	{
		"operation": "merge",
		"name": "AccountPhotoContainer",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 0
			}
		}
	},
	{
		"operation": "merge",
		"name": "AccountName",
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
		"operation": "merge",
		"name": "AccountType",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 2
			}
		}
	},
	{
		"operation": "merge",
		"name": "AccountOwner",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 3
			}
		}
	},
	{
		"operation": "merge",
		"name": "AccountWeb",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 4
			}
		}
	},
	{
		"operation": "merge",
		"name": "AccountPhone",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 5
			}
		}
	},
	{
		"operation": "merge",
		"name": "NewAccountCategory",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 6
			}
		}
	},
	{
		"operation": "merge",
		"name": "AccountIndustry",
		"values": {
			"layout": {
				"colSpan": 24,
				"rowSpan": 1,
				"column": 0,
				"row": 7
			}
		}
	},
	{
		"operation": "merge",
		"name": "AlternativeName",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 0
			}
		}
	},
	{
		"operation": "merge",
		"name": "Code",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 12,
				"row": 0
			}
		}
	},
	{
		"operation": "merge",
		"name": "EmployeesNumber",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 0
			}
		}
	},
	{
		"operation": "merge",
		"name": "Ownership",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 12,
				"row": 0
			}
		}
	},
	{
		"operation": "merge",
		"name": "AnnualRevenue",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 1
			}
		}
	}
]/**SCHEMA_DIFF*/,
		attributes: {
			"NavIgnoreFilter": {
                dataValueType: Terrasoft.DataValueType.BOOLEAN,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: true
			}
		},
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});

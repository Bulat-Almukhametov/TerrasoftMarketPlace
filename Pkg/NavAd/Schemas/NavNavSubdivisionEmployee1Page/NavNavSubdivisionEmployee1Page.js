define("NavNavSubdivisionEmployee1Page", ["BusinessRuleModule"], function(BusinessRuleModule ) {
	return {
		entitySchemaName: "NavSubdivisionEmployee",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
	{
		"operation": "insert",
		"name": "NavNumber30da7035-7872-4aae-b8af-151fda49b966",
		"values": {
			"layout": {
				"colSpan": 6,
				"rowSpan": 1,
				"column": 0,
				"row": 0,
				"layoutName": "Header"
			},
			"bindTo": "NavNumber"
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "NavSubdivisioncbd1ca0b-7d85-496c-82a9-ecb91e7a9a29",
		"values": {
			"layout": {
				"colSpan": 18,
				"rowSpan": 1,
				"column": 6,
				"row": 0,
				"layoutName": "Header"
			},
			"bindTo": "NavSubdivision"
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 1
	}
]/**SCHEMA_DIFF*/,
		methods: {
	init: function () {
		this.callParent(arguments);
		window[this.name]=this;
    }
		},
		rules: {
            "NavNumber": {
                "AdSynchronization": {
                    "ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
                    "property": BusinessRuleModule.enums.Property.ENABLED,
                    "conditions": [{
                        "leftExpression": {
                            "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                            "attribute": "NavSynchronizedWithLDAP"
                        },
                        "comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
                        "rightExpression": {
                            "type": BusinessRuleModule.enums.ValueType.CONSTANT,
                            "value": true
                        }
                    }]
                }
            },
            "NavSubdivision": {
                "AdSynchronization": {
                    "ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
                    "property": BusinessRuleModule.enums.Property.ENABLED,
                    "conditions": [{
                        "leftExpression": {
                            "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                            "attribute": "NavSynchronizedWithLDAP"
                        },
                        "comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
                        "rightExpression": {
                            "type": BusinessRuleModule.enums.ValueType.CONSTANT,
                            "value": true
                        }
                    }]
                }
            },
            "NavContact": {
                "AdSynchronization": {
                    "ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
                    "property": BusinessRuleModule.enums.Property.ENABLED,
                    "conditions": [{
                        "leftExpression": {
                            "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                            "attribute": "NavSynchronizedWithLDAP"
                        },
                        "comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
                        "rightExpression": {
                            "type": BusinessRuleModule.enums.ValueType.CONSTANT,
                            "value": true
                        }
                    }]
                }
            }

        },
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});

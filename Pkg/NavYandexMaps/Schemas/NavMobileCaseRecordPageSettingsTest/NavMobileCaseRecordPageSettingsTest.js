[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "Case",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"SocialMessageDetailCaptionCase_caption": "Лента",
				"primaryColumnSetCase_caption": "Основная информация"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandardDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionCase_caption",
			"entitySchemaName": "SocialMessage",
			"showForVisibleModule": true,
			"filter": {
				"detailColumn": "EntityId",
				"masterColumn": "Id"
			},
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Case",
			"caption": "primaryColumnSetCase_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "b7e5788f-1bb6-44cc-892f-2214e3bfcb64",
		"values": {
			"row": 0,
			"content": "Номер",
			"columnName": "Number",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ddf88654-9a35-48e3-95cb-e32d13051bf7",
		"values": {
			"row": 1,
			"content": "Дата регистрации",
			"columnName": "RegisteredOn",
			"dataValueType": 7,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "ac4e760d-7f4f-48e0-ada2-76d4d78ad15f",
		"values": {
			"row": 2,
			"content": "Тема",
			"columnName": "Subject",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "873e5c10-62cc-46ed-8045-7ec1ef69c114",
		"values": {
			"row": 3,
			"content": "Состояние",
			"columnName": "Status",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 3
	}
]
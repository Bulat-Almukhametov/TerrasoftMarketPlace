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
		"name": "11db99f0-a7a9-4984-90f8-4b70724afe1f",
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
		"name": "c3dfd162-2db5-4e2b-93b0-ac6dd79977c3",
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
		"name": "5df734d1-94ae-4f3d-8855-fb6333472688",
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
		"name": "d706d1ff-1693-4b69-a65b-fde82392ff07",
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
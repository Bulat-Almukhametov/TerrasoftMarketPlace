[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "SocialMessage",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"SocialMessageDetailCaptionSocialMessage_caption": "Лента",
				"primaryColumnSetSocialMessage_caption": "Основная информация"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandardDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionSocialMessage_caption",
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
			"entitySchemaName": "SocialMessage",
			"caption": "primaryColumnSetSocialMessage_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "b1fc78d1-b6a3-4f91-a43b-45762dde877c",
		"values": {
			"row": 0,
			"content": "Сообщение/комментарий",
			"columnName": "Message",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	}
]
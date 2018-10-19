{
	"SyncOptions": {
		"SysSettingsImportConfig": [
			"CaseStatusDef",
			"CasePriorityDef",
			"CaseOriginDef"
		],
		"ModelDataImportConfig": [
			{
				"Name": "Case",
				"SyncColumns": [
					"Number",
					"RegisteredOn",
					"Subject",
					"Status",
					"Owner"
				]
			},
			{
				"Name": "CaseStatus",
				"SyncColumns": []
			},
			{
				"Name": "CasePriority",
				"SyncColumns": []
			},
			{
				"Name": "CaseOrigin",
				"SyncColumns": []
			},
			{
				"Name": "SocialMessage",
				"SyncColumns": [
					"EntityId"
				]
			},
			{
				"Name": "Contact",
				"SyncColumns": [
					"Job"
				]
			}
		]
	},
	"Modules": {
		"Case": {
			"Group": "main",
			"Model": "Case",
			"Position": 0,
			"isStartPage": false,
			"Title": "CaseSectionTitle",
			"Hidden": false
		}
	},
	"Models": {
		"Case": {
			"RequiredModels": [
				"Case",
				"CaseStatus",
				"CasePriority",
				"CaseOrigin",
				"SocialMessage",
				"Contact"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"NavMobileCaseActionsSettingsDefaultWorkplace",
				"NavMobileCaseGridPageSettingsDefaultWorkplace",
				"NavMobileCaseRecordPageSettingsDefaultWorkplace"
			]
		},
		"SocialMessage": {
			"RequiredModels": [],
			"ModelExtensions": [],
			"PagesExtensions": []
		}
	}
}
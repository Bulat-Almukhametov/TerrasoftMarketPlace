{
	"Features": {
		"ShowMobileDashboards": {
			"Modules": {
				"SysDashboard": {
					"Hidden": false
				}
			},
			"Models": {
				"SysDashboard": {
					"Grid": "MobileDashboardPage",
					"PagesExtensions": [
						"MobileDashboardPageView",
						"MobileDashboardPageController"
					]
				}
			}
		}
	},
	"UseOptimisticEditing": true,
	"ModuleGroups": {
		"main": {
			"Position": 0
		},
		"sales": {
			"Position": 1
		}
	},
	"DefaultModuleImageId": "MobileImageListDefaultModuleImage",
	"DefaultModuleImageIdV2": "MobileImageListDefaultModuleImageV2",
	"CustomSchemas": [
		"MobileUtilities",
		"MobileImageList",
		"MobileSocialMessageUtilities",
		"MobileFeedList",
		"MobileFeedCommentsList",
		"MobileConstants",
		"MobileSocialMessageHtmlField",
		"MobileDashboardEnums",
		"MobileDashboardUtils",
		"MobileDashboardContainer",
		"MobileAnalyticsService",
		"MobileDashboardDataManager",
		"MobileBaseDashboardItem",
		"MobileIndicatorDashboardItem",
		"MobileGridDashboardItem",
		"MobileChartDashboardItem",
		"MobilePushNotificationReceiver"
	],
	"Modules": {
		"Contact": {
			"Group": "main",
			"Model": "Contact",
			"Position": 0,
			"isStartPage": false,
			"Title": "ContactSectionTitle",
			"Icon": {
				"ImageId": "MobileImageListContactModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListContactModuleImageV2"
			},
			"Hidden": false
		},
		"Account": {
			"Group": "main",
			"Model": "Account",
			"Position": 1,
			"isStartPage": false,
			"Title": "AccountSectionTitle",
			"Icon": {
				"ImageId": "MobileImageListAccountModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListAccountModuleImageV2"
			},
			"Hidden": false
		},
		"Activity": {
			"Group": "main",
			"Model": "Activity",
			"Position": 2,
			"isStartPage": false,
			"Title": "ActivitySectionTitle",
			"Icon": {
				"ImageId": "MobileImageListActivityModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListActivityModuleImageV2"
			},
			"Hidden": true
		},
		"Contract": {
			"Group": "main",
			"Model": "Contract",
			"Icon": {
				"ImageId": "MobileImageListContractModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListContractModuleImageV2"
			},
			"Hidden": true
		},
		"Document": {
			"Group": "main",
			"Model": "Document",
			"Icon": {
				"ImageId": "MobileImageListDocumentModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListDocumentModuleImageV2"
			},
			"Hidden": true
		},
		"Order": {
			"Group": "main",
			"Model": "Order",
			"Icon": {
				"ImageId": "MobileImageListOrderModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListOrderModuleImageV2"
			},
			"Hidden": true
		},
		"Forecast": {
			"Group": "main",
			"Model": "Forecast",
			"Icon": {
				"ImageId": "MobileImageListPlanningModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListPlanningModuleImageV2"
			},
			"Hidden": true
		},
		"Product": {
			"Group": "main",
			"Model": "Product",
			"Icon": {
				"ImageId": "MobileImageListProductModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListProductModuleImageV2"
			},
			"Hidden": true
		},
		"Project": {
			"Group": "main",
			"Model": "Project",
			"Icon": {
				"ImageId": "MobileImageListProjectModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListProjectModuleImageV2"
			},
			"Hidden": true
		},
		"Invoice": {
			"Group": "main",
			"Model": "Invoice",
			"Icon": {
				"ImageId": "MobileImageListInvoiceModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListInvoiceModuleImageV2"
			},
			"Hidden": true
		},
		"Request": {
			"Group": "main",
			"Model": "Request",
			"Icon": {
				"ImageId": "MobileImageListRequestModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListRequestModuleImageV2"
			},
			"Hidden": true
		},
		"Listing": {
			"Group": "main",
			"Model": "Listing",
			"Icon": {
				"ImageId": "MobileImageListListingModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListListingModuleImageV2"
			},
			"Hidden": true
		},
		"SocialMessage": {
			"Group": "main",
			"Model": "SocialMessage",
			"Title": "SocialMessageSectionTitle",
			"Icon": {
				"ImageId": "MobileImageListFeedModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListFeedModuleImageV2"
			},
			"Hidden": false,
			"HiddenUIV1": true,
			"Position": 4,
			"isStartPage": false
		},
		"ConfItem": {
			"Group": "main",
			"Model": "ConfItem",
			"Icon": {
				"ImageId": "MobileImageListConfigurationModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListConfigurationModuleImageV2"
			},
			"Hidden": true
		},
		"Case": {
			"Group": "main",
			"Model": "Case",
			"Icon": {
				"ImageId": "MobileImageListTreatmentModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListTreatmentModuleImageV2"
			},
			"Hidden": false,
			"Position": 3,
			"isStartPage": false,
			"Title": "CaseSectionTitle"
		},
		"Problem": {
			"Group": "main",
			"Model": "Problem",
			"Icon": {
				"ImageId": "MobileImageListProblemModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListProblemModuleImageV2"
			},
			"Hidden": true
		},
		"ServicePact": {
			"Group": "main",
			"Model": "ServicePact",
			"Icon": {
				"ImageId": "MobileImageListServiceContractModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListServiceContractModuleImageV2"
			},
			"Hidden": true
		},
		"ServiceItem": {
			"Group": "main",
			"Model": "ServiceItem",
			"Icon": {
				"ImageId": "MobileImageListServiceModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListServiceModuleImageV2"
			},
			"Hidden": true
		},
		"Campaign": {
			"Group": "main",
			"Model": "Campaign",
			"Icon": {
				"ImageId": "MobileImageListCampaignModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListCampaignModuleImageV2"
			},
			"Hidden": true
		},
		"KnowledgeBase": {
			"Group": "main",
			"Model": "KnowledgeBase",
			"Icon": {
				"ImageId": "MobileImageListKnowledgeBaseModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListKnowledgeBaseModuleImageV2"
			},
			"Title": "KnowledgeBaseTitle",
			"Hidden": true
		},
		"BulkEmail": {
			"Group": "main",
			"Model": "BulkEmail",
			"Icon": {
				"ImageId": "MobileImageListEmailModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListEmailModuleImageV2"
			},
			"Hidden": true
		},
		"Event": {
			"Group": "main",
			"Model": "Event",
			"Icon": {
				"ImageId": "MobileImageListActionModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListActionModuleImageV2"
			},
			"Hidden": true
		},
		"SocialSubscription": {
			"Group": "main",
			"Model": "SocialSubscription",
			"Icon": {
				"ImageId": "MobileImageListSubscriptionModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListSubscriptionModuleImageV2"
			},
			"Hidden": true
		},
		"Lead": {
			"Group": "main",
			"Model": "Lead",
			"Icon": {
				"ImageId": "MobileImageListLeadModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListLeadModuleImageV2"
			},
			"Hidden": true
		},
		"Opportunity": {
			"Group": "main",
			"Model": "Opportunity",
			"Icon": {
				"ImageId": "MobileImageListOpportunityModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListOpportunityModuleImageV2"
			},
			"Hidden": true
		},
		"SysDashboard": {
			"Group": "sales",
			"Model": "SysDashboard",
			"Position": 6,
			"Title": "DashboardSectionTitle",
			"Icon": {
				"ImageId": "MobileImageListDashboardModuleImage"
			},
			"IconV2": {
				"ImageId": "MobileImageListDashboardModuleImageV2"
			},
			"Hidden": true
		}
	},
	"SyncOptions": {
		"ImportPageSize": 100,
		"PagesInImportTransaction": 5,
		"UseBatchExport": true,
		"SysSettingsImportConfig": [
			"SchedulerDisplayTimingStart",
			"PrimaryCulture",
			"PrimaryCurrency",
			"MobileApplicationMode",
			"CollectMobileAppUsageStatistics",
			"CanCollectMobileUsageStatistics",
			"MobileAppUsageStatisticsEmail",
			"MobileAppUsageStatisticsStorePeriod",
			"MobileSectionsWithSearchOnly",
			"MobileShowMenuOnApplicationStart",
			"MobileAppCheckUpdatePeriod",
			"ShowMobileLocalNotifications",
			"UseMobileUIV2",
			"MobileLogoImage",
			"RunMobileSyncInService",
			"NotifyMobileUserAboutAppUpdate",
			"EnableMobileErrorLog",
			"MobileDataSyncFrequency",
			"MobileTrackLocationFrequency",
			"CaseStatusDef",
			"CasePriorityDef",
			"CaseOriginDef"
		],
		"SysLookupsImportConfig": [
			"ActivityCategory",
			"ActivityPriority",
			"ActivityResult",
			"ActivityResultCategory",
			"ActivityStatus",
			"ActivityType",
			"AddressType",
			"AnniversaryType",
			"InformationSource",
			"MobileApplicationMode",
			"OppContactInfluence",
			"OppContactLoyality",
			"OppContactRole",
			"OpportunityStage",
			"OpportunityType",
			"SupplyPaymentDelay",
			"SupplyPaymentState",
			"SupplyPaymentType",
			"SocialChannel",
			"VwMobileSysSchema",
			"CommunicationType"
		],
		"ModelDataImportConfig": [
			"SocialChannel",
			"SocialLike",
			{
				"Name": "VwSocialSubscription",
				"SyncFilter": {
					"property": "SysAdminUnit",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUser"
				}
			},
			{
				"Name": "VwSocialUnsubscription",
				"SyncFilter": {
					"property": "SysAdminUnit",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUser"
				}
			},
			"VwMobileSysSchema",
			{
				"Name": "SocialMessage",
				"SyncColumns": [
					"Message",
					"Parent",
					"EntityId",
					"EntitySchemaUId",
					"LikeCount",
					"CommentCount"
				]
			},
			{
				"Name": "SysAdminUnit",
				"SyncColumns": [
					"Contact",
					"Account",
					"SysAdminUnitTypeValue",
					"Active"
				]
			},
			{
				"Name": "Contact",
				"SyncColumns": [
					"Name"
				]
			},
			{
				"Name": "Account",
				"SyncColumns": [
					"Name"
				]
			},
			{
				"Name": "Activity",
				"SyncColumns": [
					"Title",
					"StartDate",
					"Owner",
					"DueDate",
					"Priority",
					"ActivityCategory",
					"Status"
				]
			},
			{
				"Name": "ActivityPriority",
				"SyncColumns": []
			},
			{
				"Name": "ActivityType",
				"SyncColumns": []
			},
			{
				"Name": "ActivityCategory",
				"SyncColumns": []
			},
			{
				"Name": "ActivityStatus",
				"SyncColumns": []
			},
			{
				"Name": "CallDirection",
				"SyncColumns": []
			},
			{
				"Name": "Case",
				"SyncColumns": [
					"Number",
					"RegisteredOn",
					"Subject",
					"Status"
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
			}
		],
		"ModelDataExportConfig": [
			{
				"Name": "SocialLike",
				"IgnoreSplitLogActions": true
			},
			{
				"Name": "SocialMessage",
				"IgnoreSplitLogActions": true
			},
			{
				"Name": "SocialMention",
				"IgnoreSplitLogActions": true
			}
		]
	},
	"Models": {
		"SocialMessage": {
			"Grid": "MobileSocialMessageGridPage",
			"Preview": "MobileSocialMessagePreviewPage",
			"Edit": "MobileSocialMessageEditPage",
			"RequiredModels": [
				"SocialMessage",
				"Contact",
				"SysImage",
				"SocialSubscription",
				"SocialUnsubscription",
				"VwSocialSubscription",
				"VwSocialUnsubscription",
				"SocialChannel",
				"VwMobileSysSchema",
				"SocialLike",
				"SocialMention",
				"SysAdminUnit"
			],
			"ModelExtensions": [
				"MobileSocialMessageModelConfig"
			],
			"PagesExtensions": [
				"NavMobileSocialMessageActionsSettingsTest",
				"NavMobileSocialMessageGridPageSettingsTest",
				"NavMobileSocialMessageRecordPageSettingsTest",
				"MobileSocialMessageGridPageSettingsDefaultWorkplace",
				"MobileSocialMessageRecordPageSettingsDefaultWorkplace",
				"MobileSocialMessageEntityLoader",
				"MobileSocialMessageLikeManager",
				"MobileSocialMessageModuleConfig",
				"MobileSocialMessageGridPageStore",
				"MobileSocialMessageGridPageView",
				"MobileSocialMessageGridPageController"
			]
		},
		"SocialMention": {
			"ModelExtensions": [
				"MobileSocialMentionModelConfig"
			]
		},
		"SysDashboard": {
			"RequiredModels": [
				"SysDashboard",
				"SysModule"
			]
		},
		"LocationHistory": {
			"RequiredModels": [
				"LocationHistory"
			]
		},
		"Contact": {
			"RequiredModels": [
				"Contact",
				"SocialMessage"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"NavMobileContactActionsSettingsTest",
				"NavMobileContactGridPageSettingsTest",
				"NavMobileContactRecordPageSettingsTest"
			]
		},
		"Account": {
			"RequiredModels": [
				"Account",
				"SocialMessage"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"NavMobileAccountActionsSettingsTest",
				"NavMobileAccountGridPageSettingsTest",
				"NavMobileAccountRecordPageSettingsTest"
			]
		},
		"Activity": {
			"RequiredModels": [
				"Activity",
				"Contact",
				"ActivityPriority",
				"ActivityType",
				"ActivityCategory",
				"ActivityStatus",
				"CallDirection",
				"SocialMessage"
			],
			"ModelExtensions": [],
			"PagesExtensions": []
		},
		"Case": {
			"Grid": "NavMobileCaseGridPage",
			"RequiredModels": [
				"Case",
				"CaseStatus",
				"CasePriority",
				"CaseOrigin",
				"SocialMessage"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"NavMobileCaseActionsSettingsTest",
				"NavMobileCaseGridPageSettingsTest",
				"NavMobileCaseRecordPageSettingsTest"
			]
		}
	}
}
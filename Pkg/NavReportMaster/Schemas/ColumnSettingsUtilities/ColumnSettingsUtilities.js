define("ColumnSettingsUtilities", function() {
	function openColumnSettings(sandbox, config, callback, renderTo, scope) {
		var columnSettingsId = sandbox.id + "_ColumnSettings";
		var loadModuleConfig = config && config.loadModuleConfig;
		var isNestedColumnSettingModule = loadModuleConfig && loadModuleConfig.isNestedColumnSettingModule;
		renderTo = loadModuleConfig && loadModuleConfig.columnSettingsContainerName || renderTo;
		var handler = function(args) {
			if (isNestedColumnSettingModule) {
				sandbox.unloadModule(columnSettingsId);
				var state = sandbox.publish("GetHistoryState");
				var hash = state && state.hash;
				sandbox.publish("ReplaceHistoryState", {
					stateObj: {
						moduleId: sandbox.id
					},
					hash: hash && hash.historyState,
					silent: true
				});
			}
			callback.call(scope, args);
            var profile = scope.getNewProfileData();
            sandbox.publish("SaveGridSettings", profile, ["NavColumnMasterModule"]);
		};
		sandbox.subscribe("ColumnSettingsInfo", function() {
			return config;
		}, [columnSettingsId]);
		if (!isNestedColumnSettingModule) {
			var params = sandbox.publish("GetHistoryState");
			sandbox.publish("PushHistoryState", {hash: params.hash.historyState});
		}
		sandbox.loadModule("ColumnSettings", {
			renderTo: renderTo,
			id: columnSettingsId,
			keepAlive: !Boolean(isNestedColumnSettingModule),
			instanceConfig: {
				isNestedColumnSettingModule: isNestedColumnSettingModule
			}
		});
		sandbox.subscribe("ColumnSetuped", handler, [columnSettingsId]);
	}

	return {
		Open: openColumnSettings
	};
});

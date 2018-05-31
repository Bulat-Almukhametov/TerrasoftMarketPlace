define("NavGridSettings", ["GridSettingsV2", "css!GridSettingsV2"], function () {
	Ext.define("Terrasoft.configuration.NavGridSettings", {
        alternateClassName: "Terrasoft.NavGridSettings",
        extend: "Terrasoft.GridSettings",
        loadProfile: function () {
            this.callParent(arguments);

            var oldRefresh = this.viewModel.refreshRow;
            var scope = this;
            this.viewModel.refreshRow = function () {
				oldRefresh.apply(this, arguments);
                var profile = this.getNewProfileData();
                var saveConfig = this.sandbox.publish("SaveGridSettings", profile, ["NavColumnMasterModule"]);
            };
        },

        initHeaderCaption: Terrasoft.emptyFn,
    });

	return Terrasoft.NavGridSettings;
});
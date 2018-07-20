define("NavSubdivisionEmployeeDetail", [], function() {
	return {
		entitySchemaName: "NavSubdivisionEmployee",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			getNavSubdivisionEmployeeDetailCaption: function() {
				var cardPageName = this.get("CardPageName");
				if (cardPageName === "NavSubdivision1Page") {
					return this.get("Resources.Strings.NavSubdivisionCaption");
				}
				return this.get("Resources.Strings.Caption");
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Detail",
				"values": {
					caption: {bindTo: "getNavSubdivisionEmployeeDetailCaption"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

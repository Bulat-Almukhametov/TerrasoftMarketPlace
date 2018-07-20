define("NavConstants", [], function() {
	var caseStatus = {
		Ordered: "fcaa4483-13cd-429b-8127-6459a5d18f3a",
		DriverFound: "fbf1f009-dec0-4461-a09d-b15041e5806c",
		SMSSend: "74714011-24b2-4365-98d6-8dfb26c525ff",
		Canceled: "d6f8f6cc-cafe-41d3-bf0a-8a8a1765c887",
		Finished: "a076fc57-4476-4d8b-a2aa-96fd4b283b94",
		Canceled_: "6e5f4218-f46b-1410-fe9a-0050ba5d6c38",
		ClientInformed: "623b3ee5-1c62-4675-bf56-e85e402f9d84",
		TaxiArrived: "c7e76810-b263-4eac-a8bf-40c1eefac3c0",
		InProgress: "1d733750-f7e1-47d6-9fc5-966833528da7",
		Reopened: "f063ebbe-fdc6-4982-8431-d8cfa52fedcf",
		Reopened_: "ed00b14b-e3a1-46e6-b35d-4d2000118f5c"
	};
	var caseCategory = {
		DriverTASS: '10d376bc-e17c-4483-ad3a-e62d3c992f43',
		TAXI:"05e30c24-880b-4e66-9fd3-cb9622739ee0"
	};
	var roles = {
		CallCenterChief: "e8185ff4-7258-4887-85db-75244c628d40",
		CallCenterOperator: "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a"
	};
	var contactType = {
		Operator: "98e2cb0d-9286-4461-a68c-6383410858f5"
	};
	var contactStatus = {
		Online: "2e799a4e-f421-4f48-9755-4e12179b0962"	
	};
	var purposeOfTrip = {
		Airport: "05b309d5-7403-4058-8bb8-1ef3eb7311b5",
		RailwayStation: "564bdd36-473d-4e33-9443-9dabda2aaa4a"
	};
	var airport = {
		Other: "94b27bcf-7de5-43b4-b93a-899adfb99c98"
	};
	var railwayStation = {
		Other: "d79192e1-c65e-459f-b83f-6d540a5ed2f6"	
	};
	var communicationType = {
		Inner: "e9d91e45-8d92-4e38-95a0-ef8aa28c9e7a"	
	};
	return {
		Airport: airport,
		RailwayStation: railwayStation,
		CaseStatus: caseStatus,
		CaseCategory: caseCategory,
		Roles: roles,
		ContactStatus: contactStatus,
		ContactType: contactType,
		PurposeOfTrip: purposeOfTrip,
		CommunicationType: communicationType
	};
});
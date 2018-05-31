define("NavRoleCheckHelper", [], function() {

	function ConvertArrayToUpper (array) {
        var toUpper=[];
        array.forEach(function(el){toUpper.push(el.toUpperCase())});

        return toUpper;
    }
	return{
        checkIsUserInRole: function(Roles) {
            if (Ext.isEmpty(Roles)) {
                return false;
            }
            var userRoles = this.get("UserRoles");
            if (!userRoles || !userRoles.filter) {
                window.console.warn("Не удалось получить роли пользователя");
                return false;
            }

            if (Array.isArray(Roles)) {
                Roles = ConvertArrayToUpper(Roles);
            }
            else
            {
                Roles = Roles.toUpperCase();
            }

            var usersRolesInList = userRoles.filter(function(n) {
                return Roles.indexOf(n.toUpperCase()) !== -1;
            });

            return !!usersRolesInList.length;
        },

        setupUserRoles: function() {
            var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                rootSchemaName: "SysUserInRole"
            });

            esq.addColumn("SysRole.Name", "RoleName");
            esq.addColumn("SysRole");
            esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SysUser", Terrasoft.SysValue.CURRENT_USER.value));
            esq.getEntityCollection(function(result) {
                var roles = [];
                var names = [];
                result.collection.collection.items.forEach(function(el) {
                    names.push(el.values.RoleName);
                });
                result.collection.collection.items.forEach(function(el) {
                    roles.push(el.values.SysRole.value);
                })
                this.set("UserRoles", roles);

                if (Ext.isFunction(this.onRolesSetup)){
                	this.onRolesSetup();
				}
            }, this);


        },
	};
});
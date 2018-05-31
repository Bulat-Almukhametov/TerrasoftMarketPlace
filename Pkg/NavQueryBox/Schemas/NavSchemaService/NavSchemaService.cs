namespace Terrasoft.Configuration.NavSchemaService
{
    using Core.Entities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Web;
    using Terrasoft.Core;
    using System.Text.RegularExpressions;


    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NavSchemaService
    {
        private bool RequestIsClear(string text)
        {
            return Regex.IsMatch(text, @"^[\w, \s, %]+?$", RegexOptions.IgnoreCase);
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public List<SchemaModel> FindSchemas(NavSchemaSearch serviceParams)
        {
            var schemaList = new List<SchemaModel>();
            if (RequestIsClear(serviceParams.Caption)) // если нет SQL-инъекций
            {
                try
                {
                    var sql = string.Format(

    @"
DECLARE @caption nvarchar(500) = '%{0}%';


EXEC sp_executesql
N'SELECT TOP {1}
	Caption,
	Name
FROM
(
	SELECT DISTINCT
		Caption,
		Name,
		LEN(Caption) AS clen
	FROM
		SysSchema
	WHERE
		ManagerName = @EntitySchemaManager
		AND
        (
		    Caption LIKE @Caption
            OR
            Name LIKE @Caption
        )
) AS t
ORDER BY clen, Caption',

N'@EntitySchemaManager nvarchar(20), @Caption nvarchar(500)',
@EntitySchemaManager = 'EntitySchemaManager',
@Caption = @caption", serviceParams.Caption, serviceParams.Top);


                    using (var dbExecutor = UserConnection.EnsureDBConnection())
                    {
                        using (var reader = dbExecutor.ExecuteReader(sql))
                        {
                            while (reader.Read())
                            {
                                schemaList.Add(new SchemaModel
                                {
                                    Caption = reader["Caption"].ToString(),
                                    Name = reader["Name"].ToString()
                                });
                            }
                        }
                    }


                }
                catch (Exception e)
                {

                }
            }

            return schemaList;
        }

        private UserConnection _userConnection;
        private UserConnection UserConnection
        {
            get
            {

                return _userConnection == null
                    ? _userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"]
                    : _userConnection;
            }
        }


    } 

    [DataContract]
    public class NavSchemaSearch
    {
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public int Top { get; set; }
    }

    [DataContract]
    public class SchemaModel
    {
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public string Name { get; set; }
    }
}
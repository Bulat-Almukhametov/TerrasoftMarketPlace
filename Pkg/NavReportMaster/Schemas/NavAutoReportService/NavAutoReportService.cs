namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Web;
    using DocumentFormat.OpenXml;
    using DocumentFormat.OpenXml.Drawing.Wordprocessing;
    using DocumentFormat.OpenXml.Packaging;
    using DocumentFormat.OpenXml.Wordprocessing;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using OpenXmlDrawing = DocumentFormat.OpenXml.Drawing;
    using OpenXmlPictures = DocumentFormat.OpenXml.Drawing.Pictures;
    using OpenXmlDrawingProcessing = DocumentFormat.OpenXml.Drawing.Wordprocessing;
    using Terrasoft.Common;
    using Terrasoft.Common.Json;
    using Terrasoft.Core;
    using Terrasoft.Core.Configuration;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Factories;
    using Terrasoft.Nui.ServiceModel.Extensions;
    using Terrasoft.Reports;
    using Terrasoft.UI.WebControls.Controls;
    using Terrasoft.UI.WebControls.Utilities.Json.Converters;
    using Terrasoft.Web.Common;
    using Terrasoft.Configuration.ReportService;
    using global::Common.Logging;



    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NavAutoReportService
    {
        private UserConnection _userConnection;
        UserConnection UserConnection
        {
            get
            {
                if (_userConnection != null)
                {
                    return _userConnection;
                }
                if (HttpContext.Current.Session != null)
                {
                    _userConnection = HttpContext.Current.Session["UserConnection"] as UserConnection;
                }
                return _userConnection;
            }
        }

        [OperationContract]
        [WebGet(UriTemplate = "GetReportFile/{reportId}/{entityId}")]
        public Stream GenerateReport(string reportId, string entityId)
        {
            var logger = LogManager.GetLogger("NavReportLogger");
            logger.Info("GenerateReport(reportId=\"" + reportId + "\", entityId=\"" + entityId + "\")");

            var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "NavCustomisableReport");
            esq.AddAllSchemaColumns();
            esq.AddColumn("NavSourceEntity.Name");
            esq.UseAdminRights = false;

            var reportParams = (NavCustomisableReport)esq.GetEntity(UserConnection, reportId);
            Stream result = new MemoryStream();
            try
            {
                var manager = UserConnection.GetSchemaManager("ReportSchemaManager") as Reports.ReportSchemaManager;
                if (manager == null) throw new Exception("manager == null");

                Reports.ReportSchema reportSchema = manager.FindInstanceByUId(new Guid("5250B05B-0115-495C-928C-46F0C5F95B9B"));
                var rep = reportSchema.CreateReport(UserConnection);

                if (rep.Parameters == null || rep.Parameters["Filters"] == null)
                    throw new Exception("rep.Parameters == null");

                string filterString = reportParams.NavFilters;
                if (filterString.Length > 0)
                {
                    var filters = Json.Deserialize<Terrasoft.Nui.ServiceModel.DataContract.Filters>(filterString);
                    var esqFilters = filters.BuildEsqFilter(reportParams.GetTypedColumnValue<string>("NavSourceEntity_Name"), UserConnection);
                    rep.Parameters["Filters"].Value = esqFilters;
                }
                rep.Parameters["ReportParamsId"].Value = reportId;
                rep.Parameters["CardSourceId"].Value = entityId;
                logger.Info("set CardSourceId = " + entityId);
                logger.Info("Начинаем генерировать отчет");
                rep.ExportToPdf(result);
                result.Position = 0;

                OutgoingWebResponseContext outgoingResponse = WebOperationContext.Current.OutgoingResponse;
                outgoingResponse.ContentType = "application/pdf; charset=UTF-8";
                outgoingResponse.ContentLength = result.Length;
                string reportCaption = HttpUtility.UrlPathEncode(reportParams.NavName);
                outgoingResponse.Headers.Add("Content-Disposition", "attachment; filename*=UTF-8''" + reportCaption + ".pdf");
                logger.Info("Отчет сгенерирован успешно. Length=" + result.Length);


            }
            catch (Exception ex)
            {
                logger.Error(ex.ToString());
            }
            return result;
        }
    }

}

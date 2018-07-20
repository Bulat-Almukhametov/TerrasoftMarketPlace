namespace Terrasoft.Configuration
{
    using System;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using System.Web;
    using Terrasoft.Core;
    using AdIntegration.AD;
    using Core.Scheduler;
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NavAdIntegrationService
    {
    	private UserConnection _userConnection;
    	
        private UserConnection UserConnection
        {
            get
            {
                if (_userConnection != null)               
                {
                    return _userConnection;
                }
                _userConnection = HttpContext.Current.Session["UserConnection"] as UserConnection;
                if (_userConnection != null)
                {
                    return _userConnection;
                }
                var appConnection = (AppConnection)HttpContext.Current.Application["AppConnection"];
                _userConnection = appConnection.SystemUserConnection;
                return _userConnection;
            }

            set
            {
                _userConnection = value;
            }
        }
        
        

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped)]
        public string SetContactIntegrationShedule()
        {
            string result;
            try
            {                                                          
                UserConnection.DBSecurityEngine.CheckCanExecuteOperation("CanManageAdministration");
                object interval = null;
                bool hasOldInterval = Terrasoft.Core.Configuration.SysSettings.TryGetValue(UserConnection,
                        "LDAPSynchInterval", out interval);
                                                                                    
                if (hasOldInterval && (int)interval != 0)
                {           
                    AppScheduler.ScheduleMinutelyProcessJob("NavAdProcessJob", "NavProcess", "NavAdStarterProcess",
                        UserConnection.Workspace.Name, UserConnection.CurrentUser.Name, (int)interval * 60);

                    global::Common.Logging.ILog _logger = global::Common.Logging.LogManager.GetLogger("ContactProcessLog");
                    _logger.Info("������������� ������������� ��������� ������ " + (int)interval + " �����");
                }


                result = "Ok";
            }
            catch (Exception ex)
            {
                result = ex.ToString();


            }
            return result;
        }
    }
    
}
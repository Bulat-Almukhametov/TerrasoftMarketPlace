using System;
using System.Linq;
using Terrasoft.Core;

namespace AdIntegration.AD
{
    public class AdElementsHelper
    {
        private AdCredentials _Credentials;
        protected string _DistinguishedName;
        protected string _RequestText;
        protected UserConnection _UserConnection;
        public AdElementsHelper(UserConnection userConnection, AdCredentials credentials, string distinguishedName, string requestText)
        {
            _Credentials = credentials;
            _DistinguishedName = distinguishedName;
            _RequestText = requestText;
            _UserConnection = userConnection;
        }
        public AdElement[] GetAllElements()
        {
            // Узнаем наличие лицензии
            var licHelper = new LicHelper(_UserConnection);
            bool hasLicense = licHelper.GetHasOperationLicense("NavAd.Use");
            // Узнаем находится ли приложение в демо режиме
            var _appConnection = new AppConnection();
            var isDemoModeObj = _appConnection.SystemUserConnection.ApplicationData["IsDemoMode"];
            bool isDemoMode = (isDemoModeObj == null) ? true : Convert.ToBoolean(isDemoModeObj);
            // Получаем записи из Active Directory
            AdElement[] entries;
            using (var ldp = new LdapSync(_Credentials.ServerName, _Credentials.Login, _Credentials.Password, _Credentials.AuthentificationType))
            {
                entries = ldp.GetEntriesWithAttributes(_DistinguishedName, _RequestText);
            }
            // Если демо режим илт нет лицензии, берем только 50 записей
            if (isDemoMode || !hasLicense)
            {
                entries = entries?.Take(50).ToArray();
            }
            // Возвращаем записи
            return entries;
        }
    }
}

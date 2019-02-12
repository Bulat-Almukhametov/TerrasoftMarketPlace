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
            // Получаем записи из Active Directory
            AdElement[] entries;
            using (var ldp = new LdapSync(_Credentials.ServerName, _Credentials.Login, _Credentials.Password, _Credentials.AuthentificationType))
            {
                entries = ldp.GetEntriesWithAttributes(_DistinguishedName, _RequestText);
            }
            // Если демо режим илт нет лицензии, берем только 50 записей
            if (IsDemoMode() || !HasLicense("NavAd.Use"))
            {
                entries = entries?.Take(50).ToArray();
            }
            // Возвращаем записи
            return entries;
        }

        private bool HasLicense(string sysPackageOperationCode)
        {
            var licHelper = new LicHelper(_UserConnection);
            return licHelper.GetHasOperationLicense(sysPackageOperationCode);
        }

        private bool IsDemoMode()
        {
            var appConnection = new AppConnection();
            var isDemoModeObj = appConnection.SystemUserConnection.ApplicationData["IsDemoMode"];
            return (isDemoModeObj == null) ? true : Convert.ToBoolean(isDemoModeObj);
        }
    }
}
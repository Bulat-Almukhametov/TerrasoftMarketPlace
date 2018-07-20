using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            var licHelper = new LicHelper(_UserConnection);
            bool hasLicense = licHelper.GetHasOperationLicense("NavAd.Use");
            AdElement[] entries;
            using (var ldp = new LdapSync(_Credentials.ServerName, _Credentials.Login, _Credentials.Password))
            {
                entries = ldp.GetEntriesWithAttributes(_DistinguishedName, _RequestText);
            }

            if (!hasLicense && entries != null)
            {
                entries = entries.Take(50).ToArray();
            }
            

            return entries;
        }
    }
}

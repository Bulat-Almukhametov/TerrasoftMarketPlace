using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.DirectoryServices.Protocols;
using System.Xml.Serialization;
using Common.Logging;

namespace AdIntegration.AD
{
    public class LdapSync : IDisposable
    {
        #region private fields
        private LdapConnection _LdapConnection; 
        /// <summary>
        /// Элемент орг. структуры LDAP со списком пользователей для синхронизации
        /// </summary>

        #endregion

        /// <summary>
        ///  Конструктор
        /// </summary>
        /// <param name="targetOU">Элемент орг. структуры LDAP со списком пользователей для синхронизации</param>
        public LdapSync(string ldapServer, string user, string password, string authentificationType)
        {
            authentificationType = authentificationType.ToUpper();
            var credential = new NetworkCredential(user, password);
            AdAuthentificationTypes adTypes = new AdAuthentificationTypes();
            AuthType authType = adTypes.getAuthType(authentificationType);
            _LdapConnection = new LdapConnection(ldapServer)
            {
                Credential = credential,
                AuthType = authType
            };
            _LdapConnection.SessionOptions.ProtocolVersion = 3;

        }
        public void Dispose()
        {
            _LdapConnection.Dispose();
        }

        public AdElement[] GetEntriesWithAttributes(string distinguishedName, string request)
        {
            var searchRequest = new SearchRequest(distinguishedName, request, SearchScope.Subtree);
            PageResultRequestControl prc = new PageResultRequestControl(1000);
            SearchOptionsControl soc = new SearchOptionsControl(System.DirectoryServices.Protocols.SearchOption.DomainScope);
            searchRequest.Controls.Add(prc);
            searchRequest.Controls.Add(soc);

            var result = new List<AdElement>();

            do
            {
                SearchResponse searchResponse = null;
                Exception exc = null;

                for(int i = 0; i < 5; i++)
                {
                    try
                    {
                        searchResponse = (SearchResponse)_LdapConnection.SendRequest(searchRequest, new TimeSpan(0,2,0));
                        i = 5;  
                    }
                    catch (Exception ex)
                    {
                        exc = ex;                                       
                    }
                }

                if (searchResponse == null )
                {
                    throw exc;
                }
                
                foreach (DirectoryControl control in searchResponse.Controls)
                {
                    if (control is PageResultResponseControl)
                    {
                        //update the cookie for next set
                        prc.Cookie = ((PageResultResponseControl)control).Cookie;
                        break;
                    }
                }

                //add them to our collection

                ILog log = LogManager.GetLogger("ContactProcessLog ");
                log.Info("1");
                foreach (var entryObject in searchResponse.Entries)
                {
                    var entry = (SearchResultEntry)entryObject;
                    result.Add(new AdElement(entry));

                }


            }
            while (prc.Cookie.Length != 0) ;
            

            return result.ToArray();
        }

        private string GetAttributeValues(DirectoryAttribute attribute)
        {
            var result = new StringBuilder();
            foreach(var item in attribute)
            {
                result.Append(item.ToString());
            }
            return result.ToString();
        } 
    }
}

using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIntegration.AD
{
    public class AdAuthentificationTypes
    {
        public Dictionary<string, AuthType> _AuthTypes;

        public AdAuthentificationTypes()
        {
            _AuthTypes = new Dictionary<string, AuthType>();
            _AuthTypes.Add("1CFB85A3-9D29-44FD-9E73-E3A7D2D67357", AuthType.Basic);
            _AuthTypes.Add("C9B19DCD-C0E8-455C-8664-CE32A0BABC7D", AuthType.Ntlm);
            _AuthTypes.Add("5EFA56F9-3182-400C-88ED-5B7ADDC418EF", AuthType.Kerberos);
            _AuthTypes.Add("B64D61CC-882D-461E-B62D-33859EDC71EA", AuthType.Negotiate);
            _AuthTypes.Add("B5C4AF25-3E07-4079-A6B6-D4413B92DE76", AuthType.Sicily);
        }

        public AuthType getAuthType(string authentificationType)
        {
            try
            {
                return _AuthTypes[authentificationType];
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}

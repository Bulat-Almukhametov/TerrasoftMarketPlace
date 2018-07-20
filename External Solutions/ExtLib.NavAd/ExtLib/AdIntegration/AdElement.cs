using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIntegration.AD
{
    public class AdElement
    {
        public AdElement(SearchResultEntry entry)
        {
            ParseAttributes(entry);
            this.Name = Attributes["name"].Value;
        }

        public string Name { get; private set; }
        public Dictionary<String, AdAttribute> Attributes { get; private set; }


        private void ParseAttributes(SearchResultEntry entry)
        {
            Attributes = new Dictionary<String, AdAttribute>();
            foreach(var attribute in entry.Attributes.Values)
            {
                var attr = (DirectoryAttribute)attribute;
                Attributes.Add(attr.Name, new AdAttribute(attr));
            }

        }

        

        public override string ToString()
        {
            var keys = new string[] { "cn", "title", "mail", "mobile", "department"};
            var displayAttributes = new List<String>();

            foreach(var key in keys)
            {
                if (Attributes.ContainsKey(key))
                    displayAttributes.Add(Attributes[key].Value);
            }
            return Name + " = ["+ String.Join("; ", displayAttributes) + "]";
        }
    }


}

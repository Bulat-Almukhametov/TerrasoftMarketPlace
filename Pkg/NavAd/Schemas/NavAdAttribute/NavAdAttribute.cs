using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdIntegration.AD
{
    public class AdAttribute
    {
        public AdAttribute(DirectoryAttribute attribute)
        {
            Name = attribute.Name;

            var attributesList = new List<String>();
            foreach (var item in attribute)
            {
                var attr = item as byte[];
                attributesList.Add(Encoding.UTF8.GetString(attr));
            }

            Items = attributesList.ToArray();
            Value = String.Join("; ", attributesList);
        }

        public string Name { get; private set; }
        public string[] Items { get; private set; }
        public string Value { get; private set; }

        public override string ToString()
        {
            return Value;
        }
    }
}

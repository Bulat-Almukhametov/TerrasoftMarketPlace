using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Logging;

namespace AdIntegration.AD
{
    public class AdAttribute
    {
        public AdAttribute(DirectoryAttribute attribute)
        {
            Name = attribute.Name;

            var attributesList = new List<String>();
            var binaryAttributesList = new List<byte[]>();
            foreach (var item in attribute)
            {
                var attr = item as byte[];
                binaryAttributesList.Add(attr);
                attributesList.Add(Encoding.UTF8.GetString(attr));
            }

            Items = attributesList.ToArray();
            BinaryItems = binaryAttributesList.ToArray();
            Value = String.Join("; ", attributesList);
            log.Info(Items + " Items");
            log.Info(Value + " Value");
        }

        ILog log = LogManager.GetLogger("ContactProcessLog ");
        public string Name { get; private set; }
        public string[] Items { get; private set; }
        public byte[][] BinaryItems { get; private set; }
        public string Value { get; private set; }

        public override string ToString()
        {
            return Value;
        }
    }
}

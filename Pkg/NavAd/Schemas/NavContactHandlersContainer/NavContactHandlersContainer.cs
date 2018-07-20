namespace Terrasoft.Configuration
{
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using System;      
    using System.Data;
    using System.Linq;
    using AdIntegration.AD;        
    using global::Common.Logging;

    [AdAttributeHandlerAttribute("CreateDepartment")]
    public class CreateDepartmentClass : IAdAttributeHandler
    {
        protected readonly ILog _logger = LogManager.GetLogger("AdLog");

        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            if (element.Attributes.ContainsKey(handler.GetTypedColumnValue<string>("NavAdAttributeName")))
            {
                var contact = (Contact)relatedEntity;

                _logger.Info("Парсим подразделения контакта");
                char[] separator = Core.Configuration.SysSettings.GetValue(userConnection.AppConnection.SystemUserConnection, "ContactDepartmentSeparator").ToString().ToArray();
                var departmentsAD = element.Attributes[handler.GetTypedColumnValue<string>("NavAdAttributeName")].Value // значение атрибута в AD
                    .Split(separator) // делим по "косой черте" на департаменты
                    .Select(d => d.Trim()) // очищаем от лишних пробелов
                    .Where(d => d.IsNotEmpty()) // убираем из выборки пустые значения
                    .ToArray();

                if (departmentsAD.Length == 0)
                    _logger.Warn("Контакт не состоит ни в одном подразделении");

                NavSubdivisionEmployee[] departmentsRecords = GetDepartmentsRecords(userConnection, contact);

                _logger.Info("Создаем запись или обновляем порядковый номер в развязочной таблице");
                for (int i = 0; i < departmentsAD.Length; i++)
                {

                    // получаем департамент из БД
                    NavSubdivision subdivision = getSubdivision(userConnection, departmentsAD[i]);

                    // если контакт не привязан к подразделению создаем запись в развязочной таблице
                    NavSubdivisionEmployee subEmployee = departmentsRecords.FirstOrDefault(record => record.NavSubdivisionNavName == departmentsAD[i]);
                    if (subEmployee == null)
                    {
                        subEmployee = CreateSubEmployee(userConnection, contact, subdivision, i);
                    }
                    else
                    {
                        subEmployee.NavNumber = i;
                    }
                    subEmployee.Save(false);

                }

                // убираем контакт из подразделения, в котором его нет
                var exSubEmploees = departmentsRecords.Where(subEmployee => !departmentsAD.Contains(subEmployee.NavSubdivisionNavName));
                foreach (var exSubEmploee in exSubEmploees)
                {
                    _logger.Warn("Контак в AD больше не состоит в подразделении \"" + exSubEmploee.NavSubdivisionNavName);
                    exSubEmploee.Delete();
                }




            }
            else
                _logger.Info("Департамента в атрибуте LDAP " + handler.GetTypedColumnValue<string>("NavAdAttributeName") + " нет");

            return true;
        }


        private NavSubdivisionEmployee CreateSubEmployee(UserConnection userConnection, Contact contact, NavSubdivision subdivision, int subdivisonNumber)
        {
            _logger.Info("Создаем новую запись в развязочной таблице");
            var subEmployee = new NavSubdivisionEmployee(userConnection);
            subEmployee.UseAdminRights = false;
            subEmployee.SetDefColumnValues();

            subEmployee.NavContactId = contact.Id;
            subEmployee.NavSubdivisionNavName = subdivision.NavName;
            subEmployee.NavNumber = subdivisonNumber;
            subEmployee.NavSubdivisionId = subdivision.Id;
            subEmployee.NavSynchronizedWithLDAP = true;

            subdivision.Save();
            _logger.Info("Создалась новая запись.");

            return subEmployee;
        }

        private NavSubdivision getSubdivision(UserConnection userConnection, string name)
        {
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavSubdivision");
            esq.UseAdminRights = false;
            esq.AddAllSchemaColumns();

            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavName", name));

            var collection = esq.GetEntityCollection(userConnection);
            NavSubdivision result;
            if (collection.IsEmpty())
            {
                _logger.Info("Подразделение не " + name + " найдено.");
                result = new NavSubdivision(userConnection);
                result.UseAdminRights = false;
                result.SetDefColumnValues();
                result.NavName = name;
                result.Save();
                _logger.Info("Создали новую запись в Бд.");
            }
            else
            {
                result = (NavSubdivision)collection.First();
            }

            return result;
        }

        private NavSubdivisionEmployee[] GetDepartmentsRecords(UserConnection userConnection, Contact contact)
        {
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavSubdivisionEmployee");
            esq.UseAdminRights = false;
            esq.AddAllSchemaColumns();
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavContact", contact.Id));
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavSynchronizedWithLDAP", true));



            _logger.Info("Получаем все подразделения связанные с контактом");
            var collection = esq.GetEntityCollection(userConnection);

            return collection.Select(entity => (NavSubdivisionEmployee)entity).ToArray();


        }

    }

    [AdAttributeHandlerAttribute("AddContactCommunication")]
    public class AddContactCommunicationClass : IAdAttributeHandler
    {
        protected readonly ILog _logger = LogManager.GetLogger("AdLog");

        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            _logger.Info("Добавляем средство связи " + handler.GetTypedColumnValue<string>("NavAdAttributeName"));

            string adValue = AdAttributesHelper.GetAdValue(element, (NavAdAttributesHandlers)handler);

            var contact = (Contact)relatedEntity;
            Guid communicationTypeId = GetCommunicationType(userConnection, handler.GetTypedColumnValue<string>("NavAdAttributeName"));
            ContactCommunication[] contactCommunications = GetContactCommunications(userConnection, contact, communicationTypeId);

            if (adValue != null)
            {
                char[] separator = Core.Configuration.SysSettings.GetValue(userConnection.AppConnection.SystemUserConnection, "ContactCommunicationSeparator").ToString().ToArray();
                var communicationValues = adValue.Split(separator).Select(s => s.Trim()).ToList();

                // обрабатываем уже существующие в bpm средства связи
                foreach (var cm in contactCommunications)
                {
                    if (!communicationValues.Contains(cm.Number))
                    {
                        cm.Delete();
                    }
                    else
                    {
                        communicationValues.Remove(cm.Number);
                    }
                }

                // создаем отсутствующие записи
                foreach (var cv in communicationValues)
                {
                    var contactCommunication = new ContactCommunication(userConnection);
                    contactCommunication.UseAdminRights = false;

                    contactCommunication.SetDefColumnValues();
                    contactCommunication.ContactId = contact.Id;
                    contactCommunication.CommunicationTypeId = communicationTypeId;
                    contactCommunication.NavSynchronizedWithLDAP = true;

                    contactCommunication.Number = cv;
                    contactCommunication.Save(false);
                }



            }
            else
            {
                foreach (var cm in contactCommunications)
                {
                    cm.Delete();
                }
            }

            return true;
        }

        private Guid GetCommunicationType(UserConnection userConnection, string adAttributeName)
        {
            _logger.Info("Получаем тип средства связи");
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "NavConformityAttribute");
            esq.AddAllSchemaColumns();
            esq.UseAdminRights = false;

            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavAttributeAD", adAttributeName));

            var collection = esq.GetEntityCollection(userConnection);
            if (collection.Count == 0)
            {
                throw new Exception("Нет соответствия в таблице \"Соответствие атрибута в AD и типа средства связи\" для атрибута " + adAttributeName);
            }


            return ((NavConformityAttribute)collection.First()).NavCommunicationTypeId;
        }

        private ContactCommunication[] GetContactCommunications(UserConnection userConnection, Contact contact, Guid communicationTypeId)
        {
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "ContactCommunication");
            esq.AddAllSchemaColumns();
            esq.UseAdminRights = false;
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "Contact", contact.Id));
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "CommunicationType", communicationTypeId));
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavSynchronizedWithLDAP", true));

            var collection = esq.GetEntityCollection(userConnection);
            ContactCommunication[] contactCommunications = new ContactCommunication[0];

            if (collection.Count > 0)
            {
                contactCommunications = collection.Select(e => { e.UseAdminRights = false; return (ContactCommunication)e; }).ToArray();
            }

            return contactCommunications;
        }
    }

    [AdAttributeHandlerAttribute("AddContactAddress")]
    public class AddContactAddressClass : IAdAttributeHandler
    {
        protected readonly ILog _logger = LogManager.GetLogger("AdLog");

        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            _logger.Info("Читаем адрес контакта");
            var contact = (Contact)relatedEntity;
            Guid? countryId = null;
            Guid? cityId = null;
            string addr = null;
            string room = null;

            // Страна
            string countryAttr = AdAttributesHelper.GetXmlElement("country", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
            if (countryAttr.IsNotEmpty() && element.Attributes.ContainsKey(countryAttr))
            {
                string countryName = element.Attributes[countryAttr].Value;
                var country = (Country)AdAttributesHelper.GetOrCreateEntityByDisplayValue(userConnection, "Country", countryName);

                countryId = country.Id;

                _logger.Info("Страна = " + countryName);
            }

            // Город
            string cityAttr = AdAttributesHelper.GetXmlElement("city", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
            if (cityAttr.IsNotEmpty() && element.Attributes.ContainsKey(cityAttr))
            {
                string cityName = element.Attributes[cityAttr].Value;
                var city = (City)AdAttributesHelper.GetOrCreateEntityByDisplayValue(userConnection, "City", cityName);

                cityId = city.Id;

                _logger.Info("Город = " + cityName);
            }

            // Улица, дом
            string addrAttr = AdAttributesHelper.GetXmlElement("address", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
            if (addrAttr.IsNotEmpty() && element.Attributes.ContainsKey(addrAttr))
            {
                addr = element.Attributes[addrAttr].Value;

                _logger.Info("Адрес = " + addr);
            }

            if (countryId != null || cityId != null || addr != null)
            {
                _logger.Info("Сохраняем адрес контакта");
                ContactAddress address = GetContactAddress(userConnection, contact);

                address.SetColumnValue("CountryId", countryId);
                address.SetColumnValue("CityId", cityId);
                address.Address = addr;

                try
                {
                    address.Save(false);
                }
                catch (Exception ex)
                {

                    _logger.Error("Ошибка при сохранении адреса " + ex.ToString());
                }
            }


            return true;
        }

        private ContactAddress GetContactAddress(UserConnection userConnection, Contact contact)
        {
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "ContactAddress");
            esq.UseAdminRights = false;
            esq.AddAllSchemaColumns();

            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "Contact", contact.Id));
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavIsCreatedBySynchronization", true));

            var collection = esq.GetEntityCollection(userConnection);

            ContactAddress result;

            if (collection.IsNotEmpty())
            {
                result = (ContactAddress)collection.First();
                result.UseAdminRights = false;
            }
            else
            {
                result = new ContactAddress(userConnection);
                result.UseAdminRights = false;
                result.SetDefColumnValues();
                result.AddressTypeId = AddressTypeConsts.BusinessId;
                result.ContactId = contact.Id;
                result.NavIsCreatedBySynchronization = true;
            }

            return result;
        }
    }
}
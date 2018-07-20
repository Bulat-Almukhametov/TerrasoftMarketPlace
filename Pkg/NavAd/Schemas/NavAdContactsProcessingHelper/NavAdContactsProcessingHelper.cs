namespace Terrasoft.Configuration
{
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using System;
    using System.Data;
    using System.Linq;
    using AdIntegration.AD;
    using System.Collections.Generic;
    public class NavAdContactsProcessingHelper : NavAdElementsProcessingHelper
    {
        protected override string _HandlersSchemaName
        {
            get
            {
                return "NavContactHandlers";
            }
        }

        UserConnection _UserConnection;
        Contact _Record;
        string _AdIdAttribute;
        string _EntityAdAttribute;

        public NavAdContactsProcessingHelper(string adIdAttribute, string entityAdAttribute)
        {
            _AdIdAttribute = adIdAttribute;
            _EntityAdAttribute = entityAdAttribute;
        }

        protected override Entity GetRecord(UserConnection userConnection, AdElement adElement)
        {
            if (!adElement.Attributes.ContainsKey(_AdIdAttribute))
                throw new Exception("� �������� AD ����������� �������� �������� " + _AdIdAttribute + " ��� ������������� � ���������.");

            string adIdentificator = adElement.Attributes[_AdIdAttribute].Value;
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "Contact");
            esq.AddAllSchemaColumns();
            esq.UseAdminRights = false;

            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, _EntityAdAttribute, adIdentificator));
            var entity = esq.GetEntityCollection(userConnection).FirstOrDefault();

            // ���� ������� �� ������, �� ������� �����
            if (entity == null)
            {
                entity = new Contact(userConnection);
                entity.UseAdminRights = false;
                entity.SetDefColumnValues();
                // ��������� ���� � ��
                entity.SetColumnValue(_EntityAdAttribute, adIdentificator);
                entity.Save(false);
            }
            entity.UseAdminRights = false;

            return entity;
        }
    }
  
}
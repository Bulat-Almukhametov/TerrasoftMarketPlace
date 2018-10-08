namespace Terrasoft.Configuration
{
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using System;
    using System.Linq;
    using AdIntegration.AD;
    using global::Common.Logging;
    using System.Xml;
    using System.IO;

    public static class AdAttributesHelper
    {
        static readonly ILog _logger = LogManager.GetLogger("AdLog");

        /// <summary>
        /// Получаем из элемента AD значение из атрибута, указанном в записи обработчика в БД
        /// </summary>
        /// <param name="element">Элемент, полученныей из AD</param>
        /// <param name="handler">Запись обработчика в БД</param>
        /// <returns>строковое значение атрибута</returns>
        public static string GetAdValue(AdElement element, NavAdAttributesHandlers handler)
        {
            _logger.Info("Получаем из элемента AD значение из атрибута, указанном в записи обработчика в БД " + handler.NavAdAttributeName);
            string adValue = null;
            // проверяем, что из AD мы получили значение нужного атрибута
            if (element.Attributes.ContainsKey(handler.NavAdAttributeName))
            {
                adValue = element.Attributes[handler.NavAdAttributeName].Value;
            }
            else
            {
                _logger.Warn("В элементе AD не найден атрибут " + handler.NavAdAttributeName);
            }

            return adValue;
        }

        /// <summary>
        /// Получить строковое значение элемента XML
        /// </summary>
        /// <param name="name"></param>
        /// <param name="xmlString"></param>
        /// <returns></returns>
        public static string GetXmlElement(string name, string xmlString)
        {
            string typeString = "";

            try
            {
                using (XmlReader reader = XmlReader.Create(new StringReader(xmlString)))
                {
                    reader.ReadToFollowing(name);

                    typeString = reader.ReadElementContentAsString();

                }
            }
            catch (Exception ex)
            { _logger.Warn("В xml параметрах не найден элемент " + name); }

            return typeString;
        }

        public static Entity GetOrCreateEntityByDisplayValue(UserConnection userConnection, string sourceSchemaName, string displayValue)
        {
            _logger.Info("Получаем отображаемое значение");
            var entitySchema = userConnection.EntitySchemaManager.GetInstanceByName(sourceSchemaName);
            string searchColumn = entitySchema.GetPrimaryDisplayColumnName();

            _logger.Info("Получаем из справочника запись с отображаемым значением");
            Entity lookupValue = GetLookupValue(userConnection, displayValue, sourceSchemaName, searchColumn);

            if (lookupValue == null)
            {
                lookupValue = CreateLookupValue(userConnection, displayValue, sourceSchemaName, searchColumn);

            }


            return lookupValue;
        }

        public static Entity GetLookupValue(UserConnection userConnection, string adValue, string schemaName, string searchColumn)
        {
            _logger.Info("Получаем из справочника " + schemaName + " значение (" + searchColumn + " = " + adValue + ")");
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, schemaName);
            esq.AddAllSchemaColumns();
            esq.UseAdminRights = false;
            try
            {
                esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, searchColumn, adValue));
            }
            catch (Exception ex)
            {
                _logger.Error("Ошибка при добавлении фильтра: " + ex.ToString());
            }

            Entity value;
            try
            {
                value = esq.GetEntityCollection(userConnection).FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.Error("Ошибка при получении значения справочника");
                throw;
            }

            return value;
        }

        public static Entity CreateLookupValue(UserConnection userConnection, string adValue, string schemaName, string searchColumn)
        {
            _logger.Info("Создание записи в справочник по значению атрибута AD");
            var entitySchema = userConnection.EntitySchemaManager.GetInstanceByName(schemaName);
            var entity = entitySchema.CreateEntity(userConnection);

            _logger.Info("Сущность создана успешно");
            entity.SetDefColumnValues();
            entity.UseAdminRights = false;
            entity.SetColumnValue(searchColumn, adValue);

            _logger.Info("Сохраняем запись");
            entity.Save(false);
            _logger.Info("Успешно сохранено");

            return entity;

        }
    }

    /// <summary>
    ///  Добавляет значение в поле объекта
    /// </summary>
    [AdAttributeHandlerAttribute("CopyToField")]
    public class CopyToFieldClass : IAdAttributeHandler
    {
        protected readonly ILog _logger = LogManager.GetLogger("AdLog");
        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            _logger.Info(handler.GetColumnDisplayValue(handler.Schema.Columns.GetByName("NavHandler")));
            // проверяем, что из AD мы получили значение нужного атрибута
            var existsInAD = element.Attributes.ContainsKey(handler.GetTypedColumnValue<string>("NavAdAttributeName"));
            var hasValueInAD = false;
            var adValue = string.Empty;
            object setValue = null;
            if (existsInAD)
            {
            	adValue = element.Attributes[handler.GetTypedColumnValue<string>("NavAdAttributeName")].Value;
            	
            	_logger.Info("Приводим значение атрибута к типу, записываемому в БД");
                // определяем тип к которому нужно привести и приводим
                string typeName = AdAttributesHelper.GetXmlElement("type", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
                if (typeName.IsEmpty())
                {
                    _logger.Warn("Не удалось прочитать значение xml-элемента <type>");
                }
                switch (typeName.Trim().ToLower())
                {
                    case "bool":
                        string revertParam = AdAttributesHelper.GetXmlElement("revert", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
                        bool revert = revertParam == "true";
                        setValue = getBoolValue(adValue);
                        if (revert) setValue = !(bool)setValue;
                        break;
                    case "date":
                        setValue = getDateValue(adValue);
                        break;
                    default:
                        setValue = adValue;
                        break;
                }
                hasValueInAD = (setValue != null);
            }
            if (hasValueInAD)
            {
            	// Если атрибут существует в AD и у него есть значение
                _logger.Info("Значение атрибута LDAP [" + handler.GetTypedColumnValue<string>("NavAdAttributeName") + "] = \"" + adValue + "\"");
            }
            else 
            {
            	// Если атрибут отсутствует в AD или пустует, удаляем соотвутствующие данные из системы
            	_logger.Info("Значение атрибута в LDAP отсутствует или пустое. Очищаем поле " + handler.GetTypedColumnValue<string>("NavAdAttributeName"));
            }
            relatedEntity.SetColumnValue(handler.GetTypedColumnValue<string>("NavEntityFieldName"), setValue);
            _logger.Info("Сохраняем запись");
            relatedEntity.Save(false);
            return true;
        }

        protected bool getBoolValue(string stringValue)
        {
            bool setValue = false;

            bool result;
            if (Boolean.TryParse(stringValue, out result))
            {
                setValue = result;
            }
            // пытаемся расшифровать значение, эквивалентно "да\нет"
            else
            {
                switch (stringValue.Trim().ToLower())
                {
                    case "да":
                    case "yes":
                    case "+":
                        setValue = true;
                        break;
                    case "нет":
                    case "no":
                    case "-":
                        setValue = false;
                        break;
                    default:
                        throw new Exception("Нельзя привести к логическому типу " + stringValue);
                }
            }
            return setValue;
        }

        protected object getDateValue(string adValue)
        {
            object setValue = null;

            DateTime result;
            if (DateTime.TryParse(adValue, out result))
            {
                setValue = result;
            }
            else
            {
                if (adValue.ToLower().Contains("сегодня"))
                    setValue = DateTime.Today;
            }
            return setValue;
        }
    }


    /// <summary>
    ///  Добавляет значение в справочное поле объекта 
    /// </summary>
    [AdAttributeHandlerAttribute("CopyToFieldLookup")]
    public class CopyToFieldLookupClass : IAdAttributeHandler
    {

        protected readonly ILog _logger = LogManager.GetLogger("AdLog");

        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            string adValue = AdAttributesHelper.GetAdValue(element, (NavAdAttributesHandlers)handler);
            if (adValue != null)
            {
                // получаем данные о справочнике, на который смотрит колонка в основном объекте
                var NavEntityFieldName = handler.GetTypedColumnValue<string>("NavEntityFieldName");
                if (NavEntityFieldName.IsEmpty()) throw new Exception("Не заполнено поле NavEntityFieldName");

                var lookupColumn = relatedEntity.Schema.Columns.GetByName(NavEntityFieldName);
                var entitySchema = lookupColumn.ReferenceSchema;
                string schemaName = entitySchema.Name;

                var searchColumn = AdAttributesHelper.GetXmlElement("searchcolumn", handler.GetTypedColumnValue<string>("NavHandlerParameterXML"));
                if (searchColumn.IsEmpty())
                    searchColumn = entitySchema.GetPrimaryDisplayColumnName();

                Entity lookupValue = AdAttributesHelper.GetLookupValue(userConnection, adValue, schemaName, searchColumn);
                if (lookupValue == null)
                {
                    lookupValue = AdAttributesHelper.CreateLookupValue(userConnection, adValue, schemaName, searchColumn);
                }
                
                // Если атрибут существует в AD и у него есть значение
                _logger.Info("Записываем в поле " + relatedEntity.Schema.Caption + "." + handler.GetTypedColumnValue<string>("NavEntityFieldName") + " = \"" + lookupValue.PrimaryDisplayColumnValue + "\"(" + lookupValue.PrimaryColumnValue + ")");
                relatedEntity.SetColumnValue(handler.GetTypedColumnValue<string>("NavEntityFieldName") + "Id", lookupValue.PrimaryColumnValue);
            }
            else 
            {
            	// Если атрибут отсутствует в AD, удаляем соотвутствующие данные из системы
            	_logger.Info("Очищаем поле (отсутствует в AD) " + relatedEntity.Schema.Caption + "." + handler.GetTypedColumnValue<string>("NavEntityFieldName"));
                relatedEntity.SetColumnValue(handler.GetTypedColumnValue<string>("NavEntityFieldName") + "Id", null);
            }
            _logger.Info("Сохраняем запись");
            relatedEntity.Save(false);
            return true;
        }
    }

    /// <summary>
    ///  Добавляет изображение в поле объекта 
    /// </summary>
    [AdAttributeHandlerAttribute("CopyToFieldImage")]
    public class CopyToFieldImageClass : IAdAttributeHandler
    {

        protected readonly ILog _logger = LogManager.GetLogger("AdLog");

        public bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler)
        {
            _logger.Info("Получаем из элемента AD поток байтов из атрибута, указанном в записи обработчика в БД " + handler.GetTypedColumnValue<string>("NavAdAttributeName"));
            byte[] adValue = null;
            // проверяем, что из AD мы получили значение нужного атрибута
            if (element.Attributes.ContainsKey(handler.GetTypedColumnValue<string>("NavAdAttributeName")))
            {
                adValue = element.Attributes[handler.GetTypedColumnValue<string>("NavAdAttributeName")].BinaryItems[0];
            }
            else
            {
                _logger.Warn("В элементе AD не найден атрибут " + handler.GetTypedColumnValue<string>("NavAdAttributeName"));
            }

            _logger.Info("Очищаем поле " + relatedEntity.Schema.Caption + "." + handler.GetTypedColumnValue<string>("NavEntityFieldName") + " для удаления старого изображения");

            relatedEntity.SetColumnValue(handler.GetTypedColumnValue<string>("NavEntityFieldName") + "Id", null);

            _logger.Info("Сохраняем запись");
            relatedEntity.Save(false);

            if (adValue != null)
            {
                _logger.Info("Записываем в поле " + relatedEntity.Schema.Caption + "." + handler.GetTypedColumnValue<string>("NavEntityFieldName") + " файл с изображением");

                var image = new SysImage(userConnection);
                image.SetDefColumnValues();
                image.Name = "Photo.bmp";
                image.MimeType = "image/bmp";
                image.SetColumnValue("Data", adValue);
                image.Save(false);

                relatedEntity.SetColumnValue(handler.GetTypedColumnValue<string>("NavEntityFieldName") + "Id", image.PrimaryColumnValue);

                _logger.Info("Сохраняем запись");
                relatedEntity.Save(false);
            }


            return true;
        }
    }

}
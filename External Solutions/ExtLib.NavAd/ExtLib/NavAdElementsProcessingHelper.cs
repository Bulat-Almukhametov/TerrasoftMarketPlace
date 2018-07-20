namespace Terrasoft.Configuration
{
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using System;
    using System.Data;
    using System.Linq;
    using AdIntegration.AD;
    using global::Common.Logging;
    using System.Collections.Generic;
    using Common;
    [AttributeUsage(AttributeTargets.Class)]
    public class AdAttributeHandlerAttribute : System.Attribute
    {

        #region Constructors: Public

        public AdAttributeHandlerAttribute(string expressionName)
        {
            this._ExpressionName = expressionName;
        }

        #endregion

        #region Properties: Public

        private string _ExpressionName;
        public string ExpressionName
        {
            get { return _ExpressionName; }
        }

        #endregion

    }

    public interface IAdAttributeHandler
    {
        bool Evaluate(UserConnection userConnection, AdElement element, Entity relatedEntity, Entity handler);
    }

    /// <summary>
    /// Базовый класс для обработки элемента LDAP
    /// </summary>
    public abstract class NavAdElementsProcessingHelper
    {
        #region Fields
        protected static readonly ILog _logger = LogManager.GetLogger("AdLog");

        /// <summary>
        /// Название схемы сущности, которая хранит названия обработчиков
        /// </summary>
        protected abstract string _HandlersSchemaName
        {
            get;
        }


        private static Dictionary<string, Type> _HandlersContainer;

        #endregion

        static NavAdElementsProcessingHelper()
        {
            try
            {
                var ctype = typeof(Terrasoft.Configuration.ExpressionConverterElement);
                if (ctype == null) throw new Exception("Не удалось получить тип Terrasoft.Configuration.ExpressionConverterElement");

                var assembly = ctype.Assembly;
                var types =
                    from type in assembly.GetTypes()
                    let attributes = type.GetCustomAttributes(typeof(AdAttributeHandlerAttribute), true)
                    where attributes != null && attributes.Length > 0
                    select type;

                _HandlersContainer = new Dictionary<string, Type>();

                foreach (var type in types)
                {
                    var attributes = type.GetCustomAttributes(typeof(AdAttributeHandlerAttribute), true);
                    var interfaces = type.GetInterfaces();
                    if (attributes.Count() > 0 && interfaces != null && interfaces.Count() > 0)
                    {    
                        if (!_HandlersContainer.ContainsKey(((AdAttributeHandlerAttribute)attributes[0]).ExpressionName)  // класс реализует атрибут
                            && interfaces.Contains(typeof(IAdAttributeHandler))) // класс реализует интерфейс
                        {
                            _HandlersContainer.Add(((AdAttributeHandlerAttribute)attributes[0]).ExpressionName,
                                type);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.Error("Error on static constructor NavAdElementsProcessingHelper: " + ex.ToString());
                throw;
            }
        }

        /// <summary>
        /// Получает из БД записи обработчиков
        /// </summary>
        /// <param name="userConnection"></param>
        /// <returns></returns>
        protected Entity[] GetHandlersEntities(UserConnection userConnection)
        {
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, _HandlersSchemaName);
            esq.UseAdminRights = false;
            var position = esq.AddColumn("NavPosition");

            // сортируем обработчики по порядковому номеру
            position.OrderDirection = OrderDirection.Ascending;
            position.OrderPosition = 1;
            esq.AddAllSchemaColumns();
            esq.AddColumn("NavHandler.Code");

            // фильтруем только активные
            esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavIsActive", true));

            return esq.GetEntityCollection(userConnection).ToArray();
        }

        /// <summary>
        /// Получает из БД сущность
        /// </summary>
        /// <param name="userConnection"></param>
        /// <param name="adElement"></param>
        /// <returns></returns>  
        protected abstract Entity GetRecord(UserConnection userConnection, AdElement adElement);

        /// <summary>
        /// Синхронизирует полученный элемент из AD с сущностями bpm'online
        /// </summary>
        /// <param name="userConnection"></param>
        /// <param name="adElement"></param>
        public void ProceedHandlers(UserConnection userConnection, AdElement adElement)
        {
            _logger.Info("Получаем запись сущности, синхронизируемого с элементом AD");
            var relatedEntity = GetRecord(userConnection, adElement);

            _logger.Info("Получаем данные всех обработчиков из БД");
            var handlersEntities = GetHandlersEntities(userConnection);

            _logger.Info("Обрабатываем каждый из обработчиков");
            foreach (var handlerEntity in handlersEntities)
            {
                _logger.Info("Получаем метод обработчика по названию");
                IAdAttributeHandler handlerMethod = getHandlerMethod(handlerEntity.GetTypedColumnValue<string>("NavHandler_Code"));  // GetTypedColumnValue<string>("NavHandlerName"));
                if (handlerMethod != null)
                {
                    bool proceed = true;
                    try
                    {
                        proceed = handlerMethod.Evaluate(userConnection, adElement, relatedEntity, handlerEntity);
                    }
                    catch (Exception ex)
                    {
                        _logger.Error("Ошибка при попытке выполнить " + handlerEntity.GetTypedColumnValue<string>("Name") + ". Метод " + handlerEntity.GetColumnDisplayValue(handlerEntity.Schema.Columns.GetByName("NavHandler")) + " завершился с ошибкой."
                            + Environment.NewLine + ex.ToString());
                    }

                    if (!proceed)
                        break;
                }
                else
                    _logger.Info("Не удалось найти метод " + handlerEntity.GetColumnDisplayValue(handlerEntity.Schema.Columns.GetByName("NavHandler")));
            }

        }


        /// <summary>
        /// Получает метод обработчика по названию
        /// </summary>
        /// <param name="navHandlerName"></param>
        /// <returns></returns>
        private IAdAttributeHandler getHandlerMethod(string navHandlerName)
        { 
            var expressionClass = _HandlersContainer[navHandlerName];
            if (expressionClass == null)
            {
                throw new Exception("Не удалось найти обработчик с данным именем");
            }

            var expression = expressionClass.GetConstructor(Type.EmptyTypes).Invoke(new Object[] { }) as IAdAttributeHandler;
            if (expression == null)
            {
                throw new Exception("");
            }

            return expression;



        }
    }
}
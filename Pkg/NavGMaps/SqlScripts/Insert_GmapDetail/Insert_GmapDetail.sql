DECLARE 
    @ClientUnitSchemaName NVARCHAR(100) = 'NavGMapDetail',
    @EntitySchemaName NVARCHAR(100) = 'NavGMarker',
    -- Название детали.
    @DetailCaption NVARCHAR(100) = 'Карта Гугл';
    
DELETE SysDetail WHERE Caption = @DetailCaption;

INSERT INTO SysDetail(Caption, DetailSchemaUId, EntitySchemaUId)
VALUES(@DetailCaption,
     (SELECT TOP 1 UId
      from SysSchema
      WHERE Name = @ClientUnitSchemaName),
      (SELECT TOP 1 UId
      from SysSchema
      WHERE Name = @EntitySchemaName))
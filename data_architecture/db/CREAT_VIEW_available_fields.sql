-- DROP VIEW marketplace.available_fields
CREATE VIEW marketplace.available_fields AS
SELECT field.name,
    field.label,
    field.type
   FROM marketplace.field
  WHERE field.is_tradable = true;
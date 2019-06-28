-- FUNCTION: marketplace.search_dataset(integer, text, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset(integer, text, text, text, text, text);

CREATE OR REPLACE FUNCTION marketplace.search_dataset(
	purchased_by integer,
	topics text,
	terms text,
	cities text,
	region text,
	cn text)
    RETURNS SETOF marketplace.data_source_detail 
    LANGUAGE 'sql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$

	select * from marketplace.data_source_detail 
	where ( terms = '' OR terms % ANY (search_terms) 
			OR terms %> ( name || ' ' || description ) OR terms %> (state_province || ' ' || country) 
			OR terms % ANY (city) )
	AND ( topics = '' OR topics % ANY (topic) )
	AND ( cities = '' OR cities % ANY (city) ) 
	AND ( region = '' OR region <% state_province ) 
	AND ( cn = '' OR cn <% country )
	AND (purchased_by = 0 
				or id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))

$BODY$;

ALTER FUNCTION marketplace.search_dataset(integer, text, text, text, text, text)
    OWNER TO reblocadmin;



-- FUNCTION: marketplace.search_dataset_schema(integer, text, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset_schema(integer, text, text, text, text, text);

CREATE OR REPLACE FUNCTION marketplace.search_dataset_schema(
	purchased_by integer,
	fields text,
	topics text,
	cities text,
	region text,
	cn text)
    RETURNS SETOF marketplace.field_in_schema 
    LANGUAGE 'sql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$

	select * from marketplace.field_in_schema
		where fields %> field_label 
			and (topics = '' or topics % any (topic))
			and (cities = '' or cities % any (city))
			and (region = '' or region %> (state_province))
			and (cn = '' or cn %> (country))
			AND (purchased_by = 0 
				or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
											  
$BODY$;

ALTER FUNCTION marketplace.search_dataset_schema(integer, text, text, text, text, text)
    OWNER TO reblocadmin;



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

	select *
	from marketplace.data_source_detail		  
	where ( terms = '' OR 
		    ((select to_tsvector(name) || ' ' || 
			         to_tsvector(coalesce(description,' '))  || ' ' || 
					 to_tsvector(state_province) || ' ' || 
			     	 array_to_tsvector(topic) || ' ' || 
					 array_to_tsvector(search_terms) || ' ' ||
					 array_to_tsvector(city) ) @@ to_tsquery(terms)) 
	OR terms %> (state_province || ' ' || country) 
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
	ctn text)
    RETURNS SETOF marketplace.field_in_schema 
    LANGUAGE 'sql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$

	select dataset_id,
		   dataset_name,
		   country,
		   state_province,
		   city,
		   topic,
		   dataset_owner_id,
		   field_name,
		   field_type,
		   field_label,
		   field_description
	from marketplace.field_in_schema, 
		 to_tsvector(coalesce(field_label,' ')) t1, 
		 to_tsvector(coalesce(field_description,' ')) t2
		where (t1 @@ to_tsquery(fields) OR t2 @@ to_tsquery(fields)) 
			and (topics = '' or topics % any (topic))
			and (cities = '' or cities % any (city))
			and (region = '' or region %> (state_province))
			and (ctn = '' or ctn %> (country))
			AND (purchased_by = 0 
				or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
											  
$BODY$;

ALTER FUNCTION marketplace.search_dataset_schema(integer, text, text, text, text, text)
    OWNER TO reblocadmin;



create function marketplace.search_dataset(topics text, terms text, cities text, region text)
returns setof marketplace.data_source_detail as $$

select * from marketplace.data_source_detail 
where ( terms = '' OR terms % ANY (search_terms) )
AND ( topics = '' OR topics % ANY (topic) )
AND ( ( cities = '' OR cities % ANY (city) ) and (region = ''  or region <% ( state_province || ' ' || country ) ))

$$ language sql stable;


create function marketplace.search_dataset_schema (fields text, topics text, cities text, region text)
returns setof marketplace.field_in_schema as $$

	select * from marketplace.field_in_schema
		where fields %> field_label 
			and (topics = '' or topics % any (topic))
			and (cities = '' or cities % any (city))
			and (region = '' or region %> ( state_province || ' ' || country ))
											  
$$ language sql stable;


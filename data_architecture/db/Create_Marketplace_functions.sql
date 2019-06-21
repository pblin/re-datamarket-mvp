create function marketplace.search_dataset(topics text, terms text, cities text, region text, ctn text)
returns setof marketplace.data_source_detail as $$

	select * from marketplace.data_source_detail 
	where ( terms = '' OR terms % ANY (search_terms) 
			OR terms %> ( name || ' ' || description ) OR terms %> (state_province || ' ' || country) 
			OR terms % ANY (city) )
	AND ( topics = '' OR topics % ANY (topic) )
	AND ( cities = '' OR cities % ANY (city) ) 
	AND ( region = '' OR region <% state_province ) 
	AND ( ctn = '' OR ctn <% country )


$$ language sql stable;

create function marketplace.search_dataset_schema(purchased_by integer, fields text, topics text, cities text, region text, ctn text)
returns setof marketplace.field_in_schema as $$

	select * from marketplace.field_in_schema
		where fields %> field_label 
			and (topics = '' or topics % any (topic))
			and (cities = '' or cities % any (city))
			and (region = '' or region %> (state_province))
			and (ctn = '' or ctn %> (country))
			and (purchased_by = 0 
				or purchased_by in (select buyer_id from marketplace.order_book))
											  
$$ language sql stable;


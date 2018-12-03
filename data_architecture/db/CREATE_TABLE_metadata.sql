
-- DROP TABLE marketplace.context 
CREATE TABLE marketplace.context 
(
   id serial NOT NULL,
   url character varying (80) NOT NULL,
   PRIMARY KEY (id)
);


-- DROP TABLE marketplace.object
CREATE TABLE marketplace.object
(
    name character varying(30)  NOT NULL,
    label character varying(40) NOT NULL,
    description character varying(254) NOT NULL,
    context_id integer REFERENCES marketplace.context(id),
    PRIMARY KEY (name)
);

-- DROP TABLE marketplace.field
CREATE TABLE marketplace.field
(
    name character varying(100)  NOT NULL,
    type character varying(30)  NOT NULL,
    label character varying(200) NOT NULL,
    description character varying(2048),
    is_part_of character varying(30) REFERENCES marketplace.object(name),
    context_id integer REFERENCES marketplace.context(id),
    PRIMARY KEY (name)
);


-- DROP TABLE marketplace.data_source_detail
CREATE TABLE marketplace.data_source_detail
(
	id serial NOT NULL,
	owner_org_id integer NOT NULL REFERENCES marketplace.organization (id),
	delivery_methods character varying(10)[],
	enc_data_key character varying (256), 
	access_url character varying (256),
	api_key character varying (256), 
	parameters character varying(40)[],
	PRIMARY KEY (id)
);

-- DROP TABLE marketplace.source_of_field
CREATE TABLE marketplace.source_of_field
(
	source_id integer NOT NULL REFERENCES marketplace.data_source_detail (id),
	field__name character varying(30)  NOT NULL REFERENCES marketplace.field (name),
	field_val_hash character varying (384) NOT NULL
);

-- DROP TABLE marketplace.order_book
CREATE TABLE marketplace.order_book
(
	order_id serial NOT NULL,
	buyer_seller_id integer NOT NULL REFERENCES marketplace.customer(id),
	offer decimal, 
	bid decimal, 
	offer_timestamp timestamp,
	PRIMARY KEY (order_id)
);



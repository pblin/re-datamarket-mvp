-- Table: marketplace.data_source_detail

-- DROP TABLE marketplace.data_source_detail;

CREATE TABLE marketplace.data_source_detail
(
    enc_data_key character varying(256) COLLATE pg_catalog."default",
    access_url character varying(256) COLLATE pg_catalog."default",
    api_key character varying(256) COLLATE pg_catalog."default",
    parameters character varying(40)[] COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    dataset_owner_id integer NOT NULL,
    delivery_method text COLLATE pg_catalog."default",
    id text COLLATE pg_catalog."default" NOT NULL,
    search_terms text[] COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default",
    state_province text COLLATE pg_catalog."default",
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone,
    name text COLLATE pg_catalog."default",
    num_of_records integer NOT NULL,
    price_low numeric,
    price_high numeric,
    json_schema text COLLATE pg_catalog."default",
    CONSTRAINT data_source_detail_pkey PRIMARY KEY (id),
    CONSTRAINT data_source_owner_fkey FOREIGN KEY (dataset_owner_id)
        REFERENCES marketplace.organization (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.data_source_detail
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.data_source_detail TO app;

GRANT ALL ON TABLE marketplace.data_source_detail TO reblocadmin;

COMMENT ON COLUMN marketplace.data_source_detail.id
    IS 'uuid';

-- Index: fki_data_source_owner_fkey

-- DROP INDEX marketplace.fki_data_source_owner_fkey;

CREATE INDEX fki_data_source_owner_fkey
    ON marketplace.data_source_detail USING btree
    (dataset_owner_id)
    TABLESPACE pg_default;
-- Table: marketplace.source_of_field

-- DROP TABLE marketplace.source_of_field;

CREATE TABLE marketplace.source_of_field
(
    field__name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    field_val_hash character varying(384) COLLATE pg_catalog."default" NOT NULL,
    source_id text COLLATE pg_catalog."default" NOT NULL,
    field_type text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT source_of_field_pkey PRIMARY KEY (source_id, field__name),
    CONSTRAINT source_id_fkey FOREIGN KEY (source_id)
        REFERENCES marketplace.data_source_detail (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.source_of_field
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.source_of_field TO app;

GRANT ALL ON TABLE marketplace.source_of_field TO reblocadmin;

-- Index: fki_source_id_fkey

-- DROP INDEX marketplace.fki_source_id_fkey;

CREATE INDEX fki_source_id_fkey
    ON marketplace.source_of_field USING btree
    (source_id COLLATE pg_catalog."default")
    TABLESPACE pg_default;
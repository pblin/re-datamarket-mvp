-- Table: marketplace.customer

-- DROP TABLE marketplace.customer;

CREATE TABLE marketplace.customer
(
    id integer NOT NULL DEFAULT nextval('marketplace.customer_id_seq'::regclass),
    primary_email character varying(80) COLLATE pg_catalog."default" NOT NULL,
    secondary_email character varying(80) COLLATE pg_catalog."default",
    org_id integer,
    wallet_key_1 character varying(22) COLLATE pg_catalog."default",
    wallet_key_2 character varying(22) COLLATE pg_catalog."default",
    roles "char"[],
    last_name character varying(40) COLLATE pg_catalog."default",
    first_name character varying(40) COLLATE pg_catalog."default",
    CONSTRAINT customer_pkey PRIMARY KEY (id, primary_email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.customer
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.customer TO app;

GRANT ALL ON TABLE marketplace.customer TO reblocadmin;
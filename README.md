BASE DE DATOS POSTGRESSQL

QUERY DE CREACION TABLAS USERS

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    lastname text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    department integer NOT NULL DEFAULT 0,
    "createdAt" timestamp with time zone,
    "updatedAt" date,
    password text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

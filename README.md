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

-------------------------------------------------------------------------------  
  
CLIENT DEPENDENCIES:  
    "@testing-library/jest-dom": "^5.17.0",  
    "@testing-library/react": "^13.4.0",  
    "@testing-library/user-event": "^13.5.0",  
    "axios": "^1.7.7",  
    "clsx": "^2.1.1",  
    "crypto-js": "^4.2.0",  
    "js-cookie": "^3.0.5",  
    "lucide-react": "^0.460.0",  
    "motion": "^11.11.17",  
    "react": "^18.3.1",  
    "react-dom": "^18.3.1",  
    "react-hook-form": "^7.53.2",   
    "react-npm-encrypt-decrypt": "^1.0.65",  
    "react-router-dom": "^6.28.0",  
    "react-scripts": "^5.0.1",  
    "sonner": "^1.7.0",  
    "tailwind-merge": "^2.5.4",  
    "typescript": "^5.6.3",  
    "web-vitals": "^2.1.4",  
    "zustand": "^5.0.1"  
    "@types/crypto-js": "^4.2.2",  
    "@types/js-cookie": "^3.0.6",  
    "tailwindcss": "^3.4.15"  
      
SERVER DEPENDENCIES:  
    "bcryptjs": "^2.4.3",  
    "cookie-parser": "^1.4.7",  
    "cors": "^2.8.5",  
    "cryptr": "^6.3.0",  
    "dotenv": "^16.4.5",  
    "express": "^4.21.1",  
    "express-validator": "^7.2.0",  
    "jsonwebtoken": "^9.0.2",  
    "nodemailer": "^6.9.16",  
    "nodemon": "^3.1.7",  
    "pg": "^8.13.1",  
    "pg-hstore": "^2.3.4",  
    "sequelize": "^6.37.5",  
    "typescript": "^5.6.3"  
    "@types/bcryptjs": "^2.4.6",  
    "@types/cookie-parser": "^1.4.7",  
    "@types/cors": "^2.8.17",  
    "@types/express": "^5.0.0",  
    "@types/jsonwebtoken": "^9.0.7",   
    "@types/nodemailer": "^6.4.16"  

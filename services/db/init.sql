CREATE TABLE "maquina" (
  "id_maquina" serial UNIQUE PRIMARY KEY NOT NULL,
  "nombre" VARCHAR(255) NOT NULL,
  "descripción" VARCHAR(255),
  "id_estado" integer
);

CREATE TABLE "estado_maquina" (
  "id_estado" serial UNIQUE PRIMARY KEY NOT NULL,
  "estado" VARCHAR(255) NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "incidentes" (
  "id_incidente" serial UNIQUE PRIMARY KEY NOT NULL,
  "id_maquina" integer NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha" timestamp NOT NULL,
  "id_usuario" integer NOT NULL
);

CREATE TABLE "reparacion" (
  "id_reparacion" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha_inicio" timestamp NOT NULL,
  "fecha_termino" timestamp NOT NULL,
  "id_maquina" integer NOT NULL,
  "id_componentes" integer NOT NULL,
  "id_usuario" integer NOT NULL
);

CREATE TABLE "reparacion_componente" (
  "id_reparacion_componente" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_componente" integer NOT NULL,
  "id_mantencion" integer NOT NULL
);

CREATE TABLE "componente" (
  "id_componente" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "nombre" VARCHAR(255) NOT NULL,
  "componente_padre" integer NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "componentes_en_maquina" (
  "id_componente_en_maquina" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_maquina" integer NOT NULL,
  "id_estado" integer NOT NULL,
  "fecha_actualizacion" timestamp NOT NULL
);

CREATE TABLE "estado_componente" (
  "id_estado" serial UNIQUE PRIMARY KEY NOT NULL,
  "estado" VARCHAR(255) NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "mantencion" (
  "id_mantencion" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_maquina" integer NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha_inicio" timestamp NOT NULL,
  "fecha_termino" timestamp NOT NULL
);

CREATE TABLE "mantencion_componente" (
  "id_reparacion_componente" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_componente" integer NOT NULL,
  "id_mantencion" integer NOT NULL
);

CREATE TABLE "mantencion_preventiva" (
  "id_mantencion_preventiva" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "id_componente" integer NOT NULL,
  "id_estado_componente" integer NOT NULL
);

CREATE TABLE "usuario" (
  "id_usuario" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "nombre" VARCHAR(255) NOT NULL,
  "cargo" integer NOT NULL
);

CREATE TABLE "cargo" (
  "id_cargo" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "nombre" VARCHAR(255) NOT NULL
);

ALTER TABLE "maquina" ADD FOREIGN KEY ("id_estado") REFERENCES "estado_maquina" ("id_estado");

ALTER TABLE "incidentes" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "incidentes" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "reparacion" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "reparacion" ADD FOREIGN KEY ("id_componentes") REFERENCES "reparacion_componente" ("id_reparacion_componente");

ALTER TABLE "reparacion" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "reparacion_componente" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "reparacion_componente" ADD FOREIGN KEY ("id_mantencion") REFERENCES "reparacion" ("id_reparacion");

ALTER TABLE "componente" ADD FOREIGN KEY ("componente_padre") REFERENCES "componente" ("id_componente");

ALTER TABLE "componentes_en_maquina" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "componentes_en_maquina" ADD FOREIGN KEY ("id_estado") REFERENCES "estado_componente" ("id_estado");

ALTER TABLE "mantencion" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "mantencion_componente" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "mantencion_componente" ADD FOREIGN KEY ("id_mantencion") REFERENCES "mantencion" ("id_mantencion");

ALTER TABLE "mantencion_preventiva" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "mantencion_preventiva" ADD FOREIGN KEY ("id_estado_componente") REFERENCES "estado_componente" ("id_estado");

ALTER TABLE "usuario" ADD FOREIGN KEY ("cargo") REFERENCES "cargo" ("id_cargo");

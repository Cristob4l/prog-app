CREATE TABLE "public.maquina" (
	"id_maquina" serial NOT NULL UNIQUE,
	"nombre" VARCHAR(255) NOT NULL,
	"descripción" VARCHAR(255),
	"id_estado" integer,
	CONSTRAINT "maquina_pk" PRIMARY KEY ("id_maquina")
)

CREATE TABLE "public.estado_maquina" (
	"id_estado" serial(255) NOT NULL UNIQUE,
	"estado" VARCHAR(255) NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	CONSTRAINT "estado_maquina_pk" PRIMARY KEY ("id_estado")
)

CREATE TABLE "public.incidentes" (
	"id_incidente" serial NOT NULL,
	"id_maquina" integer NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	"fecha" DATETIME NOT NULL,
	CONSTRAINT "incidentes_pk" PRIMARY KEY ("id_incidente")
)

CREATE TABLE "public.reparacion" (
	"id_reparacion" serial NOT NULL UNIQUE,
	"descripcion" VARCHAR(255) NOT NULL,
	"fecha_inicio" DATETIME NOT NULL,
	"fecha_termino" DATETIME NOT NULL,
	"id_maquina" integer NOT NULL,
	"id_componentes" integer NOT NULL,
	CONSTRAINT "reparacion_pk" PRIMARY KEY ("id_reparacion")
)

CREATE TABLE "public.reparacion_componente" (
	"id_reparacion_componente" serial NOT NULL,
	"id_componente" integer NOT NULL,
	"id_mantencion" integer NOT NULL,
	CONSTRAINT "reparacion_componente_pk" PRIMARY KEY ("id_reparacion_componente")
) 
CREATE TABLE "public.componente" (
	"id_componente" serial NOT NULL,
	"nombre" VARCHAR(255) NOT NULL,
	"componente_padre" integer NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	CONSTRAINT "componente_pk" PRIMARY KEY ("id_componente")
)

CREATE TABLE "public.componentes_en_maquina" (
	"id_componente_en_maquina" serial NOT NULL,
	"id_maquina" integer NOT NULL,
	"id_estado" integer NOT NULL,
	CONSTRAINT "componentes_en_maquina_pk" PRIMARY KEY ("id_componente_en_maquina")
)

CREATE TABLE "public.estado_componente" (
	"id_estado" serial(255) NOT NULL UNIQUE,
	"estado" VARCHAR(255) NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	CONSTRAINT "estado_componente_pk" PRIMARY KEY ("id_estado")
)

CREATE TABLE "public.mantencion" (
	"id_mantencion" serial NOT NULL,
	"id_maquina" BINARY NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	"fecha_inicio" DATETIME NOT NULL,
	"fecha_termino" DATETIME NOT NULL,
	CONSTRAINT "mantencion_pk" PRIMARY KEY ("id_mantencion")
)

CREATE TABLE "public.mantencion_componente" (
	"id_reparacion_componente" serial NOT NULL,
	"id_componente" integer NOT NULL,
	"id_mantencion" integer NOT NULL,
	CONSTRAINT "mantencion_componente_pk" PRIMARY KEY ("id_reparacion_componente")
)

CREATE TABLE "public.mantencion_preventiva" (
	"id_mantencion_preventiva" serial NOT NULL,
	"descripcion" VARCHAR(255) NOT NULL,
	"id_componente" integer NOT NULL,
	"id_estado_componente" integer NOT NULL,
	CONSTRAINT "mantencion_preventiva_pk" PRIMARY KEY ("id_mantencion_preventiva")
)

ALTER TABLE "maquina" ADD CONSTRAINT "maquina_fk0" FOREIGN KEY ("id_estado") REFERENCES "estado_maquina"("id_estado");


ALTER TABLE "incidentes" ADD CONSTRAINT "incidentes_fk0" FOREIGN KEY ("id_maquina") REFERENCES "maquina"("id_maquina");

ALTER TABLE "reparacion" ADD CONSTRAINT "reparacion_fk0" FOREIGN KEY ("id_maquina") REFERENCES "maquina"("id_maquina");
ALTER TABLE "reparacion" ADD CONSTRAINT "reparacion_fk1" FOREIGN KEY ("id_componentes") REFERENCES "reparacion_componente"("id_reparacion_componente");

ALTER TABLE "reparacion_componente" ADD CONSTRAINT "reparacion_componente_fk0" FOREIGN KEY ("id_componente") REFERENCES "componente"("id_componente");
ALTER TABLE "reparacion_componente" ADD CONSTRAINT "reparacion_componente_fk1" FOREIGN KEY ("id_mantencion") REFERENCES "reparacion"("id_reparacion");

ALTER TABLE "componente" ADD CONSTRAINT "componente_fk0" FOREIGN KEY ("componente_padre") REFERENCES "componente"("id_componente");

ALTER TABLE "componentes_en_maquina" ADD CONSTRAINT "componentes_en_maquina_fk0" FOREIGN KEY ("id_maquina") REFERENCES "maquina"("id_maquina");
ALTER TABLE "componentes_en_maquina" ADD CONSTRAINT "componentes_en_maquina_fk1" FOREIGN KEY ("id_estado") REFERENCES "estado_componente"("id_estado");


ALTER TABLE "mantencion" ADD CONSTRAINT "mantencion_fk0" FOREIGN KEY ("id_maquina") REFERENCES "maquina"("id_maquina");

ALTER TABLE "mantencion_componente" ADD CONSTRAINT "mantencion_componente_fk0" FOREIGN KEY ("id_componente") REFERENCES "componente"("id_componente");
ALTER TABLE "mantencion_componente" ADD CONSTRAINT "mantencion_componente_fk1" FOREIGN KEY ("id_mantencion") REFERENCES "mantencion"("id_mantencion");

ALTER TABLE "mantencion_preventiva" ADD CONSTRAINT "mantencion_preventiva_fk0" FOREIGN KEY ("id_componente") REFERENCES "componente"("id_componente");
ALTER TABLE "mantencion_preventiva" ADD CONSTRAINT "mantencion_preventiva_fk1" FOREIGN KEY ("id_estado_componente") REFERENCES "estado_componente"("id_estado");













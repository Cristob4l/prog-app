CREATE TABLE "maquina" (
  "id_maquina" serial UNIQUE PRIMARY KEY ,
  "nombre" VARCHAR(255) NOT NULL,
  "descripción" VARCHAR(255),
  "id_estado" integer
);

CREATE TABLE "estado_maquina" (
  "id_estado" serial UNIQUE PRIMARY KEY,
  "estado" VARCHAR(255) NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "incidentes" (
  "id_incidente" serial UNIQUE PRIMARY KEY,
  "id_maquina" integer NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha" timestamp NOT NULL,
  "id_usuario" integer NOT NULL
);

CREATE TABLE "reparacion" (
  "id_reparacion" SERIAL UNIQUE PRIMARY KEY,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha_inicio" timestamp NOT NULL,
  "fecha_termino" timestamp NOT NULL,
  "id_maquina" integer NOT NULL,
  "id_usuario" integer NOT NULL
);

CREATE TABLE "reparacion_componente" (
  "id_reparacion_componente" SERIAL UNIQUE PRIMARY KEY,
  "id_componente" integer NOT NULL,
  "id_reparacion" integer NOT NULL
);

CREATE TABLE "componente" (
  "id_componente" SERIAL UNIQUE PRIMARY KEY,
  "nombre" VARCHAR(255) NOT NULL,
  "componente_padre" integer ,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "componentes_en_maquina" (
  "id_componente_en_maquina" SERIAL UNIQUE PRIMARY KEY,
  "id_componente" integer NOT NULL,
  "id_maquina" integer NOT NULL,
  "id_estado" integer NOT NULL,
  "fecha_actualizacion" timestamp NOT NULL
);

CREATE TABLE "estado_componente" (
  "id_estado" serial UNIQUE PRIMARY KEY,
  "estado" VARCHAR(255) NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL
);

CREATE TABLE "mantencion" (
  "id_mantencion" SERIAL UNIQUE PRIMARY KEY,
  "id_maquina" integer NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "fecha_inicio" timestamp NOT NULL,
  "fecha_termino" timestamp NOT NULL
);

CREATE TABLE "mantencion_componente" (
  "id_reparacion_componente" SERIAL UNIQUE PRIMARY KEY,
  "id_componente" integer NOT NULL,
  "id_mantencion" integer NOT NULL
);

CREATE TABLE "mantencion_preventiva" (
  "id_mantencion_preventiva" SERIAL UNIQUE PRIMARY KEY,
  "descripcion" VARCHAR(255) NOT NULL,
  "id_componente" integer NOT NULL,
  "id_estado_componente" integer NOT NULL
);

CREATE TABLE "usuario" (
  "id_usuario" SERIAL UNIQUE PRIMARY KEY,
  "nombre" VARCHAR(255) NOT NULL,
  "cargo" integer NOT NULL
);

CREATE TABLE "cargo" (
  "id_cargo" SERIAL UNIQUE PRIMARY KEY,
  "nombre" VARCHAR(255) NOT NULL
);

ALTER TABLE "maquina" ADD FOREIGN KEY ("id_estado") REFERENCES "estado_maquina" ("id_estado");

ALTER TABLE "incidentes" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "incidentes" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "reparacion" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "reparacion" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "reparacion_componente" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "reparacion_componente" ADD FOREIGN KEY ("id_reparacion") REFERENCES "reparacion" ("id_reparacion");

ALTER TABLE "componente" ADD FOREIGN KEY ("componente_padre") REFERENCES "componente" ("id_componente");

ALTER TABLE "componentes_en_maquina" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "componentes_en_maquina" ADD FOREIGN KEY ("id_estado") REFERENCES "estado_componente" ("id_estado");
ALTER TABLE "componentes_en_maquina" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "mantencion" ADD FOREIGN KEY ("id_maquina") REFERENCES "maquina" ("id_maquina");

ALTER TABLE "mantencion_componente" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "mantencion_componente" ADD FOREIGN KEY ("id_mantencion") REFERENCES "mantencion" ("id_mantencion");

ALTER TABLE "mantencion_preventiva" ADD FOREIGN KEY ("id_componente") REFERENCES "componente" ("id_componente");

ALTER TABLE "mantencion_preventiva" ADD FOREIGN KEY ("id_estado_componente") REFERENCES "estado_componente" ("id_estado");

ALTER TABLE "usuario" ADD FOREIGN KEY ("cargo") REFERENCES "cargo" ("id_cargo");


INSERT INTO "cargo" (nombre) VALUES('jefe');
INSERT INTO "cargo" (nombre) VALUES('mecanico');
INSERT INTO "cargo" (nombre) VALUES('chofer');

INSERT INTO "estado_componente" (estado,descripcion) VALUES('Perfecto','perfecto estado');
INSERT INTO "estado_componente" (estado,descripcion) VALUES('Dañado','estado dañado');

INSERT INTO "usuario" (nombre,cargo) VALUES('chofer 1',3);
INSERT INTO "usuario" (nombre,cargo) VALUES('mecanico',2);
INSERT INTO "usuario" (nombre,cargo) VALUES('jefe',1);

INSERT INTO "estado_maquina" (estado,descripcion) VALUES('Perfecto','perfecto estado');
INSERT INTO "estado_maquina" (estado,descripcion) VALUES('Dañado','estado dañado');

INSERT INTO "maquina" (nombre,descripción,id_estado) VALUES('Maquina 1','maquina 1',1);
INSERT INTO "maquina" (nombre,descripción,id_estado) VALUES('Maquina 2','maquina 2',1);
INSERT INTO "maquina" (nombre,descripción,id_estado) VALUES('Maquina 3','maquina 2',2);

INSERT INTO "componente" (nombre,descripcion) VALUES('componente 1','componente 1');
INSERT INTO "componente" (nombre,descripcion) VALUES('componente 2','componente 1');
INSERT INTO "componente" (nombre,descripcion) VALUES('componente 3','componente 1');

INSERT INTO "componente" (nombre,componente_padre,descripcion) VALUES('componente 1.1',1,'componente hijo de componente 1');
INSERT INTO "componente" (nombre,componente_padre,descripcion) VALUES('componente 2.1',2,'componente hijo de componente 2');
INSERT INTO "componente" (nombre,componente_padre,descripcion) VALUES('componente 3.1',3,'componente hijo de componente 3');

INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(1,1,1,'20081231');
INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(4,1,1,'20081231');

INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(2,2,1,'20081231');
INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(5,2,1,'20081231');

INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(3,3,1,'20081231');
INSERT INTO "componentes_en_maquina" (id_componente,id_maquina,id_estado,fecha_actualizacion) VALUES(6,3,2,'20081231');

INSERT INTO "incidentes" (id_maquina,descripcion,fecha,id_usuario) VALUES(1,'incidente maquina 1','20091231',1);
INSERT INTO "incidentes" (id_maquina,descripcion,fecha,id_usuario) VALUES(2,'incidente maquina 2','20091231',2);
INSERT INTO "incidentes" (id_maquina,descripcion,fecha,id_usuario) VALUES(3,'incidente maquina 3','20091231',3);

INSERT INTO "mantencion" (id_maquina,descripcion,fecha_inicio,fecha_termino) VALUES(1,'maquina 1 mantencion 1','20080909','20081010');
INSERT INTO "mantencion" (id_maquina,descripcion,fecha_inicio,fecha_termino) VALUES(2,'maquina 1 mantencion 1','20080909','20081010');
INSERT INTO "mantencion" (id_maquina,descripcion,fecha_inicio,fecha_termino) VALUES(3,'maquina 1 mantencion 1','20080909','20081010');

INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(1,1);
INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(1,2);
INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(1,3);

INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(2,1);
INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(2,3);

INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(3,1);
INSERT INTO "mantencion_componente" (id_componente,id_mantencion) VALUES(3,2);

INSERT INTO "reparacion" (descripcion,fecha_inicio,fecha_termino,id_maquina,id_usuario) VALUES('reparacion 1','20080909','20081010',1,1);
INSERT INTO "reparacion" (descripcion,fecha_inicio,fecha_termino,id_maquina,id_usuario) VALUES('reparacion 2','20080909','20081010',2,2);
INSERT INTO "reparacion" (descripcion,fecha_inicio,fecha_termino,id_maquina,id_usuario) VALUES('reparacion 3','20080909','20081010',3,3);

INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(1,1);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(2,1);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(3,1);

INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(1,2);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(2,2);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(3,2);

INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(1,3);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(2,3);
INSERT INTO "reparacion_componente" (id_componente,id_reparacion) VALUES(3,3);

INSERT INTO "mantencion_preventiva" (descripcion,id_componente,id_estado_componente) VALUES('matencion preventiva 1 estado 1',1,1);
INSERT INTO "mantencion_preventiva" (descripcion,id_componente,id_estado_componente) VALUES('matencion preventiva 2 estado 2',2,2);

INSERT INTO "mantencion_preventiva" (descripcion,id_componente,id_estado_componente) VALUES('matencion preventiva 3 estado 1 componente 3',3,1);
INSERT INTO "mantencion_preventiva" (descripcion,id_componente,id_estado_componente) VALUES('matencion preventiva 4 estado 1 componente 4',4,1);

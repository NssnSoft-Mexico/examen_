create database origin

create sequence public.registro_id start 1;

create table registros(
	id INT primary key default nextval('public.registro_id'),
	compania varchar(80) not null,
	persona varchar(80) not null,
	correo varchar(40) not null,
	telefono varchar(30) not null
);
export interface ITruck {
	id_maquina: number | undefined;
	nombre: string;
	descripcion: string;
	estado: {
		id_estado: number;
		estado: string;
		descripcion: string;
	};
}

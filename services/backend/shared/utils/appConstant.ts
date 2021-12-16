export const rowsTable = {
	truks: {
		nameTable: "maquina",
		id: "id_maquina",
		nombre: "nombre",
		desc: "descripción",
		idEst: "id_estado"
	},

	estadosTruks: {
		nameTable: "estado_maquina",
		id: "id_estado",
		estado: "estado",
		desc: "descripcion"
	},

	incident: {
		nameTable: "incidentes",
		id: "id_incidente",
		idTruck: "id_maquina",
		desc: "descripcion",
		date: "fecha",
		idUser: "id_usuario"
	},
	users: {
		nameTable: "usuario",
		id: "id_usuario",
		cargo: "cargo"
	},
	cargo: {
		nameTable: "cargo",
		id: "id_cargo",
		nombre: "nombre"
	}
};

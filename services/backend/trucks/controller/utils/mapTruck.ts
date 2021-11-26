import { IQueryTruck } from "../interfaces/IQueryTruck";
import { ITruck } from "../interfaces/ITruck";

export const fromIQueryToITruck = (elements: IQueryTruck[]): ITruck[] => {
	return elements.map((element: IQueryTruck): ITruck => {
		return {
			id_maquina: element.id_maquina,
			nombre: element.nombre,
			descripcion: element.descripción,
			estado: {
				id_estado: element.id_estado,
				estado: element.estado,
				descripcion: element.descripcion
			}
		};
	});
};

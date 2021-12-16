import { IQueryUsers } from "../interfaces/IQueryUsers";
import { Users } from "../interfaces/IUsers";

export const fromQueryToUser = (IQueryResult: IQueryUsers): Users => {
	const user: Users = {
		nombre: IQueryResult.nombre_user,
		id: IQueryResult.id_usuario,
		cargo: {
			cargo: IQueryResult.nombre,
			id_cargo: IQueryResult.id_cargo
		}
	};

	return user;
};

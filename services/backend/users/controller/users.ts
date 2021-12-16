import { Request, Response } from "express";
import { selectInnerJoin } from "../../shared/queries/select";
import { rowsTable } from "../../shared/utils/appConstant";
import { IQueryUsers } from "./interfaces/IQueryUsers";
import { fromQueryToUser } from "./utils/fromQueryToUsers";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const response = await selectInnerJoin(
			rowsTable.users.nameTable,
			null,
			{
				indexPrimary: rowsTable.users.cargo,
				indexSecundary: rowsTable.cargo.id,
				nameTable: rowsTable.cargo.nameTable
			},
			"*, p.nombre as nombre_user"
		);
		const result: IQueryUsers[] = response.rows;
		return res.json({
			data: result.map((userQuery) => fromQueryToUser(userQuery))
		});
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

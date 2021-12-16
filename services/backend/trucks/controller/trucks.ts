import { Request, Response } from "express";
import pool from "../../shared/db/DataBase";
import { rowsTable } from "../../shared/utils/appConstant";
import { insertElement } from "../../shared/queries/insert";
import { selectInnerJoin, selectSimple } from "../../shared/queries/select";
import { IQueryTruck } from "./interfaces/IQueryTruck";
import { ITruck } from "./interfaces/ITruck";
import { fromIQueryToITruck } from "./utils/mapTruck";
import { ICondition } from "../../shared/queries/interfaces/ICondition";
import { IQueryIncident } from "./interfaces/IQueryIncident";
import { QueryResult } from "pg";
import { IQueryUsers } from "../../users/controller/interfaces/IQueryUsers";

export const getAllTruks = async (req: Request, res: Response) => {
	try {
		const response = await selectInnerJoin(rowsTable.truks.nameTable, null, {
			indexPrimary: rowsTable.truks.idEst,
			indexSecundary: rowsTable.estadosTruks.id,
			nameTable: rowsTable.estadosTruks.nameTable
		});
		const result: IQueryTruck[] = response.rows;
		return res.json({ data: fromIQueryToITruck(result) });
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

export const createTrucks = async (req: Request, res: Response) => {
	try {
		const truck: ITruck = req.body.truck;
		await insertElement(
			rowsTable.truks.nameTable,
			[rowsTable.truks.nombre, rowsTable.truks.desc, rowsTable.truks.idEst],
			[truck.nombre, truck.descripcion, truck.estado.id_estado]
		);
		return res.json({ data: truck });
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

export const getIncidentForTruck = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const condition: ICondition = {
			key: rowsTable.incident.idTruck,
			oper: "=",
			val: id
		};
		const response: QueryResult<IQueryIncident> = await selectSimple(
			rowsTable.incident.nameTable,
			[condition]
		);

		const data = [];

		for await (const incident of response.rows) {
			const conditonUser: ICondition = {
				key: rowsTable.users.id,
				oper: "=",
				val: incident.id_usuario
			};
			const user: QueryResult<IQueryUsers> = await selectSimple(
				rowsTable.users.nameTable,
				[conditonUser]
			);
			const conditionTruck: ICondition = {
				key: rowsTable.truks.id,
				oper: "=",
				val: incident.id_maquina
			};
			const truck: QueryResult<IQueryTruck> = await selectSimple(
				rowsTable.truks.nameTable,
				[conditionTruck]
			);

			data.push({
				...incident,
				user: user.rows[0],
				truck: truck.rows[0]
			});
		}

		return res.json({ data: data });
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

export const getStateTruck = async (req: Request, res: Response) => {
	try {
		const responseBd = await selectSimple(rowsTable.estadosTruks.nameTable);
		return res.json({ data: responseBd.rows });
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

export const setIncidenTruck = async (req: Request, res: Response) => {
	const { incident } = rowsTable;
	try {
		const { id } = req.params;
		const { idUser, desc } = req.body;
		const responseBd = await insertElement(
			incident.nameTable,
			[incident.idTruck, incident.date, incident.desc, incident.idUser],
			[id, new Date(), desc, idUser]
		);
		return res.json({ data: responseBd.rows });
	} catch (error) {
		console.log(error);
		res.json({
			error
		});
	}
};

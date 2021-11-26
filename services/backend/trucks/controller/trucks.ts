import { Request, Response } from "express";
import pool from "../../shared/db/DataBase";
import { rowsTable } from "../../shared/utils/appConstant";
import { insertElement } from "../queries/insert";
import { selectInnerJoin, selectSimple } from "../queries/select";
import { IQueryTruck } from "./interfaces/IQueryTruck";
import { ITruck } from "./interfaces/ITruck";
import { fromIQueryToITruck } from "./utils/mapTruck";

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
		console.log(id);
		return res.json({ data: id });
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

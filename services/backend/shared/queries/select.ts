import { QueryResult } from "pg";
import pool from "../db/DataBase";
import { ICondition } from "./interfaces/ICondition";
import { IJoinTable } from "./interfaces/IJoinTable";

export const selectSimple = (
	table: string,
	condition: ICondition[] | null = null
): Promise<QueryResult> => {
	const where = condition === null ? "" : `WHERE ${formedCondition(condition)}`;
	return pool.query(`SELECT * FROM ${table} ${where} `);
};

export const selectInnerJoin = (
	table: string,
	condition: ICondition[] | null = null,
	secondaryTable: IJoinTable,
	select: string = "*"
): Promise<QueryResult> => {
	const where = condition === null ? "" : `WHERE ${formedCondition(condition)}`;

	return pool.query(`
    SELECT ${select} FROM ${table} as p
    INNER JOIN ${secondaryTable.nameTable} as s
    ON(p.${secondaryTable.indexPrimary} = s.${secondaryTable.indexSecundary})
    ${where} `);
};

const formedCondition = (condition: ICondition[]): string => {
	let stringCondition: string = "";

	condition.forEach((element: ICondition, index: number) => {
		if (index == 0) {
			stringCondition += `${element.key} ${element.oper} ${element.val}`;
		} else {
			if (index === condition.length - 1) {
				stringCondition += `${element.key} ${element.oper} ${element.val}`;
			} else {
				stringCondition += `AND ${element.key} ${element.oper} ${element.val}`;
			}
		}
	});
	return stringCondition;
};

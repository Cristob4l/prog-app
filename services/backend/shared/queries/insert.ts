import { QueryResult } from "pg";
import pool from "../db/DataBase";

export const insertElement = (
	table: string,
	listParams: string[],
	values: any[]
): Promise<QueryResult> => {
	const query = `INSERT INTO 
    ${table}(${listParams.join()}) 
    VALUES(${listParams
			.map((e, index: number) => `$${index + 1}`)
			.join()}) RETURNING *`;

	return pool.query(query, values);
};

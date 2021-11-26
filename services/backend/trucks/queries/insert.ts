import pool from "../../shared/db/DataBase";

export const insertElement = (
	table: string,
	listParams: string[],
	values: any[]
): Promise<any> => {
	const query = `INSERT INTO 
    ${table}(${listParams.join()}) 
    VALUES(${listParams
			.map((e, index: number) => `$${index + 1}`)
			.join()}) RETURNING *`;

	return pool.query(query, values);
};

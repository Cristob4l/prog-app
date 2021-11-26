import express, { Application } from "express";
import trucksRouter from "../../trucks/router/trucks";
import db from "../db/DataBase";
import cors from "cors";

export class Server {
	private app: Application;
	private port: string;
	private apiPath = {
		truks: "/api/truks"
	};
	constructor() {
		this.app = express();
		this.port = process.env.PORT ?? "3000";

		this.connectDb();
		this.middlewares();
		this.routes();
	}

	connectDb() {
		db.connect((e, client, done) => {
			if (e) {
				console.log("Ocurrio un error al intentar conectarse a la BD");
			} else {
				console.log("Se conecto a la base de dato con exito");
			}
		});
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.apiPath.truks, trucksRouter);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor to listen for port: ${this.port}`);
		});
	}
}

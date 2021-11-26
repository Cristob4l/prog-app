import dotenv from "dotenv";
import { Server } from "./shared/utils/Server";

dotenv.config();

const app = new Server();

app.listen();

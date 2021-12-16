import { Router } from "express";
import { getUsers } from "../controller/users";

const router = Router();

router.get("/", getUsers);

export default router;

import { Router } from "express";
import {
	createTrucks,
	getAllTruks,
	getIncidentForTruck,
	getStateTruck
} from "../controller/trucks";

const router = Router();

router.get("/", getAllTruks);
router.post("/add", createTrucks);

router.get("/:id/incident", getIncidentForTruck);

router.get("/states", getStateTruck);

export default router;

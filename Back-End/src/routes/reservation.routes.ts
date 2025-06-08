import express from "express";
import * as reservationController from "../controllers/reservation.controller";

const router = express.Router();

router.post("/", reservationController.createReservation);
router.get("/", reservationController.listReservations);

export default router;

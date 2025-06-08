import { Request, Response } from "express";
import Reservation from "../models/reservation.model";
import Sport from "../models/sport.model";
import SportLocation from "../models/sportLocation.model";

export const createReservation = async (req: Request, res: Response) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Chyba při vytváření rezervace" });
    }
};

export const listReservations = async (req: Request, res: Response) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { model: Sport, attributes: ["name"] },
                { model: SportLocation, attributes: ["name", "location"] },
            ],
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Chyba při načítání rezervací" });
    }
};

// Další funkce (update, delete) by byly podobné

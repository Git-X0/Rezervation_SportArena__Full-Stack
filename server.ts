import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware pro parsování JSON
app.use(bodyParser.json());

// GET /api/reservations - List všech rezervací
app.get("/api/reservations", async (req: Request, res: Response) => {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                sportPlace: true,
            },
        });
        res.json(reservations);
    } catch (error) {
        console.error("GET /api/reservations error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET /api/reservations/:id - Detail rezervace
app.get("/api/reservations/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: idNum },
            include: {
                sportPlace: true,
            },
        });

        if (!reservation) {
            return res.status(404).send("Reservation not found");
        }

        res.json(reservation);
    } catch (error) {
        console.error(`GET /api/reservations/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// POST /api/reservations - Vytvoření nové rezervace
app.post("/api/reservations", async (req: Request, res: Response) => {
    const { date, userEmail, placeId } = req.body;

    if (!date || !userEmail || !placeId) {
        return res
            .status(400)
            .send("Missing required fields: date, userEmail, placeId");
    }

    try {
        const sportPlace = await prisma.sportPlace.findUnique({
            where: { id: Number(placeId) },
        });

        if (!sportPlace) {
            return res.status(404).send("Sport place not found");
        }

        const reservation = await prisma.reservation.create({
            data: {
                date: new Date(date),
                userEmail: userEmail,
                placeId: Number(placeId),
            },
            include: {
                sportPlace: true,
            },
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error("POST /api/reservations error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// PUT /api/reservations/:id - Aktualizace rezervace
app.put("/api/reservations/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, userEmail, placeId } = req.body;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const existingReservation = await prisma.reservation.findUnique({
            where: { id: idNum },
        });

        if (!existingReservation) {
            return res.status(404).send("Reservation not found");
        }

        if (placeId) {
            const sportPlace = await prisma.sportPlace.findUnique({
                where: { id: Number(placeId) },
            });
            if (!sportPlace) {
                return res.status(404).send("Sport place not found");
            }
        }

        const updatedReservation = await prisma.reservation.update({
            where: { id: idNum },
            data: {
                date: date ? new Date(date) : existingReservation.date,
                userEmail: userEmail || existingReservation.userEmail,
                placeId: placeId
                    ? Number(placeId)
                    : existingReservation.placeId,
            },
            include: {
                sportPlace: true,
            },
        });

        res.json(updatedReservation);
    } catch (error) {
        console.error(`PUT /api/reservations/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// DELETE /api/reservations/:id - Smazání rezervace
app.delete("/api/reservations/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const existingReservation = await prisma.reservation.findUnique({
            where: { id: idNum },
        });

        if (!existingReservation) {
            return res.status(404).send("Reservation not found");
        }

        await prisma.reservation.delete({
            where: { id: idNum },
        });

        res.status(204).send();
    } catch (error) {
        console.error(`DELETE /api/reservations/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// GET /api/sportplaces - Seznam sportovišť
app.get("/api/sportplaces", async (req: Request, res: Response) => {
    try {
        const sportPlaces = await prisma.sportPlace.findMany();
        res.json(sportPlaces);
    } catch (error) {
        console.error("GET /api/sportplaces error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Seed endpoint
app.post("/api/seed", async (req: Request, res: Response) => {
    try {
        await prisma.sportPlace.createMany({
            data: [
                { name: "Tenisový kurt 1", type: "tennis" },
                { name: "Fotbalové hřiště", type: "football" },
                { name: "Basketbalové hřiště", type: "basketball" },
            ],
            skipDuplicates: true,
        });

        const places = await prisma.sportPlace.findMany();
        const today = new Date();

        await prisma.reservation.createMany({
            data: [
                {
                    date: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() + 1,
                        10,
                        0
                    ),
                    userEmail: "jan.novak@example.com",
                    placeId: places[0].id,
                },
                {
                    date: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() + 1,
                        14,
                        0
                    ),
                    userEmail: "petra.svobodova@example.com",
                    placeId: places[1].id,
                },
            ],
        });

        res.status(201).send("Database seeded successfully");
    } catch (error) {
        console.error("Seed error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});

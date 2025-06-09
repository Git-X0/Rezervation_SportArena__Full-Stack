const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();
const port = `3000/api`;

app.use(bodyParser.json());

// GET /api/reservations
app.get("/reservations", async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany({
            include: { sportPlace: true },
        });
        res.json(reservations);
    } catch (error) {
        console.error("GET /api/reservations error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET /api/reservations/:id
app.get("/reservations/:id", async (req, res) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: idNum },
            include: { sportPlace: true },
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
// POST /api/reservations
app.post("/reservations", async (req, res) => {
    const { sportPlaceId, date, time, duration } = req.body;
    if (!sportPlaceId || !date || !time || !duration) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const newReservation = await prisma.reservation.create({
            data: {
                sportPlaceId,
                date,
                time,
                duration,
            },
        });
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("POST /api/reservations error:", error);
        res.status(500).send("Internal Server Error");
    }
});
// PUT /api/reservations/:id
app.put("/reservations/:id", async (req, res) => {
    const { id } = req.params;
    const { sportPlaceId, date, time, duration } = req.body;

    if (!sportPlaceId || !date || !time || !duration) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const updatedReservation = await prisma.reservation.update({
            where: { id: Number(id) },
            data: {
                sportPlaceId,
                date,
                time,
                duration,
            },
        });
        res.json(updatedReservation);
    } catch (error) {
        console.error(`PUT /api/reservations/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// DELETE /api/reservations/:id
app.delete("/reservations/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.reservation.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(`DELETE /api/reservations/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// GET /api/sportPlaces
app.get("/sportPlaces", async (req, res) => {
    try {
        const sportPlaces = await prisma.sportPlace.findMany();
        res.json(sportPlaces);
    } catch (error) {
        console.error("GET /api/sportPlaces error:", error);
        res.status(500).send("Internal Server Error");
    }
});
// GET /api/sportPlaces/:id
app.get("/sportPlaces/:id", async (req, res) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const sportPlace = await prisma.sportPlace.findUnique({
            where: { id: idNum },
        });

        if (!sportPlace) {
            return res.status(404).send("Sport Place not found");
        }

        res.json(sportPlace);
    } catch (error) {
        console.error(`GET /api/sportPlaces/${id} error:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// POST /api/sportPlaces
app.post("/sportPlaces", async (req, res) => {
    const { name, location } = req.body;

    if (!name || !location) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const newSportPlace = await prisma.sportPlace.create({
            data: {
                name,
                location,
            },
        });
        res.status(201).json(newSportPlace);
    } catch (error) {
        console.error("POST /api/sportPlaces error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});

export default app;

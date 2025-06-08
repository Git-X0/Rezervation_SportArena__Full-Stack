const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET /api/reservations
app.get("/api/reservations", async (req, res) => {
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
app.get("/api/reservations/:id", async (req, res) => {
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

// ... (vložte zde další endpointy ze server.ts)

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
